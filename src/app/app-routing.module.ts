import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManipulateDriverComponent} from './manipulate-driver/manipulate-driver.component';
import {TestCaseCreationComponent} from './test-case-creation/test-case-creation.component';
import {LoginComponent} from './login/login.component';
import {LoginResolverService} from './resolvers/login-resolver.service';
import {ManipulateDriverFetchResolverService} from './resolvers/manipulate-driver-fetch-resolver.service';

const routes: Routes = [
  {
    path: 'manipulate',
    component: ManipulateDriverComponent,
    resolve: {manipulateResolver: LoginResolverService, testCaseResolver: ManipulateDriverFetchResolverService}
  },
  {path: 'testcasecreation', component: TestCaseCreationComponent, resolve: {testcaseCreationResolver: LoginResolverService}},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
