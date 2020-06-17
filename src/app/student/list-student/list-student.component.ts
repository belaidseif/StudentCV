import { Component, OnInit } from '@angular/core';
import {Student} from '../student';
import {StudentService} from '../student.service';
import {ActivatedRoute} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css'],
  animations: [
    trigger('divState', [
      state('normal', style({
        transform: 'translateY(500px)',
        opacity: 0
      })),
      state('animated', style({
        transform: 'translateY(0px)',
        opacity: 1
      })),
      state( 'trashed', style({
        transform: 'translateY(0px)',
        opacity: 0
        })
      ),
      transition('* => animated', animate(500)),
      transition('animated => trashed', animate(1)),

    ])
  ]
})
export class ListStudentComponent implements OnInit {
  state = 'normal';
  students: Student[] = [];
  classCss = 'col-md-7 col-md-offset-2';
  modeAdd = false;
  modeDetails = false;
  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
    this.studentService.studentSubject.subscribe(res => {
      this.students = this.studentService.getStudents();
    });
    this.route.url.subscribe(value => {
      if(value[1]){
        const path = value[1].path;
        if(path.includes('add') || path.includes('edit')){
          this.classCss = 'col-md-7';
          this.modeAdd = true;
          this.modeDetails = false;
          setTimeout(() => this.state = 'animated', 1000);
        }else if(path.includes('details')){
          this.state = 'trashed';
          this.state = 'normal';
          this.classCss = 'col-md-5';
          this.modeDetails = true;
          this.modeAdd = false;
          setTimeout(() => this.state = 'animated', 800);
        }
      }else {
        this.classCss = 'col-md-7 col-md-offset-2';
        this.modeDetails = false;
        this.modeAdd = false;
      }

    });
  }
  onAnimate(){
    this.state === 'normal'? this.state = 'animated': this.state = 'normal';
  }
}
