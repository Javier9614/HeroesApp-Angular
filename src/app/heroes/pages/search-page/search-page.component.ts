import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent{

  public searchInput = new FormControl('');
  public heroes:Hero[] =[];

  searchHero(){
    const value: string =this.searchInput.value || '';
    this.heroesService.gerSuggestions(value)
    .subscribe( h => this.heroes = h)


  }

  constructor(private heroesService:HeroesService){}




}
