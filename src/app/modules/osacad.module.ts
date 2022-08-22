import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OSAcadRoutingModule } from '../routes/osacad-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProgramsComponent } from '../components/programs/programs.component';
import { ProgramInfoComponent } from '../components/program-info/program-info.component';
import { OrderDetailsComponent } from '../components/order-details/order-details.component';
import { FaqComponent } from '../components/common/faq/faq.component';
import { FeedbackComponent } from '../components/common/feedback/feedback.component';
import { KickStartComponent } from '../components/common/kick-start/kick-start.component';
import { OurPartnersComponent } from '../components/common/our-partners/our-partners.component';
import { HiringPartnersComponent } from '../components/common/hiring-partners/hiring-partners.component';
import { MyClassroomComponent } from '../components/my-classroom/my-classroom.component';
import { OrderConfirmComponent } from '../components/order-confirm/order-confirm.component';

@NgModule({
  declarations: [
    ProgramsComponent,
    ProgramInfoComponent,
    OrderDetailsComponent,
    FaqComponent,
    FeedbackComponent,
    KickStartComponent,
    OurPartnersComponent,
    HiringPartnersComponent,
    MyClassroomComponent,
    OrderConfirmComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OSAcadRoutingModule,
  ]
})
export class OsacadModule { }
