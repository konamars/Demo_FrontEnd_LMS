import { Component, OnInit } from '@angular/core';
import { OsacadService } from '../../../services/osacad.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  assignments = [] ;
  isInstructions: any = true;
  isSolution: any = false;
  assignment: any;
  courseProgress: any;
  topic: any;
  constructor(
    private service: OsacadService,
    private commonService: CommonService,
    private toastr: ToastrService) {
    this.service.storeCourseProgress$.subscribe((a) => {
      if (a) {
        this.courseProgress = a;
      }
     });
   }
  ngOnInit(): void {
    this.commonService.selectedCourseTopic.subscribe(topic => {
      this.topic = topic;
      if (this.topic && this.topic.assignments) {
        this.topic = this.topic;
        this.assignments = this.topic.assignments;
      }
    });
    this.topic = this.commonService.selectedTopicByService;
    if (this.topic && this.topic.assignments) {
      this.topic = this.topic;
      this.assignments = this.topic.assignments;
    }
  }
  toggleInstrSolution() {
    this.isInstructions = !this.isInstructions;
    this.isSolution = !this.isSolution;
  }
  getSelected(event, assignment) {
    if (event.target.files && event.target.files[0]) {
      this.assignment = event.target.files[0];
      this.uploadAssignment(assignment);
      event.target.value = '';
    }
  }
  downloadSolution(solution) {
    if (solution && solution.fileLink) {
      window.location.href = solution.fileLink;
    } else {
      this.toastr.error('No assignment found, Please try again later');
    }
  }
  uploadAssignment(assignment) {
    const req = {
      file: this.assignment,
      courseId: this.courseProgress.courseId,
      batchId: this.courseProgress.batchId,
      topicId: this.topic._id,
      studentId: this.courseProgress.studentId,
      instructorMailId: assignment.instructorMailId
    };
    this.service.uploadAssignment(req).subscribe(
      (response: any) => {
        if (response.body && response.body.status === 1) {
          this.toastr.success('Submitted assignment successfully');
        } else {
          this.toastr.error('Failed in updating');
        }
      });
  }
}
