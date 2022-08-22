import {Injectable} from '@angular/core';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {Storage} from '../utils/storage';
@Injectable()
export class AppService {
    constructor(private router: Router, private route: ActivatedRoute){}
    navigate(url: string, params?: any) {
        if (params) {
            let param: any = {};
            if (params instanceof Array) {
                for (let i=0; i< params.length; i++) {
                    for(let key in params[i]){
                        param[key] = params[i][key];
                    }
                }
            } else {
                param = params;
            }
            const navigationExtras: NavigationExtras = {
                queryParams: param
            };
            this.router.navigate([url], navigationExtras);
        } else {
            this.router.navigate([url]);
        }
    }
    getParam(key: string) {
        return this.route.snapshot.queryParams[key];
    }
     getLocalItem(key: string) {
        return Storage.getLocalItem(key);
    }
     setLocalItem(key: string, value: any){
        return Storage.setLocalItem(key, value);
    }
     getSessionItem(key: string){
        return Storage.getSessionItem(key);
    }
     setSessionItem(key: string, value: any){
        return Storage.setSessionItem(key, value);
    }
     getSessionUser() {
        return Storage.getSessionUser();
    }

}