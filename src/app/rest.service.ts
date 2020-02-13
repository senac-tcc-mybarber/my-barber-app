import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from './model/Usuario';

@Injectable({ providedIn: 'root'})

export class RestService {
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;


  API_KEY = 'password';
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}

  getToken()
  {
    const url = 'http://localhost:8080/authenticate';
    const body = '{"username": "customer", "password": "password"}';
  //   return this.http.post(url, body, { headers: new HttpHeaders({
  //     'Access-Control-Allow-Origin':  '*',
  //     'Access-Control-Allow-Methods': 'POST',
  //     'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  //   })
  // });
    console.log("inicio");
  return this.http.post<any>(url, body,
    { headers: new HttpHeaders
      ({
          'Access-Control-Allow-Origin':  '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      })
    }).pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                console.log(user);
                return user;
            }));
    

  }

}
