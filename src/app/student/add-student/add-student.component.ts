import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Student} from '../student';
import {TechnologieService} from '../../technologie/technologie/technologie.service';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  listTechnologies: string[] = [];
  technologies: string[] = [];
  tech: string = '';

  pending = false;
  constructor(private http: HttpClient, private technologieService: TechnologieService, private studentService: StudentService) { }

  ngOnInit(): void {
    this.listTechnologies = this.technologieService.getTechnologie();
    this.technologieService.technologieSubject.subscribe(technologies => {
      this.listTechnologies = this.technologieService.getTechnologie();
    });
  }

  onSubmit(form: NgForm){
    this.pending = true;
    const student = new Student();
    student.name = form.value.name;
    student.surname = form.value.surname;
    student.image = form.value.image;
    student.technologies = this.technologies;
    this.refreshTechnologie();
    this.studentService.post(student).then(t => this.pending = false);

  }

  private refreshTechnologie() {
    for(let tek of this.technologies){
      if(!this.listTechnologies.find(s => tek === s)){
        this.listTechnologies.push(tek);
      }
    }
    this.technologieService.put(this.listTechnologies);
  }
  onAddTech(){
    if(!this.technologies.find(s => this.tech === s)){
      this.technologies.push(this.tech);
    }else{
      console.log('do nothing');
    }
  }
}
