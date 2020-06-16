import {RouterModule, Routes} from '@angular/router';
import {TechnologieResolverService} from './technologie/technologie/technologie-resolver.service';
import {NgModule} from '@angular/core';
import {ListStudentComponent} from './student/list-student/list-student.component';
import {StudentResolverService} from './student/student-resolver.service';

const routes: Routes = [
  {path: 'list-student', component: ListStudentComponent, resolve: [TechnologieResolverService, StudentResolverService]}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
