import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ManipulateDriverComponent} from "./manipulate-driver/manipulate-driver.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatButtonToggleModule, MatCardModule} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    ManipulateDriverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
