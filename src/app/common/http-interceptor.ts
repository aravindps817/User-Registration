
import {throwError as observableThrowError,  Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';

import { Router } from '@angular/router';
import { CommonService } from './common.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private _router: Router, private _commonService: CommonService) { }
    AuthToken: any = null;
    /**catches every request and adds the authentication token from local storage
     * creates new header with auth-key
    */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.AuthToken = localStorage.getItem('Authorization');
    if (!this.AuthToken) {
        this.AuthToken = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6IiIsImZ1bGxOYW1lIjoiQWRtaW4iLCJpYXQiOjE2MTMzMjA4MTEsImV4cCI6MTYxNDE4NDgxMX0.uzoMxpuD-n8s9Qsjgw83jbgs-ixNuXqZ6FPFeHmtWRUUhZ7ugz6Dl9MsXXX4ITNpxiS9Ns5UrSv9XAqwMsgaag';
    }
    const authReq = req.clone({ headers: req.headers.set('Authorization', this.AuthToken)});
    return next.handle(authReq).pipe(
        catchError((error) => {
        
            if (error.status === 401) {
                localStorage.clear();
            }
            return observableThrowError(error);
        }),) as any;
    }
}
