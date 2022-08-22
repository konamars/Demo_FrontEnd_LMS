import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent } from './profile.component';
import {CertificateComponent } from './certificate/certificate.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {InvoicesComponent } from './invoices/invoices.component';
import { UserGuard } from '../../shared/route-guards/user.guard';

const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
      {path: 'certificate', component: CertificateComponent, canActivate: [UserGuard]},
      {path: 'change-password', component: ChangePasswordComponent, canActivate: [UserGuard]},
      {path: 'edit-profile', component: EditProfileComponent, canActivate: [UserGuard]},
      {path: 'invoices', component: InvoicesComponent, canActivate: [UserGuard]},
      { path: '**', redirectTo: 'edit-profile' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
