export class HttpReq {
    url: string;
    type: string;
    showLoader: any = false;
    body: any = {};
    contentType: any = 'application/json';
    isAcessTokenReq = false;
}