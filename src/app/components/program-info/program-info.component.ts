import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { OsacadService } from '../../services/osacad.service';
import { AppService } from '../../shared/services/app.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-program-info',
  templateUrl: './program-info.component.html',
  styleUrls: ['./program-info.component.scss']
})
export class ProgramInfoComponent implements OnInit, AfterViewInit {
  programInfo: any = {};
  @ViewChild('banner', { static: false }) banner: ElementRef;
  constructor(
    private osacadService: OsacadService,
    private appService: AppService,
    private router: Router,
    private commonService: CommonService
  ) {
  }

  ngOnInit() {
    this.findProgramById();
  }
  ngAfterViewInit() {
    this.getImageUrl();
  }
  findProgramById() {
    const programId = this.appService.getParam('id');
    if (programId) {
      this.osacadService.findProgramById(programId).subscribe(
        (response) => {
          if (response.status == 200) {
            console.log(response);
            this.programInfo = response['body'];
          }
        },
        (error) => {
          if (error.status == 404) {
            this.router.navigate(['/home']);
          }
        });
    }
  }

  enrollNow() {
    this.commonService.selectedProgram = this.programInfo;
    this.router.navigate(['/orderDetails']);
  }
  getImageUrl() {
    // if (this.programInfo && this.programInfo.imageURL) {
    //   this.banner.nativeElement.style.backgroundImage = `url('${this.programInfo.imageURL}')`;
    // }
    this.banner.nativeElement.style.backgroundImage = `url('assets/images/programbg1.jpg')`;
  }
}
