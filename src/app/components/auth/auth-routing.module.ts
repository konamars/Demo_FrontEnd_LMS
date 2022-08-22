import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: 'auth/login', component: AuthComponent, data: { type: 'login' } },
  { path: 'auth/register', component: AuthComponent, data: { type: 'register' } },
  { path: 'auth/resetPassword', component: ResetPasswordComponent },
  { path: 'auth/sendEmail', component: SendEmailComponent },
  { path: 'auth/confirmEmail', component: ConfirmEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
