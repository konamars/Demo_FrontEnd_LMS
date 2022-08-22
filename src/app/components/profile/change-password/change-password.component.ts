import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OsacadService } from '../../../services/osacad.service';
import { ApexService } from '../../../shared/services/apex.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../shared/services/app.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  studentDetails: any;
  constructor(
    private formBuilder: FormBuilder,
    private osacadService: OsacadService,
    private appService: AppService,
    private toastrService: ToastrService,
    private apexService: ApexService) { }

  ngOnInit(): void {
    this.createChangePasswordForm();
  }
  update() {
    if (this.changePasswordForm.valid && this.changePasswordForm.value.password !== this.changePasswordForm.value.newPassword) {
      const req = this.changePasswordForm.value;
      delete req.reenterPassword;
      this.osacadService.changePassword(req).subscribe(
        (response: any) => {
          if (response && response.status === 200) {
            this.changePasswordForm.reset();
            this.toastrService.success('Updated successfully');
          }
        },
        (error) => {
          if (error.status == 409) {
            this.changePasswordForm.controls.password.setErrors({notValid: true});
          } else if (error.status == 401) {
            this.appService.navigate('/auth/login', null);
          } else {
            this.toastrService.error('Failed in updating');
          }
          this.apexService.showLoader(false);
        });
    } else {
      this.toastrService.error('Old password and new password cannot be same');
    }
  }
  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
      newPassword: [null, [Validators.required, Validators.minLength(8)]],
      reenterPassword: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  comparePasswords() {
    if ((this.changePasswordForm.controls.newPassword.value && this.changePasswordForm.controls.reenterPassword.value) && !(this.changePasswordForm.controls.newPassword.value === this.changePasswordForm.controls.reenterPassword.value)) {
      this.changePasswordForm.controls.reenterPassword.setErrors({ wrong: true });
    }
  }
  disableWhiteSpace(event) {
    if (event.keyCode === 32) {
      return false;
    }
  }
}
