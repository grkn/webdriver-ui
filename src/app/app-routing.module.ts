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
import {UserManagementComponent} from './user-management/user-management.component';
import {RoleManagementCreateComponent} from './role-management-create/role-management-create.component';
import {UserManagementEditResolverService} from './resolvers/user-management-edit-resolver.service';
import {TestProjectComponent} from './test-project/test-project.component';
import {TestProjectCreateComponent} from './test-project-create/test-project-create.component';
import {TestProjectResolverService} from './resolvers/test-project-resolver.service';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';

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
    component: UserManagementCreateComponent,
    resolve: {
      loginResolver: LoginResolverService
    }
  },
  {
    path: 'usermanagement/create/:id',
    component: UserManagementCreateComponent,
    resolve: {
      loginResolver: LoginResolverService,
      editResolver: UserManagementEditResolverService
    }
  },
  {
    path: 'usermanagement/role',
    component: RoleManagementListComponent,
    resolve: {
      loginResolver: LoginResolverService
    }
  },
  {
    path: 'usermanagement/role/create',
    component: RoleManagementCreateComponent,
    resolve: {
      loginResolver: LoginResolverService
    }
  },
  {
    path: 'testproject',
    component: TestProjectComponent,
    resolve: {
      loginResolver: LoginResolverService
    }
  },
  {
    path: 'testproject/create',
    component: TestProjectCreateComponent,
    resolve: {
      loginResolver: LoginResolverService
    }
  },
  {
    path: 'testproject/create/:id',
    component: TestProjectCreateComponent,
    resolve: {
      loginResolver: LoginResolverService,
      testProjectResolver: TestProjectResolverService
    }
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: {
      loginResolver: LoginResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
