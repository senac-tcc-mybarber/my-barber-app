import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Profissional } from "./model/profissional";
import { Servico } from "./model/Servico";
import { Salao } from "./model/salao";
import { Usuario } from "./model/Usuario";
import { Agendamento } from "./model/agendamento";
import { DatePipe } from '@angular/common';

@Injectable({ providedIn: "root" })
export class RestService {
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  defaultHeaders = new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  defaultHeadersToPostJson = new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json"
  });

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  getToken(username: string, password: string) {
    const url = `${environment.urlApi}/authenticate`;
    const body =
      '{"username": "' + username + '", "password": "' + password + '"}';
    return this.http
      .post<any>(url, body, {
        headers: this.defaultHeaders
      })
      .pipe(
        map(user => {
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log(user);
          return user;
        })
      );
  }

  createAgendamento(a: Agendamento) {
    let datePipe: DatePipe = new DatePipe("en-US");
    const url = `${environment.urlApi}/agendamentos`;
    const body =
      '{"cliente": { "id": ' +
      // a.idCliente +
      1 +
      ' }, "profissional": { "id": ' +
      a.profissional.id +
      ' }, "salao": { "id": ' +
      a.salao.id +
      ' }, "servico": { "id": ' +
      a.servico.id +
      ' }, "inicioServico": "' +
      datePipe.transform(a.inicioServico, 'dd/MM/yyyy HH:mm') +
      '",	"fimServico": "' +
      datePipe.transform(a.inicioServico.setHours(a.inicioServico.getHours() + 1), 'dd/MM/yyyy HH:mm') +
      '",	"checkInCliente": null, "checkInProfissional": null, "checkoutCliente": null,	"checkoutProfissional": null}';

    return this.http
      .post<any>(url, body, {
        headers: this.defaultHeadersToPostJson
      })
      .pipe(
        map(ag => { console.table(ag); })
      );
  }

  checkInProfissional(id: number) {
    const url = `${environment.urlApi}/agendamentos/${id}/checkin-profissional`;
    return this.http.put<any>(url, id,
      {
        headers: this.defaultHeadersToPostJson
      }).pipe(map(resp => {
        console.log(resp);
        return resp;
    }));
  }

  checkInCliente(id: number) {
    const url = `${environment.urlApi}/agendamentos/${id}/checkin-cliente`;
    return this.http.put<any>(url, id,
      {
        headers: this.defaultHeadersToPostJson
      }).pipe(map(resp => {
      console.log(resp);
      return resp;
    }));
  }

  getSaloes() {
    const url = `${environment.urlApi}/saloes`;
    return this.http.get<Salao[]>(url, {
      headers: this.defaultHeaders
    });
  }

  associateSaloes(profissionalId: Number, saloes: Salao[]) {
    const url = `${environment.urlApi}/profissionais/${profissionalId}/saloes`;
    const requestBody = { saloes: saloes.map(salao => salao.id) };
    return this.http.put<any>(url, requestBody, {
      headers: this.defaultHeaders
    });
  }
  associarServicos(profissionalId: Number, servicos: Servico[]){
    const url = `${environment.urlApi}/profissionais/${profissionalId}/servicos`;
    const requestBody = { servicos: servicos.map(servico => servico.id) };
    return this.http.put<any>(url, requestBody,
      {
        headers: this.defaultHeaders
      }
    )
  }

  createCliente() {
    const url = `${environment.urlApi}/create`;
    const body = "";
    return this.http
      .post<any>(url, body, {
        headers: this.defaultHeaders
      })
      .pipe(
        map(user => {
          console.log(user);
        })
      );
  }

  //funcoes para tratar profissional
  createProfissional(profissional): Observable<Profissional> {
    const url = `${environment.urlApi}/profissionais`;
    return this.http
      .post<Profissional>(url, profissional, {
        headers: new HttpHeaders({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST"
        })
      })
      .pipe(
        tap(Profissional => console.log(`adicionou o profissional`)),
        catchError(this.handleError<Profissional>("createProfissional"))
      );
  }

  getProfissionais(): Observable<Profissional[]> {
    const url = `${environment.urlApi}/profissionais`;
    return this.http
      .get<Profissional[]>(url)
      .pipe(catchError(this.handleError("getProfissionais", [])));
  }

  getProfissional(id: number): Observable<Profissional> {
    const url = `${environment.urlApi}/profissionais/${id}`;
    return this.http.get<Profissional>(url).pipe(
      tap(_ => console.log(`leu o profissional id=${id}`)),
      catchError(this.handleError<Profissional>(`getProfissional id=${id}`))
    );
  }

  getServicos(): Observable<Servico[]> {
    const url = `${environment.urlApi}/servicos`;
    return this.http
      .get<Servico[]>(url)
      .pipe(catchError(this.handleError("getServicos", [])));
  }

  getAgendamento(id: number): Observable<Agendamento> {
    const url = `${environment.urlApi}/agendamentos/${id}`;
    return this.http.get<Agendamento>(url).pipe(
      tap(_ => console.log(`leu o agendamento id=${id}`)),
      catchError(this.handleError<Agendamento>(`getAgendamento id=${id}`))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
