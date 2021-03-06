import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';

const routes: Routes = [
  { path: '', component: LoginComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule { }
