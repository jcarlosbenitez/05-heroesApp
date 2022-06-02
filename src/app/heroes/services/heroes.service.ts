import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl: string = environment.baseUrl;

  constructor(private hppt: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.hppt.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroeId(id: string): Observable<Heroe> {
    return this.hppt.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }
  getSugerencia(termino: string): Observable<Heroe[]> {
    return this.hppt.get<Heroe[]>(
      `${this.baseUrl}/heroes?q=${termino}&_limit=10`
    );
  }
  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.hppt.post<Heroe>(`${this.baseUrl}/heroes`,  heroe );
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.hppt.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, 
      heroe,
    );
  }

  borrarHeroe(id: string): Observable<Heroe> {
    return this.hppt.delete<any>(`${this.baseUrl}/heroes/${id}`  );
  }
}
