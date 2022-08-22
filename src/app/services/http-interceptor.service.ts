import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { ApexService } from '../shared/services/apex.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private apexService: ApexService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq: any = req.clone();
    return next.handle(authReq).pipe(tap(
      (response: any) => {
      },
      (error: any) => {
        if (error.status === 409 || error.status === 404) {
          this.showLoader(false);
        } else if (error.status === 401) {
          this.showLoader(false);
          this.router.navigate(['/auth/login']);
        } else {
          this.router.navigate(['/serverError']);
        }
      }));
  }
  showLoader(show: boolean) {
    this.apexService.showLoader(show);
  }
  // private appendAccessToken() {
  //   const accessToken = Storage.getAccessToken();
  //   let headers: HttpHeaders = new HttpHeaders();
  //   headers = headers.set('access_token', accessToken);
  //   return {headers};
  // }
}
