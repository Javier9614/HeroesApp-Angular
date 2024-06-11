import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'heroes-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: ``
})
export class NewHeroPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alter_img: new FormControl('')
  });

    public publishers =[
      {id:'DC Comics', desc:'DC - Comics'},
      {id:'Marvel Comics', desc:'Marvel - Comics'}
    ]


    constructor(
      private heroesService:HeroesService,
      private ActivatedRoute: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar,
      private dialog:MatDialog
    ){}
      get currentHero() :Hero{
        const hero = this.heroForm.value as Hero;
        return hero
    }

    ngOnInit(): void {
      if( !this.router.url.includes('edit') ) return
      this.ActivatedRoute.params
        .pipe(
          switchMap( ( {id} ) => this.heroesService.getHeroById(id))
        ).subscribe (hero =>{

          if(!hero) return this.router.navigateByUrl('/');

           this.heroForm.reset(hero);

          return


        })
    }

    onSubmit():void{
      if (!this.heroForm.valid) return

      if(this.currentHero.id){

        this.heroesService.updateHero(this.currentHero)
        .subscribe( hero => {

        this.showSnackbar( `${hero.superhero} updated!`);

        });
        return
      }

      this.heroesService.addHero( this.currentHero)
      .subscribe( hero =>{
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackbar( `${hero.superhero} created!`);

      });

    }

    onDeleteHero(){
      if(!this.currentHero.id) throw Error ('Hero id is required')

        let dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: this.heroForm.value
        });
        dialogRef.afterClosed().subscribe(result => {
          if (!result) return;
          console.log('deleted');
        this.heroesService.deleteHeroById(this.currentHero.id)
        this.router.navigateByUrl('/')
        });




    }

    showSnackbar(message:string):void{
      this.snackBar.open(message, 'done',{
        duration: 2500
      })
    }

}
