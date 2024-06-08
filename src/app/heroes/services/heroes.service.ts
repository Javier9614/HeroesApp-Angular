import { environments } from '../../../environments/environments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';



@Injectable({providedIn: 'root'})
export class HeroesService {

  private url: string = environments.apiUrl;

  constructor(private http: HttpClient) { }

  getHeroes():Observable <Hero[]>{
    const urlHeroes= `${this.url}/heroes`;
    console.log(`url que traigo  ${this.url}/heroes`)
    return this.http.get<Hero[]>(urlHeroes);
  }

}
