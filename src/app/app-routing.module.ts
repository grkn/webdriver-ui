import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManipulateDriverComponent} from './manipulate-driver/manipulate-driver.component';
import {LoginComponent} from './login/login.component';
import {LoginResolverService} from './resolvers/login-resolver.service';
import {ManipulateDriverFetchResolverService} from './resolvers/manipulate-driver-fetch-resolver.service';
import {TestSuiteComponent} from './test-suite/test-suite.component';
import {TestSuiteFetchResolver} from './resolvers/test-suite-fetch-resolver.service';
import {TestCaseTypeResolverService} from './resolvers/test-case-type-resolver.service';
import {RoleManagementListComponent} from './role-management-list/role-management-list.component';
import {UserManagementCreateComponent} from './user-management-create/user-management-create.component';
import {AddRoleToUserComponent} from './add-role-to-user/add-role-to-user.component';
import {UserManagementComponent} from './user-management/user-management.component';
import {RoleManagementCreateComponent} from './role-management-create/role-management-create.component';

const routes: Routes = [
  {
    path: 'testcases',
    component: ManipulateDriverComponent,
    resolve: {loginResolver: LoginResolverService, testCaseResolver: ManipulateDriverFetchResolverService}
  },
  {
    path: 'testcases/:type',
    component: ManipulateDriverComponent,
    resolve: {loginResolver: LoginResolverService, typeResolver: TestCaseTypeResolverService}
  },
  {
    path: 'testsuites',
    component: TestSuiteComponent,
    resolve: {
      loginResolver: LoginResolverService,
      testCaseResolver: ManipulateDriverFetchResolverService,
      testSuiteResolver: TestSuiteFetchResolver
    }
  },
  {
    path: 'usermanagement', component: UserManagementComponent,
  },
  {
    path: 'usermanagement/create',
    component: UserManagementCreateComponent
  },
  {
    path: 'usermanagement/role',
    component: RoleManagementListComponent
  },
  {
    path: 'usermanagement/role/create',
    component: RoleManagementCreateComponent
  },
  {
    path: 'usermanagement/role/addroletouser',
    component: AddRoleToUserComponent
  },
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
