import { CommonService } from './../common/common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  userData = new BehaviorSubject({});

  constructor(private _http: HttpClient, private _common: CommonService) { }

  getAllUserList() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin', '*');
    return this._http.get('/getAllUsers/api/0.8/?results=20', {headers});
  }
}
