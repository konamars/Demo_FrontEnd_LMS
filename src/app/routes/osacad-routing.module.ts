import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProgramsComponent } from '../components/programs/programs.component';
import { ProgramInfoComponent } from '../components/program-info/program-info.component';
import { OrderDetailsComponent } from '../components/order-details/order-details.component';
import { MyClassroomComponent } from '../components/my-classroom/my-classroom.component';
import { OrderConfirmComponent } from '../components/order-confirm/order-confirm.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { UserGuard } from '../shared/route-guards/user.guard';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'home', component: ProgramsComponent, canActivate: [UserGuard]},
  {path: 'programInfo', component: ProgramInfoComponent, canActivate: [UserGuard]},
  {path: 'orderDetails', component: OrderDetailsComponent, canActivate: [UserGuard]},
  {path: 'myClassroom', component: MyClassroomComponent, canActivate: [UserGuard]},
  {path: 'orderConfirmation', component: OrderConfirmComponent, canActivate: [UserGuard]},
  {
    path: 'course-activity',
    canActivate: [UserGuard],
    loadChildren: () => import('../components/course-activity/course-activity.module').then(m => m.CourseActivityModule)
  },
  {
    path: 'profile',
    canActivate: [UserGuard],
    loadChildren: () => import('../components/profile/profile.module').then(m => m.ProfileModule)}
  // {
  //   path: 'auth',
  //   loadChildren: () => import('../components/auth/auth.module').then(m => m.AuthModule)
  // },
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class OSAcadRoutingModule { }
