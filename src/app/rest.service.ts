import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Usuario } from './model/Usuario';
import { environment } from 'src/environments/environment';
import { exhaust } from 'rxjs/operators';
import { Salao } from './model/salao';
import { Profissional } from './model/profissional';
import { Servico } from './model/Servico';

@Injectable({ providedIn: 'root' })

export class RestService {
  
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
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

  addScheduling(body: string) {
    const url = `${environment.urlApi}/addScheduling`;
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

  associateSaloes(profissionalId: string, saloes: Salao[]) {
    const url = `${environment.urlApi}/profissionais/${profissionalId}/saloes`;
    const requestBody = { saloes: saloes.map(salao => salao.id) };
    return this.http.put<any>(url, requestBody,
      {
        headers: new HttpHeaders
        ({
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdXN0b21lciIsImV4cCI6MTU4Mjc0NjM5OH0.SbVIt5BTYpo9XdrZMO_PRbt-r3PenVtteqzt3eDrJX6tocuf-Ym46yRB_UZOYt4B8Am5PED4RE2g9a21vdrB4g',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'PUT',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Content-Type': 'application/json'
        })
      }
    )
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

  //funcoes para tratar profissional
  createProfissional (profissional): Observable<Profissional> {
    const url = `${environment.urlApi}/profissionais`;
    return this.http.post<Profissional>(url, profissional,  {
      headers: new HttpHeaders
        ({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST'
        })
    }).pipe(
      tap((Profissional) => console.log(`adicionou o profissional`)),
      catchError(this.handleError<Profissional>('createProfissional'))
    );
  }

  getProfissional(id: number): Observable<Profissional> {
    const url = `${environment.urlApi}/profissionais/${id}`;
    return this.http.get<Profissional>(url).pipe(
      tap(_ => console.log(`leu o profissional id=${id}`)),
      catchError(this.handleError<Profissional>(`getProfissional id=${id}`))
    );
  }

  getServicos (): Observable<Servico[]> {
    const url = `${environment.urlApi}/servicos`;
    return this.http.get<Servico[]>(url)
      .pipe(
        tap(servicos => console.log('leu os servicos disponiveis')),
        catchError(this.handleError('getServicos', []))
      );
  }
  //

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
