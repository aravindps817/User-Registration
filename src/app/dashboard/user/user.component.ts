import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any = {
    gender: '',
    name: {
      title: null,
      first: '',
      last: ''
    },
    email: '',
    username: '',
    password: '',
    dob: '',
    phone: ''
  };
  $subscriptions: Subscription[] = [];
  userList: any = [];
  constructor(private _dashboardService: DashboardService,private toastr: ToastrService,) { }

  ngOnInit() {
    this.getUserData();
  }

  clearUserDetails() {
    this.user = {
      gender: '',
      name: {
        title: null,
        first: '',
        last: ''
      },
      email: '',
      username: '',
      password: '',
      dob: '',
      phone: ''
    };
  }

  getUserData() {
    this.$subscriptions.push(this._dashboardService.userData.subscribe((data: any) => {
      if (data && data.length) {
        this.userList = data;
      }
    }));
  }

  saveUser() {debugger
    this.userList.push({'user': this.user});
    this._dashboardService.userData.next(this.userList);
    this.updateLocalStorageWithUserDetails(this.userList)
    this.clearUserDetails()
    this.toastr.success('User Data added successfully.');
  }

  /**
  * @param  {} details update the local storage with application constant values
  */
  updateLocalStorageWithUserDetails(details: any) {
    localStorage.removeItem('userDetails');
    localStorage.setItem('userDetails', JSON.stringify(details));
  }

}
