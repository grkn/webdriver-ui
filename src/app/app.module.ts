import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ManipulateDriverComponent} from './manipulate-driver/manipulate-driver.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModules} from './material-design-import/MaterialDesignImport';
import {SideNavBarComponent} from './side-nav-bar/side-nav-bar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './interceptor/http-interceptor.service';
import {ErrorInterceptor} from './interceptor/error-interceptor';
import {LoginComponent} from './login/login.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {ReceiveMessageComponent} from './dialogs/receive-message/receive-message.component';
import {LoginResolverService} from './resolvers/login-resolver.service';
import {ManipulateDriverFetchResolverService} from './resolvers/manipulate-driver-fetch-resolver.service';
import {ToastrModule} from 'ngx-toastr';
import {TestSuiteComponent} from './test-suite/test-suite.component';
import {PickListModule} from 'primeng/picklist';
import {TestSuiteFetchResolver} from './resolvers/test-suite-fetch-resolver.service';
import {TreeTableModule} from 'primeng/treetable';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    ManipulateDriverComponent,
    SideNavBarComponent,
    LoginComponent,
    ReceiveMessageComponent,
    TestSuiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    PickListModule,
    TreeTableModule,
    TableModule
  ],
  entryComponents: [ReceiveMessageComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    , LoginResolverService, ManipulateDriverFetchResolverService, TestSuiteFetchResolver],
  bootstrap: [AppComponent]
})
export class AppModule {
}
