import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TechnologieService} from './technologie.service';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TechnologieResolverService implements Resolve<string[]>{
  constructor(private http: HttpClient, private technologieService: TechnologieService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> | Promise<string[]> | string[] {
    return this.http.get<any>('https://studentcv-e105a.firebaseio.com/technologies.json')
      .pipe(
        tap(technologies => {
          for (const key in technologies) {
            this.technologieService.setTechnologie(technologies[key]);
          }
        }));
  }
}
