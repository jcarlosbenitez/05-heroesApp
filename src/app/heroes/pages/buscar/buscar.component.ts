import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Heroe[] = [];

  heroeSeleccionado!: Heroe | undefined;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscar() {
    this.heroesService
      .getSugerencia(this.termino)
      .subscribe((heroes) => (this.heroes = heroes));
  }
  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    const heroe: Heroe = event.option.value;
    if (!heroe) {
      this.heroeSeleccionado = undefined; 
      console.log('No hay valor');
    }
    console.log(heroe);
    this.termino = heroe.superhero;
    console.log(heroe);
    this.heroesService
      .getHeroeId(heroe.id!)
      .subscribe((heroe) => (this.heroeSeleccionado = heroe));
  }
}
