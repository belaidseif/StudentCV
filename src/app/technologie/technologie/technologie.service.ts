import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TechnologieService {
  technologie: string[] = [];
  technologieSubject = new Subject<string[]>();

  constructor(private http: HttpClient) {
  }

  getTechnologie(){
    return this.technologie.slice();
  }

  setTechnologie(technologie: string[]){
    this.technologie = technologie;
    this.technologieSubject.next(technologie);
  }

  put(listTechnologies: string[]) {
    this.http.put("https://studentcv-e105a.firebaseio.com/technologies/-M9wy6TMUdbNqDCNi6qY.json", listTechnologies).subscribe(res => {
      this.technologie = listTechnologies;
      this.technologieSubject.next(listTechnologies);
    }, error => {
      this.technologieSubject.next(this.technologie);
    });
  }
}
