import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  API_KEY = 'password';
  constructor(private http: HttpClient) { }

  getToken()
  {
    const url = 'http://localhost:8080/authenticate';
    const body = '{"username": "customer", "password": "password"}';
    return this.http.post(url, body, { headers: new HttpHeaders({
      'Access-Control-Allow-Origin':  '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    })
  });
    

  }

}
