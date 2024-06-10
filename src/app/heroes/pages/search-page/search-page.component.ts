import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'heroes-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent{

  public searchInput = new FormControl('');
  public heroes:Hero[] =[];
  public selectedHero?:Hero

  searchHero(){
    const value: string =this.searchInput.value || '';
    this.heroesService.gerSuggestions(value)
    .subscribe( h => this.heroes = h)


  }

  constructor(private heroesService:HeroesService){}

  onSelectedOption(event:MatAutocompleteActivatedEvent):void{
    if (!event.option?.value){
      this.selectedHero = undefined;
      return
    }
    const hero: Hero =event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }

}
