import axios from 'axios';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CarrerasService {

  url:string  = `${environment.apiUrl}sws-carreras`;
  headers:any = {'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') || 'Bearer 100-token'};
  
  constructor() { }

  listado(extra: string = ''): Observable<any> {
    const url = `${this.url}`+extra;
    return new Observable(observer => {
      axios.get(url, {
        withCredentials: true,
        headers: this.headers
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  detalle(carrera:string | null = '', extra:string = ''): Observable<any> {
    const url = `${this.url}/`+carrera+extra;
    return new Observable(observer => {
      axios.get(url, {
        withCredentials: true,
        headers: this.headers
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  crear(alumno: any): Observable<any> {
    const url = `${this.url}`;
    return new Observable(observer => {
      axios.post(url, alumno, {
        withCredentials: true,
        headers: this.headers
      })
      .then(response => {
        observer.next(response);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  actualizar(carrera:string, alumno: any): Observable<any> {
    const url = `${this.url}/${carrera}`;
    return new Observable(observer => {
      axios.put(url, alumno, {
        withCredentials: true,
        headers: this.headers
      })
      .then(response => {
        observer.next(response);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  eliminar(carrera: string): Observable<any> {
    const url = `${this.url}/${carrera}`;
    return new Observable(observer => {
      axios.delete(url, {
        withCredentials: true,
        headers: this.headers
      })
      .then(response => {
        observer.next(response);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }
}