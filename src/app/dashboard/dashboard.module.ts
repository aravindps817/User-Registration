import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';

const routes: Routes = [
  { path: '', component: DashboardComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    FormsModule
  ],
  declarations: [DashboardComponent, UserComponent,FilterPipe]
})
export class DashboardModule { }
