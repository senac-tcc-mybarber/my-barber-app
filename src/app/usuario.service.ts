import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Usuario } from "./model/Usuario";
import { Router } from '@angular/router';

@Injectable({ providedIn: "root" })
export class UsuarioService {
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;
  private readonly localStorageKey = 'currentUser';



  defaultHeaders = new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });


  constructor(private http: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(
      JSON.parse(localStorage.getItem(this.localStorageKey))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  getToken(username: string, password: string) {
    const url = `${environment.urlApi}/authenticate`;
    const body = {username, password};
    return this.http
      .post<any>(url, body, {
        headers: this.defaultHeaders
      })
      .pipe(
        map(user => {
          localStorage.setItem(this.localStorageKey, JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log(user);
          return user;
        })
      );
  }

  public redirectToUserHome() {
    const currentUserString = localStorage.getItem('currentUser');
    let role = 'cliente';

    if(!currentUserString) {
      this.logout();
      return;
    }

    role = JSON.parse(currentUserString).perfil;
    this.router.navigate(['layout', `home${role}`]);
  }

  public logout() {
    localStorage.removeItem(this.localStorageKey);
    this.router.navigate(['/login']);
  }
}

