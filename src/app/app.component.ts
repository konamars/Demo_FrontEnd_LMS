import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Router, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { ApexService } from './shared/services/apex.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked{
  showNavbar: any = false;
  showLoader: any = true;
  routes: string[] = [
    '/auth/register',
    '/auth/login',
    '/orderDetails',
    '/auth/resetPassword',
    '/auth/confirmEmail',
    '/auth/sendEmail',
    '/orderConfirmation',
    '/serverError',
    '/'
  ];
  constructor(
    private router: Router,
    private apexService: ApexService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.apexService.showLoader(false);
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
  ngOnInit() {
    this.apexService.loaderEventValue.subscribe(data => {
      if (data !== this.showLoader) {
        this.showLoader = data;
      }
    });
    this.onDetectRoute();
    this.cdRef.detectChanges();
  }
  onDetectRoute() {
    this.router.events.subscribe((event: any) => {
      if ((event instanceof NavigationStart)) {
        const currentRoute = event.url.includes('?') ? event.url.substring(0, event.url.indexOf('?')) : event.url;
        this.showNavbar = !!(!this.routes.some(route => currentRoute === route));
      }
      if (event instanceof RouteConfigLoadStart) {
        this.showLoader = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.showLoader = false;
      }
    });
  }
}
