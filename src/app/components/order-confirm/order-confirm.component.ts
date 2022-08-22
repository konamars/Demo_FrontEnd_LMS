import { Component, OnInit, NgZone } from '@angular/core';
import { OsacadService } from '../../services/osacad.service';
import { AppService } from '../../shared/services/app.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
  courses: any = [];
  programInfo: any = {};
  courseProgressId: any;
  constructor(
    private osacadService: OsacadService,
    private appService: AppService,
    private router: Router,
    private ngZone: NgZone,
    private commonService: CommonService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.programInfo = this.commonService.selectedProgram;
    if (!(this.programInfo && Object.keys(this.programInfo).length)) {
      this.router.navigate(['/home']);
    }
    this.getOrders();
  }
  goTo(a) {
    this.toastService.success('Course will start soon. Any queries, please contact Admin --  6304982305');
  }

  getOrders() {
    this.osacadService.getProgramsByStudentId().subscribe((res) => {
      if(res['status'] == 200) {
      }
    });
  }
  redirectToCourse() {
    this.ngZone.run(() => this.router.navigate([`/course-activity/${this.courseProgressId}/course-info`]).then());
  }
  redirectToPrograms() {
    this.ngZone.run(() => this.router.navigate(['/home']).then());
  }
  redirectToClassroom() {
    this.ngZone.run(() => this.router.navigate(['/myClassroom']).then());
  }

}
