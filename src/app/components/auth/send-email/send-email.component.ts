import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OsacadService } from '../../../services/osacad.service';
import { ToastrService } from 'ngx-toastr';
import { ApexService } from '../../../shared/services/apex.service';
import { CommonService } from '../../../services/common.service';
import { AppService } from '../../../shared/services/app.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {
  sendEmailForm: FormGroup;
  constructor(
    private apexService: ApexService,
    private formBuilder: FormBuilder,
    private osacadService: OsacadService,
    private commonService: CommonService,
    private toastrService: ToastrService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.createSendEmailForm();
  }
  sendCTA() {
    this.osacadService.sendEmail(this.sendEmailForm.value).subscribe(
      (response: any) => {
        if (response && response.body && response.body.status === 1) {
          console.log('triggered');
          this.appService.navigate('/auth/confirmEmail', '');
        } else {
          this.toastrService.error(response.body.data.message);
        }
      }, (error) => {
      });
  }
  createSendEmailForm() {
    this.sendEmailForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

}
