import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { Subscription } from 'rxjs';
import { CommonService, subscriptionHandler } from '../common/common.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
    credentials = {
        username: '',
        password: ''
    };
    loginFail = false;
    $subscriptions: Subscription[] = [];

    constructor(private loginService: LoginService, private router: Router, private _commonService: CommonService) { }

    ngOnInit() {}

    ngOnDestroy() {
        subscriptionHandler(this.$subscriptions);
    }
    login() {
        if (this.credentials.username && this.credentials.password) {
            this.$subscriptions.push(this.loginService.login().subscribe(
                (data: any) => {
                    const response = (this.credentials.username == data.username && this.credentials.password === data.password) ? true : false;
                    if (response) {
                        this.loginFail = false;
                        this.router.navigate(['user-registration/home']);
                    } else {
                        this.loginFail = true;
                        this.credentials.username = '';
                        this.credentials.password = '';
                    }
                }));
            } else {
                this.loginFail = true; 
            }
    }
}
