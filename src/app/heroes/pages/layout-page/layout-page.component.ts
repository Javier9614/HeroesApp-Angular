import { Component } from '@angular/core';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sidebarItems=[
    {label: 'Listado',icon:'label',url:'./hero-list'},
    {label: 'Añadir',icon:'add',url:'./new-hero'},
    {label: 'Buscar',icon:'search',url:'./search'},

  ]

}
