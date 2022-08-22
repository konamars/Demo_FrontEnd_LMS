import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OsacadService } from '../../services/osacad.service';
import { ApexService } from '../../shared/services/apex.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'dl-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private toastrService: ToastrService,
  private service: OsacadService, private router: Router, private apexService: ApexService,) { }
  showLogin = false;
  showRegister = false;

  ngOnInit() {
    this.route.data.subscribe((data) => {
      if (data && data['type']) {
        this.displayAuth(data['type']);
      }
    });
  }
  displayAuth(type) {
    switch (type) {
      case 'login':
      default:
        this.showRegister = false;
        this.showLogin = true;
        break;
      case 'register':
        this.showLogin = false;
        this.showRegister = true;
        break;
    }
  }

  register: FormGroup = this.fb.group({
    firstname: [null, Validators.required],
    lastname: [null, Validators.required],
    email: [null, [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    phone: [null, [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    confirmPassword: [null, [Validators.required, Validators.minLength(8)]]
  });
  login: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    password: [null, [Validators.required, Validators.minLength(8)]]
  });

  comparePasswords() {
    if ((this.register.controls.password.value && this.register.controls.confirmPassword.value) && !(this.register.controls.password.value === this.register.controls.confirmPassword.value)) {
      this.register.controls.confirmPassword.setErrors({ wrong: true });
    }
  }

  submitRegister() {
    if (this.register.valid) {
      this.service.register(this.register.value).subscribe((res)=>{
        if(res['status'] == 201) {
          localStorage.setItem('token', res['body']['token']);
          this.router.navigate(['/home']);
        }
      },(error) => {
        this.apexService.showLoader(false);
        if (error.status === 409) {
          if (error.error.email) {
            this.register.controls.email.setErrors({ emailExists: true });
          }
          if (error.error.phone) {
            this.register.controls.phone.setErrors({ phoneExists: true });
          }
        }
      });
    }
  }

  submitLogin() {
    if (this.login.valid) {
      this.service.authenticate(this.login.value).subscribe((res)=>{
        if(res['status'] == 200 && res['body']['isActive'] == true) {
          localStorage.setItem('token', res['body']['token']);
          this.router.navigate(['/home']);
        } else {
          this.toastrService.error('Your account is suspended, Please contact management');
        }
      },(error) => {
        this.apexService.showLoader(false);
        if (error.status === 409) {
          if (error.error.email) {
            this.login.controls.email.setErrors({ notMatched: true });
          }
          if (error.error.password) {
            this.login.controls.password.setErrors({ notMatched: true });
          }
        }
      });
    }
  }
  trim(fieldName) {
    return this.register.controls[fieldName].setValue(this.register.value[fieldName].trim());
  }
  disableWhiteSpace(event) {
    if (event.keyCode === 32) {
      return false;
    }
  }
  disableAlphaAndSpace(event) {
    if (event.keyCode === 32 || event.keyCode < 48 || event.keyCode > 57) {
      return false;
    }
  }
}