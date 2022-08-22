import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { OsacadModule } from './modules/osacad.module';
import { AppRoutingModule } from './routes/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import {ProgressBarModule} from "angular-progress-bar";
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/common/nav-bar/nav-bar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './components/auth/auth.module';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { InvoicesComponent } from './components/profile/invoices/invoices.component';
import { CertificateComponent } from './components/profile/certificate/certificate.component';
import {MatRadioModule} from '@angular/material/radio';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServerErrorComponent } from './components/server-error/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    EditProfileComponent,
    ProfileComponent,
    ChangePasswordComponent,
    InvoicesComponent,
    CertificateComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    MatRadioModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    OsacadModule,
    AppRoutingModule,
    ToastrModule.forRoot({positionClass: 'toast-top-center', timeOut: 2000}),
    BrowserAnimationsModule,
    ProgressBarModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
