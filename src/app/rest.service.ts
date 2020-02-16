import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from './model/Usuario';
import { environment } from 'src/environments/environment';
import { exhaust } from 'rxjs/operators';
import { Salao } from './model/salao';

@Injectable({ providedIn: 'root' })

export class RestService {
  
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getToken(username: string, password: string) {
    const url = `${environment.urlApi}/authenticate`;
    const body = '{"username": "' + username + '", "password": "' + password + '"}';
    return this.http.post<any>(url, body,
      {
        headers: new HttpHeaders
          ({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          })
      }).pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        console.log(user);
        return user;
      }));
  }

  createCliente() {
    const url = `${environment.urlApi}/create`;
    const body = "";
    return this.http.post<any>(url, body,
      {
        headers: new HttpHeaders
          ({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          })
      }).pipe(map(user => {
        console.log(user);
      }));
  }


  getSaloes() {
    const url = `${environment.urlApi}/saloes`;
    return this.http.get<Salao[]>(url,
      {
        headers: new HttpHeaders
        ({
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdXN0b21lciIsImV4cCI6MTU4Mjc0NjM5OH0.SbVIt5BTYpo9XdrZMO_PRbt-r3PenVtteqzt3eDrJX6tocuf-Ym46yRB_UZOYt4B8Am5PED4RE2g9a21vdrB4g',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        })
      }
    )
  }

  associateSaloes(saloes: Salao[]) {
    const url = `${environment.urlApi}profissionais/1/saloes`;
    return this.http.put<any>(url,
      {
        headers: new HttpHeaders
        ({
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdXN0b21lciIsImV4cCI6MTU4Mjc0NjM5OH0.SbVIt5BTYpo9XdrZMO_PRbt-r3PenVtteqzt3eDrJX6tocuf-Ym46yRB_UZOYt4B8Am5PED4RE2g9a21vdrB4g',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }),
        body: {saloes}
      }
    )

  }

}
