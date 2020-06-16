import {Injectable} from '@angular/core';
import {Student} from './student';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class StudentService {
  students: Student[] = [];
  studentSubject = new Subject<Student[]>();
  constructor(private http: HttpClient) {
  }
  getStudents(){
    return this.students.slice();
  }

  setStudents(students: Student[]){
    this.students = students;
    this.studentSubject.next(students);
  }

  post(student: Student): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post("https://studentcv-e105a.firebaseio.com/students.json", student).subscribe(res => {
        this.get();
        resolve(false);
        reject(false);
      });
    });
  }

  get(){
    this.http.get<Student[]>('https://studentcv-e105a.firebaseio.com/students.json').subscribe(students => {
      const studentToset: Student[] = [];
      for (const key in students) {
        const student: Student = {id: key, ...students[key]};
        studentToset.push(student);
      }
      this.setStudents(studentToset);
    });
  }
}
