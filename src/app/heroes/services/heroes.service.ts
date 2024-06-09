import { environments } from '../../../environments/environments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, pipe } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';



@Injectable({providedIn: 'root'})
export class HeroesService {

  private url: string = environments.apiUrl;

  constructor(private http: HttpClient) { }

  getHeroes():Observable <Hero[]>{
    const urlHeroes= `${this.url}/heroes`;
    return this.http.get<Hero[]>(urlHeroes);
  }

  getHeroById(id:string):Observable<Hero | undefined>{
    return this.http.get<Hero>(`${ this.url}/heroes/${id}`)
    .pipe(
      catchError( error => of(undefined) )
    );
  }

  gerSuggestions(query:string):Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.url}/heroes?q=${query}&_limit=6`);
   }
}
