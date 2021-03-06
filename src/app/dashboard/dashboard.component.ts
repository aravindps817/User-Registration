import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { subscriptionHandler } from '../common/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  $subscriptions: Subscription[] = [];
  userList: any = [];
  p: number = 1;
  isUserModal = false;
  searchInput: any;
  
  constructor(private _router: Router, private _dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getUserData();
    this.loadDashboard();
  }

  getUserData() {
    this.$subscriptions.push(this._dashboardService.userData.subscribe((data: any) => {
      if (data && data.length) {
        this.userList = data;
      }
    }));
  }

  /** fetch institute proposal list */
  loadDashboard() {
    this.$subscriptions.push(this._dashboardService.getAllUserList()
      .subscribe((data: any) => {
        this.userList = data.results || [];
        this._dashboardService.userData.next(this.userList);
        this.updateLocalStorageWithUserDetails(this.userList)
      }));
  }

/**
* @param  {} details update the local storage with application constant values
*/
  updateLocalStorageWithUserDetails(details: any) {
    localStorage.removeItem('userDetails');
    localStorage.setItem('userDetails', JSON.stringify(details));
  }
  createNewUser() {
  }

  ngOnDestroy() {
    subscriptionHandler(this.$subscriptions);
  }
}
