import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManipulateDriverComponent} from "./manipulate-driver/manipulate-driver.component";


const routes: Routes = [{path: "manipulate", component: ManipulateDriverComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
