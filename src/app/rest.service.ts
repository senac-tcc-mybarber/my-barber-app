import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { Agendamento } from './model/agendamento';
import { Cliente } from './model/cliente';
import { Profissional } from './model/profissional';
import { Salao } from './model/salao';
import { Servico } from './model/Servico';

@Injectable({ providedIn: 'root' })
export class RestService {
  [x: string]: any;

  defaultHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });

  defaultHeadersToPostJson = new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json"
  });

  constructor(private http: HttpClient) {}


  createAgendamento(a: Agendamento) {
    let datePipe: DatePipe = new DatePipe("en-US");
    const url = `${environment.urlApi}/agendamentos`;
    const body = {
      cliente: { id: a.cliente.id },
      profissional: { id: a.profissional.id },
      salao: { id: a.salao.id},
      servico: {id:a.servico.id},
      inicioServico: datePipe.transform(a.inicioServico, 'dd/MM/yyyy HH:mm'),
      fimServico: datePipe.transform(a.inicioServico.setHours(a.inicioServico.getHours() + 1), 'dd/MM/yyyy HH:mm'),
      checkInCliente: null, checkInProfissional: null, checkoutCliente: null,	checkoutProfissional: null
    };


    return this.http
      .post<any>(url, body, {
        headers: this.defaultHeadersToPostJson
      })
      .pipe();
  }

  checkIn(id: number, tipoCheckin: string) {
    const url = `${environment.urlApi}/agendamentos/${id}/checkin-${tipoCheckin}`;
    return this.http.put<any>(url, id,
      {
        headers: this.defaultHeadersToPostJson
      }).pipe(map(resp => {
      return resp;
    }));
  }

  concluirAtendimento(id: number) {
    const url = `${environment.urlApi}/agendamentos/${id}/concluir`;
    return this.http.put<any>(url, id, {
      headers: this.defaultHeadersToPostJson
    }).pipe(map(resp => {
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

  createCliente(cliente): Observable<Cliente> {
    const url = `${environment.urlApi}/clientes`;
    return this.http
      .post<any>(url, cliente, {
        headers: this.defaultHeadersToPostJson
      })
      .pipe(
        tap(),
        catchError(err => {
          console.log(err);
          return this.handleError<Cliente>()
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
        tap(),
        catchError(this.handleError<Profissional>())
      );
  }

  getProfissionais(): Observable<Profissional[]> {
    const url = `${environment.urlApi}/profissionais`;
    return this.http
      .get<Profissional[]>(url)
      .pipe(catchError(this.handleError([])));
  }

  updateProfissional(profissional: Profissional): Observable<Object> {
    const url = `${environment.urlApi}/profissionais/`
    return this.http.put<Profissional>(url + profissional.id, profissional);
  }

  updateCliente(cliente: Cliente): Observable<Object> {
    const url = `${environment.urlApi}/clientes/`
    return this.http.put<Cliente>(url + cliente.id, cliente);
  }

  getProfissional(id: number): Observable<Profissional> {
    const url = `${environment.urlApi}/profissionais/${id}`;
    return this.http.get<Profissional>(url).pipe(
      tap(),
      catchError(this.handleError<Profissional>())
    );
  }

  getServicos(): Observable<Servico[]> {
    const url = `${environment.urlApi}/servicos`;
    return this.http
      .get<Servico[]>(url)
      .pipe(catchError(this.handleError([])));
  }

  getAgendamento(id: number): Observable<Agendamento> {
    const url = `${environment.urlApi}/agendamentos/${id}`;
    return this.http.get<Agendamento>(url).pipe(
      tap(),
      catchError(this.handleError<Agendamento>())
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getCliente(id: number): Observable<Cliente> {
    const url = `${environment.urlApi}/clientes/${id}`;
    return this.http.get<Cliente>(url).pipe(
      tap(),
      catchError(this.handleError<Cliente>())
    );
  }
}
