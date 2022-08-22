import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dl-kick-start',
  templateUrl: './kick-start.component.html',
  styleUrls: ['./kick-start.component.scss']
})
export class KickStartComponent implements OnInit {
  @Input() program;
  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit() {
  }

  enrollNow() {
    this.commonService.selectedProgram = this.program;
    this.router.navigate(['/orderDetails']);
  }

}
