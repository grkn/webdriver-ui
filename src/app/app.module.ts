import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TestCaseDriverComponent} from './test-case-driver/test-case-driver.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModules} from './material-design-import/MaterialDesignImport';
import {SideNavBarComponent} from './side-nav-bar/side-nav-bar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './interceptor/http-interceptor.service';
import {ErrorInterceptor} from './interceptor/error-interceptor';
import {LoginComponent} from './login/login.component';
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
import {UserManagementComponent} from './user-management/user-management.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {SlideMenuModule} from 'primeng/slidemenu';
import {TestCaseTypeResolverService} from './resolvers/test-case-type-resolver.service';
import {UserManagementCreateComponent} from './user-management-create/user-management-create.component';
import {RoleManagementListComponent} from './role-management-list/role-management-list.component';
import {RoleManagementCreateComponent} from './role-management-create/role-management-create.component';
import {AddRoleToUserComponent} from './add-role-to-user/add-role-to-user.component';
import {FieldsetModule} from 'primeng/fieldset';
import {UserManagementEditResolverService} from './resolvers/user-management-edit-resolver.service';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DialogService} from 'primeng/api';
import {TestProjectComponent} from './test-project/test-project.component';
import {TestProjectCreateComponent} from './test-project-create/test-project-create.component';
import {OrderListModule} from 'primeng/orderlist';
import {TestProjectResolverService} from './resolvers/test-project-resolver.service';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DriverComponent} from './driver/driver.component';
import {RunTestSuitesComponent} from './runned-test-suites/run-test-suites.component';
import {RunTestDetailComponent} from './run-test-detail/run-test-detail.component';
import {RunTestDetailResolverService} from './resolvers/run-test-detail-resolver.service';
import {TestSuiteRunHistoryComponent} from './test-suite-run-history/test-suite-run-history.component';
import {TestSuiteRunHistoryDetailComponent} from './test-suite-run-history-detail/test-suite-run-history-detail.component';
import {ScrollPanelModule} from 'primeng/primeng';
import {AppMenuComponent, AppSubMenuComponent} from './app.menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TestCaseDriverComponent,
    SideNavBarComponent,
    LoginComponent,
    ReceiveMessageComponent,
    TestSuiteComponent,
    UserManagementComponent,
    UserManagementCreateComponent,
    RoleManagementListComponent,
    RoleManagementCreateComponent,
    AddRoleToUserComponent,
    TestProjectComponent,
    TestProjectCreateComponent,
    RegisterComponent,
    DashboardComponent,
    DriverComponent,
    RunTestSuitesComponent,
    RunTestDetailComponent,
    TestSuiteRunHistoryComponent,
    TestSuiteRunHistoryDetailComponent,
    AppMenuComponent,
    AppSubMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModules,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    PickListModule,
    TreeTableModule,
    TableModule,
    OverlayPanelModule,
    SlideMenuModule,
    FieldsetModule,
    DynamicDialogModule,
    OrderListModule,
    ScrollPanelModule
  ],
  entryComponents: [ReceiveMessageComponent, AddRoleToUserComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    , LoginResolverService, ManipulateDriverFetchResolverService, TestProjectResolverService, RunTestDetailResolverService,
    TestSuiteFetchResolver, TestCaseTypeResolverService, UserManagementEditResolverService, DialogService],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule {
}
