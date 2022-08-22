import { Component, OnInit } from '@angular/core';
import { OsacadService } from '../../services/osacad.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-classroom',
  templateUrl: './my-classroom.component.html',
  styleUrls: ['./my-classroom.component.scss']
})
export class MyClassroomComponent implements OnInit {

  constructor(private service: OsacadService,private router: Router, private toastr: ToastrService) { }
  programs: any[];
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.service.getProgramsByStudentId().subscribe((res) => {
      if(res['status'] == 200) {
        this.programs = res['body'];
      }
    })
  }

  goTo(a) {
    if(a['status'] == 'not_assigned') {
      this.toastr.success('Course will start soon. Any queries, please contact Admin');
    }else if(a['status'] == 'suspended') {
      this.toastr.error('Course is suspended. Any queries, please contact Admin');
    }else {
      this.router.navigateByUrl(`/course-activity/${a['progressId']}/course-info`);
    }
  }


}
