import { Component, OnInit } from '@angular/core';
import { OsacadService } from '../../../services/osacad.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  course;
  constructor(private service: OsacadService) {
    this.service.storeCourseProgress$.subscribe((a) => {
      if(a) {
        this.course =a;
      }
     })
   }

  ngOnInit(): void {
  }

}
