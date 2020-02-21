import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from './model/Usuario';
import { environment } from 'src/environments/environment';

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
}
