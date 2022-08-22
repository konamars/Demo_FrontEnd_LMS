import { Component, OnInit } from '@angular/core';
import { OsacadService } from '../../../services/osacad.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  courseProgress: any = {};
  currentRate = 0;
  studentDetails: any = {};
  defaultImage: any = 'assets/images/user.png';
  review: any = '';
  feedBack: any = {};
  feedbackForm: FormGroup;
  isReadMode: any = false;
  constructor(
    private osacadService: OsacadService,
    private ratingConfig: NgbRatingConfig,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.ratingConfig.max = 5;
  }
  ngOnInit(): void {
    this.getDetails();
    this.createFeedbackForm();
    this.osacadService.storeCourseProgress$.subscribe((course) => {
      if (course) {
        this.courseProgress = course;
        if (this.courseProgress && this.courseProgress.isFeedbackEnabled === true) {
          this.getFeedback();
        }
      }
     });
  }
  createFeedbackForm() {
    this.feedbackForm = this.formBuilder.group({
      review: [null, Validators.required],
    });
  }
  getDetails() {
    this.osacadService.getStudentDetails().subscribe(
      (response: any) => {
        if (response && response.status === 200) {
          this.studentDetails = response.body;
        }
      },
      (error) => {
      });
  }
  addFeedback() {
    if (this.currentRate > 0) {
      const feedbackReq = {
        studentId: this.courseProgress.studentId,
        courseId: this.courseProgress.courseId,
        batchId: this.courseProgress.batchId,
        rating: this.currentRate,
        review: this.feedbackForm.value.review
      };
      this.osacadService.addFeedback(feedbackReq).subscribe(
        (response: any) => {
          if (response.body && response.body.status === 1) {
            this.toastr.success('Updated successfully');
            this.getFeedback();
          } else if (response.body.data && response.body.data.errorDescription) {
            this.toastr.error(response.body.data.errorDescription);
          } else {
            this.toastr.error('Failed in updating');
          }
        });
    } else {
      this.toastr.error('Please select rating');
    }
  }
  getFeedback() {
    const feedbackReq = {
      studentId: this.courseProgress.studentId,
      courseId: this.courseProgress.courseId,
      batchId: this.courseProgress.batchId
    };
    this.osacadService.getFeedback(feedbackReq).subscribe(
      (response: any) => {
        if (response.body && response.body.status === 1) {
          this.feedBack = response.body.data;
          this.currentRate = response.body.data.rating;
          this.feedbackForm.controls.review.patchValue(response.body.data.review);
          this.feedbackForm.controls.review.disable();
          this.isReadMode = true;
        }
      });
  }
}
