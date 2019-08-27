import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManipulateDriverComponent} from './manipulate-driver/manipulate-driver.component';
import {LoginComponent} from './login/login.component';
import {LoginResolverService} from './resolvers/login-resolver.service';
import {ManipulateDriverFetchResolverService} from './resolvers/manipulate-driver-fetch-resolver.service';
import {TestSuiteComponent} from './test-suite/test-suite.component';
import {TestSuiteFetchResolver} from './resolvers/test-suite-fetch-resolver.service';

const routes: Routes = [
  {
    path: 'manipulate',
    component: ManipulateDriverComponent,
    resolve: {loginResolver: LoginResolverService, testCaseResolver: ManipulateDriverFetchResolverService}
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
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
