import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Student} from './student';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {StudentService} from './student.service';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class StudentResolverService implements Resolve<Student[]>{
  constructor(private http: HttpClient, private studentService: StudentService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Student[]> | Promise<Student[]> | Student[] {
    return this.http.get<Student[]>('https://studentcv-e105a.firebaseio.com/students.json')
      .pipe(
        tap(students => {
          const studentToset: Student[] = [];
          for (const key in students) {
            const student: Student = {id: key, ...students[key]};
            studentToset.push(student);
          }
          this.studentService.setStudents(studentToset);
        }));
  }
}
