import { Component, OnInit } from '@angular/core';
import { OsacadService } from '../../services/osacad.service';
import { CommonService } from '../../services/common.service';
import { AppService } from '../../shared/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  courses: any = [];
  associateDegreeProgram: any = [];
  mastersDegreeProgram: any = [];
  username: string;
  toggleProgram: any = 'associate';
  constructor(
    private osacadService: OsacadService,
    private commonService: CommonService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.getDeatils();
    this.findAllCourses();
  }
  enrollNow(program: any) {
    this.commonService.selectedProgram = program;
    this.appService.navigate('orderDetails', null);
  }
  redirectToProgramInfo(program) {
    this.appService.navigate('programInfo', { id: program._id });
  }
  findAllCourses() {
    this.osacadService.findAllCourses().subscribe(
      (response) => {
        if (response.status == 200) {
          this.courses = response['body'];
        }
      },
      (error) => {
        console.log(error);
      });
  }
  getDeatils() {
    this.osacadService.getStudentDetails().subscribe(
      res => {
        if (res.status == 200) {
          this.username = `${res['body']['firstname']} ${res['body']['lastname']}`
        }
      },
      err => console.log(err)
    )
  }
  togglePrograms(program) {
    this.toggleProgram = program;
  }
  downloadCurriculum(program) {
    if (program && program.curriculumLink) {
      window.location.href = program.curriculumLink;
    }
  }

}
