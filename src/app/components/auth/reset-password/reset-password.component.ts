import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OsacadService } from '../../../services/osacad.service';
import { AppService } from '../../../shared/services/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  constructor(
    private service: OsacadService,
    private formBuilder: FormBuilder,
    private osacadService: OsacadService,
    private appService: AppService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createResetPasswordForm();
  }
  resetPasswordCTA() {
    this.comparePasswords();
    if (this.resetPasswordForm.valid) {
      const reqObj = {
        token: this.appService.getParam('token'),
        email: this.appService.getParam('email'),
        newPassword: this.resetPasswordForm.value.newPassword
      };
      if (reqObj.token && reqObj.email) {
        this.osacadService.resetPassword(reqObj).subscribe(
          (response: any) => {
            if (response && response.body && response.body.status === 1) {
              this.toastrService.success('Password updated successfully, Please Login');
              this.appService.navigate('/auth/login', '');
            } else {
              this.toastrService.error('Link expired, please try again');
            }
          }, (error) => {
          });
      } else {
        this.toastrService.error('Invalid link');
      }
    }
  }
  createResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
    });
  }
  comparePasswords() {
    if ((this.resetPasswordForm.controls.newPassword.value && this.resetPasswordForm.controls.confirmPassword.value)
     && !(this.resetPasswordForm.controls.newPassword.value === this.resetPasswordForm.controls.confirmPassword.value)) {
      this.resetPasswordForm.controls.confirmPassword.setErrors({ wrong: true });
    }
  }

}
