import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ManipulateDriverComponent} from './manipulate-driver/manipulate-driver.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDrawerContainer,
  MatSidenavContainer,
  MatSidenavModule
} from '@angular/material';
import {MaterialModules} from './material-design-import/MaterialDesignImport';
import {SideNavBarComponent} from './side-nav-bar/side-nav-bar.component';
import {TestCaseCreationComponent} from './test-case-creation/test-case-creation.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './interceptor/http-interceptor.service';
import {ErrorInterceptor} from './interceptor/error-interceptor';
import {LoginComponent} from './login/login.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import { ReceiveMessageComponent } from './dialogs/receive-message/receive-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ManipulateDriverComponent,
    SideNavBarComponent,
    TestCaseCreationComponent,
    LoginComponent,
    ReceiveMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule
  ],
  entryComponents: [ReceiveMessageComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
