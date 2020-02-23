import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Profissional } from './model/profissional';
import { Servico } from './model/Servico';
import { Salao } from './model/salao';
import { Usuario } from './model/Usuario';

@Injectable({ providedIn: 'root' })

export class RestService {
  
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  defaultHeaders = new HttpHeaders
  ({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  })

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
        headers: this.defaultHeaders
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
        headers: this.defaultHeaders
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
        headers: this.defaultHeaders
      }
    )
  }

  associateSaloes(profissionalId: Number, saloes: Salao[]) {
    const url = `${environment.urlApi}/profissionais/${profissionalId}/saloes`;
    const requestBody = { saloes: saloes.map(salao => salao.id) };
    return this.http.put<any>(url, requestBody,
      {
        headers: this.defaultHeaders
      }
    )
  }

  createCliente() {
    const url = `${environment.urlApi}/create`;
    const body = "";
    return this.http.post<any>(url, body,
      {
        headers: this.defaultHeaders
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
