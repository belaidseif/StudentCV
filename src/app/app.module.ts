import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListStudentComponent } from './student/list-student/list-student.component';
import { FooterComponent } from './footer/footer.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { TechnologieComponent } from './technologie/technologie/technologie.component';
import {AppRoutingModule} from './app-routing.module';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { DetailsStudentComponent } from './student/details-student/details-student.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListStudentComponent,
    FooterComponent,
    AddStudentComponent,
    TechnologieComponent,
    LoadingSpinnerComponent,
    DetailsStudentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    AutocompleteLibModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
