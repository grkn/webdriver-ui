import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestCaseDriverComponent} from './test-case-driver/test-case-driver.component';
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
import {DriverComponent} from './driver/driver.component';
import {RunTestSuitesComponent} from './runned-test-suites/run-test-suites.component';
import {RunTestDetailComponent} from './run-test-detail/run-test-detail.component';
import {RunTestDetailResolverService} from './resolvers/run-test-detail-resolver.service';
import {TestSuiteRunHistoryComponent} from './test-suite-run-history/test-suite-run-history.component';
import {TestSuiteRunHistoryDetailComponent} from './test-suite-run-history-detail/test-suite-run-history-detail.component';
import {TestSuiteRunHistoryDetailResolverService} from './resolvers/test-suite-run-history-detail-resolver.service';
import {TestSuiteDetailResolverService} from './resolvers/test-suite-detail-resolver.service';
import {TestSuiteDetailComponent} from './test-suite-detail/test-suite-detail.component';

const routes: Routes = [
  {
    path: 'testcases',
    component: TestCaseDriverComponent,
    resolve: {loginResolver: LoginResolverService, testCaseResolver: ManipulateDriverFetchResolverService}
  },
  {
    path: 'testcases/:type',
    component: TestCaseDriverComponent,
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
    path: 'testsuites/:id',
    component: TestSuiteDetailComponent,
    resolve: {
      loginResolver: LoginResolverService,
      testSuiteDetailResolver: TestSuiteDetailResolverService
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
  },
  {
    path: 'driver',
    component: DriverComponent,
    resolve: {
      loginResolver: LoginResolverService
    }
  },
  {
    path: 'testsuitesrun',
    component: RunTestSuitesComponent,
    resolve: {
      loginResolver: LoginResolverService
    }
  },
  {
    path: 'testsuitesrun/:id',
    component: RunTestDetailComponent,
    resolve: {
      loginResolver: LoginResolverService,
      runTestDetailResolver: RunTestDetailResolverService
    }
  },
  {
    path: 'suiterunhistory',
    component: TestSuiteRunHistoryComponent,
    resolve: {
      loginResolver: LoginResolverService
    }
  },
  {
    path: 'suiterunhistory/:runId/detail/:testsuiteId',
    component: TestSuiteRunHistoryDetailComponent,
    resolve: {
      loginResolver: LoginResolverService,
      testSuiteRunHistoryDetailResolver: TestSuiteRunHistoryDetailResolverService
    }
  },
  {
    path: '**',
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
