import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManipulateDriverComponent} from './manipulate-driver/manipulate-driver.component';
import {TestCaseCreationComponent} from './test-case-creation/test-case-creation.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: 'testcasecreation', component: TestCaseCreationComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: ManipulateDriverComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
