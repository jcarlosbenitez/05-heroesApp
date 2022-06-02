import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  publisher = [
    {
      id: 'DC comics',
      descripcion: 'Dc - comics',
    },
    {
      id: 'Marvel comics',
      descripcion: 'Marvel - comics',
    },
  ];
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };
  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) return;

    this.activateRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroeId(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      this.heroesService
        .actualizarHeroe(this.heroe)
        .subscribe((result) => this.mostrarSnakbar('Registro Actualizado'));
    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnakbar('Registro Creado');
      });
    }
  }

  eliminar() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '500px',
      data: this.heroe,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.borrarHeroe(this.heroe.id!).subscribe((resp) => {
          this.router.navigate(['/heroes']);
        });
      }
    });
  }

  mostrarSnakbar(mensaje: string) {
    this._snackBar.open(mensaje, 'Ok', { duration: 2500 });
  }
}
