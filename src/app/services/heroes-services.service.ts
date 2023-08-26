import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesServicesService {
  url: string = 'https://heroes-7c6a7-default-rtdb.firebaseio.com'

  constructor(private http: HttpClient) { }

  heroes(){
    return this.http.get(`${this.url}/heroes.json`)
    .pipe(map((resp:any)=>{
      const res:any=[];
      Object.keys(resp).forEach(key=>{
        const hero:any=resp[key];
        hero.id=key;
        res.push(hero);
      })
      return res;
    }))
  }

  agregarHeroe(heroes:any){
    return this.http.post(`${this.url}/heroes.json`,heroes)
  }

  seleccionHeroe(id:any){
    return this.http.get(`${this.url}/heroes/${id}.json`)
  }

  editarHeroe(heroes:any){
    const idTemporal={
      ...heroes
    }
    delete idTemporal.id;

    return this.http.put(`${this.url}/heroes/${heroes.id}.json`, heroes);
  }

  eliminarHeroe(id:any){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
}
