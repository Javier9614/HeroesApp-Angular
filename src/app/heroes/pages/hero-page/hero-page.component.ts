import { Component, Input, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'heroes-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit{


  public hero?: Hero;
  constructor(
    private heroesService:HeroesService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ){}

    ngOnInit(): void {
      this.activatedRoute.params
      .pipe(
        delay(1000),
        switchMap(  ({id})  => this.heroesService.getHeroById( id )),
      )
      .subscribe( hero =>{
       if(!hero) return this.router.navigate(['/heroes/hero-list'])
        this.hero = hero
        return;
      })
    }

    goBack():void{
      this.router.navigateByUrl('/heroes/hero-list')
    }

}
