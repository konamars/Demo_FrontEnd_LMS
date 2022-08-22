import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OsacadService } from '../../services/osacad.service';
import { ActivatedRoute } from '@angular/router';
import Player from "@vimeo/player";
import { CommonService } from '../../services/common.service';
import { AppService } from '../../shared/services/app.service';
import { ApexService } from '../../shared/services/apex.service';

@Component({
  selector: 'app-course-activity',
  templateUrl: './course-activity.component.html',
  styleUrls: ['./course-activity.component.scss']
})
export class CourseActivityComponent implements OnInit {
  d = new Date();
  isShowOrHideClass: any = false;
  tabs = [
    {
      name: 'Course Info',
      link: 'course-info'
    },
    {
      name: 'Resources',
      link: 'resources'
    },
    {
      name: 'Assignments',
      link: 'assignments'
    },
    {
      name: 'Projects',
      link: 'projects'
    },
    {
      name: 'Feedback',
      link: 'feedback'
    }
  ];
  @ViewChild('videoContainer', { static: false }) videoContainer: ElementRef;
  notSelectedOption: boolean;
  isLastQuestion: boolean;
  resultScore: number = 0;
  private player: Player;
  selectedIndexForModule: any = 0;
  selectedIndex: any;
  isShow: any = true;
  constructor(
    private service: OsacadService,
    private route: ActivatedRoute,
    private appService: AppService,
    private apexService: ApexService,
    private commonService: CommonService) {
    this.d.setDate(this.d.getDate() + 1);
   }
  course;
  assessment;
  noVideo: boolean;
  question;
  resultAssessment = [];
  questionsLength: number = 0;
  isAssessmentSubmitted;
  noVideoText: any = 'Currently, No Video Available';
  isPlayVideo;
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getProgress();
  }
  async videoInit (url) {
    if (this.player) {
      this.player.destroy();
    }
    if (this.videoContainer && this.videoContainer.nativeElement) {
      try {
        this.noVideoText = 'Currently, No Video Available';
        console.log(url);
        this.player = await new Player(this.videoContainer.nativeElement, {
          url,
          width: 900
        });
        await this.player.setColor('#00adef');
      } catch (error) {
        this.noVideo = true;
        this.noVideoText = 'Error in playing the video';
      }
    }
  }
  getProgress() {
    const id = this.route.snapshot.params['id'];
    this.service.getCourseProgressDetails(id).subscribe(
      res => {
        if (res.status == 200) {
          this.course = res['body'][0];
          if (this.course && this.course.upcomingClassDate ) {
            const upcomingClassDate = new Date(this.course.upcomingClassDate);
            upcomingClassDate.setHours(upcomingClassDate.getHours() + 1);
            this.isShowOrHideClass =  new Date() <= new Date(upcomingClassDate);
          }
          this.service.storeCourseProgress$ = this.course;
          this.course['curriculum'].forEach(t => {
            t.expanded = false;
          });
          this.course['curriculum'][0]['expanded'] = true;
          if (this.isPlayVideo !== undefined && this.isPlayVideo === false) {
          } else {
            this.selectedIndex = 0;
            this.playVideo(this.course.curriculum[0].topics[0]);
          }
          if (!(this.course && this.course['isStarted'])) {
              this.service.updateStatusForCoureProgress(id).subscribe((ab) => {
            },
            errr => console.log(errr));
          }
        }
      }, err => {
        if (err.status == 401) {
          this.apexService.showLoader(false);
          this.appService.navigate('/auth/login', null);
        }
        console.log(err);
      });
  }

  joinClass() {
    if (this.course && this.course['upcomingClassZoomLink']) {
      window.open('https://zoom.us/signin', '_blank');
    } else {

    }
  }
  nextQuestion() {
    if (this.question) {
      if (!this.question['answer']) {
        this.notSelectedOption = true;
        return;
      }
      this.notSelectedOption = false;
      this.resultAssessment.push({
        ...this.question
      });
      if (!this.isLastQuestion) {
        let id = this.question['id'] + 1;
        this.question = {
          id,
          name: this.assessment['assessment']['assessment'][id]['name'],
          options: this.assessment['assessment']['assessment'][id]['options']
        }
        console.log(!!(this.assessment['assessment']['assessment'][this.question['id'] + 1] !== null && this.assessment['assessment']['assessment'][this.question['id'] + 1] !== undefined));
        this.isLastQuestion = !(!!this.assessment['assessment']['assessment'][this.question['id'] + 1]);
      } else {
        this.validateAssessmeent();
      }
    }
  }

  validateAssessmeent() {
    if (this.resultAssessment && this.resultAssessment.length) {
      this.resultScore = this.resultAssessment.reduce((a, b) => a + (b['answer']['isChecked'] ? 1 : 0), 0);
      this.service.updateAssessmetByProgress({
        id: this.route.snapshot.params['id'], assessment: {
          id: this.assessment['id'],
          score: this.resultScore,
          questionsLength: this.resultAssessment.length
        }
      }).subscribe(
        res => {
          this.questionsLength = this.resultAssessment.length;
          this.isAssessmentSubmitted = true;
          this.isPlayVideo = false;
          this.getProgress();
        }, err => {
          console.log(err);
        }
      );
    }
  }


  getAssessment(id, name) {
    this.service.findAssessmentById(id).subscribe(
      res => {
        if (res.status == 200) {
          this.assessment = {
            id,
            name,
            assessment: res['body']
          };
          this.isAssessmentSubmitted = false;
          this.question = {
            id: 0,
            name: this.assessment['assessment']['assessment'][0]['name'],
            options: this.assessment['assessment']['assessment'][0]['options']
          };
          this.isLastQuestion = !(!!(this.assessment['assessment']['assessment'][this.question['id'] + 1]));
        }
      }, err => {
        console.log(err);
      }
    )
  }
  playVideo(topic) {
    this.commonService.selectedCourseTopic = topic;
    this.commonService.selectedTopicByService = topic;
    this.noVideo = false;
    if (!topic['assessmentId']) {
      this.assessment = null;
      this.notSelectedOption = false;
      this.resultAssessment = [];
      this.isLastQuestion = false;
      this.isAssessmentSubmitted = false;
      this.questionsLength = 0;
      this.resultScore = 0;
      console.log(topic);
      if (topic && topic['link']) {
        this.noVideo = false;
        this.videoInit(topic['link']);
      } else {
        this.noVideo = true;
      }
    } else {
      if (this.course['completedAssessments'] && this.course['completedAssessments'].length) {
        let assessment = this.course['completedAssessments'].find((a) => a['id'] == topic['assessmentId']);
        if (assessment) {
          this.resultScore = assessment['score'];
          this.questionsLength = assessment['questionsLength'];
          this.assessment = true;
          this.isAssessmentSubmitted = true;
        } else {
          this.getAssessment(topic['assessmentId'], topic['title']);
        }
      } else {
        this.getAssessment(topic['assessmentId'], topic['title']);
      }
    }
  }
  activateClass(i) {
    this.selectedIndex = i;
  }
  activateClassForModule(i, expanded) {
    if (expanded) {
      this.selectedIndexForModule = i;
      this.selectedIndex = undefined;
    }
  }

}