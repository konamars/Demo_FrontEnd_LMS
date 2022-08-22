import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OsacadService } from '../../../services/osacad.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  programs: any = [];
  studentDetails: any = {};
  defaultImage: any = 'assets/images/user.png';
  constructor(
    public router: Router,
    private service: OsacadService,
    private commonService: CommonService,
    ) { }

  ngOnInit(): void {
    this.getOrders();
    this.getDetails();
    this.commonService.triggerDp.subscribe( data => {
      this.getDetails();
    });
  }
  getOrders() {
    this.service.getProgramsByStudentId().subscribe((res: any) => {
      if (res.status == 200) {
        this.programs = res.body;
      }
    });
  }
  getDetails() {
    this.service.getStudentDetails().subscribe(
      (response: any) => {
        if (response && response.status === 200) {
          this.studentDetails = response.body;
        }
      },
      (error) => {
      });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}
