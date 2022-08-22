import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services/http.service';
import { HttpReq } from '../shared/common/app.entity';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OsacadService {
  REST_TYPE_GET = 'get';
  REST_TYPE_POST = 'post';
  REST_TYPE_PUT = 'put';
  REST_TYPE_DELETE = 'delete';
  private storeCourseProgress: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private httpService: HttpService) { }
  findAllCourses() {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = '/course/getAllCourses';
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq, false);
  }
  findProgramById(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/course/getCourseById/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq, false);
  }
  createOrderId(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/student/createOrderId';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  saveOrderDetails(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/student/createOrder';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  register(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/student/create';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  authenticate(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/student/authenticate';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq, false);
  }
  getProgramsByStudentId() {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/student/getOrdersForStudent`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  getStudentDetails() {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/student/me`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  editProfile(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/student/edit';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  updateProfilePicture(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/student/updateProfilePic';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  deleteProfilePicture() {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/student/deleteProfilePic';
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  changePassword(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/student/changePassword';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  getInvoices() {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = '/student/getInvoices';
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  getCourseProgressDetails(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/student/getCourseProgress/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  updateStatusForCoureProgress(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/student/updateCourseProgressStatus/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  sendEmail(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/student/sendEmail';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  resetPassword(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/student/resetPassword';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  addFeedback(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/student/addFeedback';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  getFeedback(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = '/student/getFeedback';
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  findAssessmentById(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `/course/getAssessmentById/${id}`;
    httpReq.showLoader = true;
    httpReq.body = {};
    return this.httpService.restCall(httpReq);
  }
  updateAssessmetByProgress(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.url = `/course/updateAssessmetByProgress`;
    httpReq.showLoader = true;
    httpReq.body = data;
    return this.httpService.restCall(httpReq);
  }
  uploadAssignment(data) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    const formData = new FormData();
    formData.append('assignmentFile', data.file);
    formData.append('studentId', data.studentId);
    formData.append('courseId', data.courseId);
    formData.append('batchId', data.batchId);
    formData.append('topicId', data.topicId);
    formData.append('instructorMailId', data.instructorMailId);
    httpReq.url = `/student/sendAndStoreAssignment`;
    httpReq.showLoader = true;
    httpReq.body = formData;
    return this.httpService.restCall(httpReq);
  }

  get storeCourseProgress$() {
    return this.storeCourseProgress.asObservable();
  }
  set storeCourseProgress$(value) {
    this.storeCourseProgress.next(value);
  }

}
