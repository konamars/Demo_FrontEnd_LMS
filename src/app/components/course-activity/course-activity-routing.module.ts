import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseActivityComponent } from './course-activity.component';
import { ResourcesComponent } from './resources/resources.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { ProjectsComponent } from './projects/projects.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CourseInfoComponent } from './course-info/course-info.component';


const routes: Routes = [
  {
    path: ':id', component: CourseActivityComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'course-info' },
      { path: 'course-info', component: CourseInfoComponent },
      { path: 'resources', component: ResourcesComponent },
      { path: 'assignments', component: AssignmentsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'discussion', component: DiscussionComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: '**', redirectTo: 'course-info' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseActivityRoutingModule { }
