import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StudentService} from '../student.service';
import {Student} from '../student';

@Component({
  selector: 'app-details-student',
  templateUrl: './details-student.component.html',
  styleUrls: ['./details-student.component.css']
})
export class DetailsStudentComponent implements OnInit {
  student: Student = null;
  pending  = false;
  constructor(private route: ActivatedRoute, private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      const id = param.id;
      this.student = this.studentService.getStudents().find(s => s.id === id);
    });
  }
  onDelete(){
    this.pending = true;
    this.studentService.delete(this.student).then(t => {
      this.pending = t;
      this.router.navigate(['/list-student']);
    });
  }
}
