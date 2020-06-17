import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Student} from '../student';
import {TechnologieService} from '../../technologie/technologie/technologie.service';
import {StudentService} from '../student.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  @ViewChild('frm') slForm: NgForm;
  @ViewChild('auto') auto;
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.keyCode == 13){
      if(this.tech !== ''){
        this.onAddTech();
        this.tech = '';
        this.auto.clear();
      }
    }
  }
  listTechnologies: string[] = [];
  technologies: string[] = [];
  tech: string = '';
  isEdit= false;
  student: Student = null;
  pending = false;

  surname = null;
  name = null;
  image = null;
  constructor(private http: HttpClient,
              private technologieService: TechnologieService,
              private studentService: StudentService,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.listTechnologies = this.technologieService.getTechnologie();
    this.technologieService.technologieSubject.subscribe(technologies => {
      this.listTechnologies = this.technologieService.getTechnologie();
    });
    this.route.params.subscribe((param: Params) => {
      const id = param['id'];
      if(id){
        this.student = this.studentService.getStudents().find(s => s.id === id);
        console.log(this.student);
        this.isEdit = true;
        this.initForm();
        console.log(this.slForm);
      }
    })
  }

  private initForm() {
    this.name = this.student.name;
    this.surname = this.student.surname;
    this.image = this.student.image;
    this.technologies = this.student.technologies;
  }


  onSubmit(form: NgForm){
    this.pending = true;
    const student = new Student();
    student.name = form.value.name;
    student.surname = form.value.surname;
    student.image = form.value.image;
    student.technologies = this.technologies;
    this.refreshTechnologie();
    if(this.isEdit){
      this.studentService.put(student, this.student.id).then(t => this.pending = false);
    }else {
      this.studentService.post(student).then(t => this.pending = false);
    }
    this.isEdit = false;
    form.reset();
    this.technologies = [];
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
  onDeleteTek(i){
    this.technologies.splice(i, 1);
  }

  keyword = 'name';


  selectEvent(item: string) {
    // do something with selected item
    this.tech = item;
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    this.tech = val;

  }

  onFocused(e){
    // do something when input is focused

  }
}
