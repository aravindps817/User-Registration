import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './common/footer/footer.component';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppRouterComponent } from './common/app-router/app-router.component';
import { HeaderComponent } from './common/header/header.component';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from './common/common.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppHttpInterceptor } from './common/http-interceptor';
import { LoginService } from './login/login.service';
import { ToastrModule } from 'ngx-toastr';

export function getAppConfiguration(appConfigurationServiceService: CommonService) {
  return () => appConfigurationServiceService.getAppConfig();
}
@NgModule({
  declarations: [	
    AppRouterComponent,
    HeaderComponent,
    LogoutComponent,
    AppComponent,
    LogoutComponent,
    FooterComponent,
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: getAppConfiguration,
      deps: [CommonService],
      multi: true
  },
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  CommonService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
