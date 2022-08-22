import { Component, OnInit } from '@angular/core';
import { OsacadService } from '../../../services/osacad.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects = [];
  constructor(
    private service: OsacadService,
    private toastr: ToastrService
    ) {
   }

  ngOnInit(): void {
    this.service.storeCourseProgress$.subscribe(batch => {
      if (batch && batch.projects) {
        this.projects = batch.projects;
      }
    });
  }
  downloadProject(project) {
    if (project && project.projectLink) {
      window.location.href = project.projectLink;
    } else {
      this.toastr.error('No project found, Please try again later');
    }
  }

}