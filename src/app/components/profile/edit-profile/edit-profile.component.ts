import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OsacadService } from '../../../services/osacad.service';
import { ToastrService } from 'ngx-toastr';
import { ApexService } from '../../../shared/services/apex.service';
import { CommonService } from '../../../services/common.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  studentDetails: any;
  defaultImage: any = 'assets/images/user.png';
  constructor(
      private apexService: ApexService,
      private formBuilder: FormBuilder,
      private osacadService: OsacadService,
      private commonService: CommonService,
      private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createEditProfile();
    this.getDetails();
  }
  getDetails() {
    this.osacadService.getStudentDetails().subscribe(
      (response: any) => {
        if (response && response.status === 200) {
          this.studentDetails = response.body;
          this.editProfileForm.patchValue(response.body);
        }
      });
  }
  update() {
    if (this.editProfileForm.valid) {
      this.osacadService.editProfile(this.editProfileForm.value).subscribe(
        (response: any) => {
          if (response && response.status === 200) {
            this.toastrService.success('Updated successfully');
          }
        }, (error) => {
          if (error.status == 409) {
            if (error.error.email) {
              this.editProfileForm.controls.email.setErrors({ emailExists: true });
            }
            if (error.error.phone) {
              this.editProfileForm.controls.phone.setErrors({ phoneExists: true });
            }
            console.log(this.editProfileForm);
          } else {
            this.toastrService.error('Failed in updating');
          }
          this.apexService.showLoader(false);
        });
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (['image/png', 'image/jpeg', 'image/gif', 'image/bmp'].includes(file.type)) {
        if (Math.round(file.size / 1024) < 1024) {
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (event) => {
            const a: any = event.target;
            this.osacadService.updateProfilePicture({profilePicture: a.result}).subscribe( (response: any) => {
              if (response && response.status === 200) {
                this.commonService.triggerProfileDp = response.body;
                this.studentDetails = response.body;
                this.editProfileForm.patchValue({profilePicture: this.studentDetails.profilePicture});
              } else {
                this.editProfileForm.patchValue({profilePicture: this.defaultImage});
                this.toastrService.error('Failed to upload, try again');
              }
            });
          };
        } else {
          this.toastrService.error('Please upload file less than 1 MB');
        }
      } else {
        this.toastrService.error('Unsupported format');
      }
    }
  }
  public delete() {
    this.osacadService.deleteProfilePicture().subscribe( (response: any) => {
      if (response && response.status === 200) {
        this.commonService.triggerProfileDp = response.body;
        this.studentDetails = response.body;
        this.editProfileForm.patchValue({profilePicture: this.studentDetails.profilePicture});
      } else {
        this.editProfileForm.patchValue({profilePicture: this.defaultImage});
        this.toastrService.error('Failed to upload, try again');
      }
    }, (error) => {
        this.apexService.showLoader(false);
        this.editProfileForm.patchValue({profilePicture: this.defaultImage});
        this.toastrService.error('Failed to upload, try again');
    });
  }

  createEditProfile() {
    this.editProfileForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      phone: [null, [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
    });
  }
  trim(fieldName) {
    return this.editProfileForm.controls[fieldName].setValue(this.editProfileForm.value[fieldName].trim());
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
  cancel() {
    this.getDetails();
  }

}
