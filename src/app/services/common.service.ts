import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  triggerDp: Subject<any> = new Subject<any>();
  selectedTopic: Subject<any> = new Subject<any>();
  selectedTopicByMethod: any;
  private program: any = {};
  constructor() { }
  set selectedProgram(program) {
    this.program = program;
  }
  get selectedProgram() {
    return this.program;
  }
  set selectedCourseTopic(topic) {
    this.selectedTopic.next(topic);
  }
  get selectedCourseTopic() {
    return this.selectedTopic.asObservable();
  }
  set selectedTopicByService(data) {
    this.selectedTopicByMethod = data;
  }
  get selectedTopicByService() {
    return this.selectedTopicByMethod;
  }
  set triggerProfileDp(data: any) {
    this.triggerDp.next(data);
  }
  get triggerProfileDp() {
    return this.triggerDp.asObservable();
  }
}
