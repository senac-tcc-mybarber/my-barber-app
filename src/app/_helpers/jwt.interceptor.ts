import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { UsuarioService } from '../usuario.service';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private api: UsuarioService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.api.currentUserValue;
        if (currentUser && currentUser.tokenJWT) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.tokenJWT}`
                }
            });
        }

        return next.handle(request);
    }
}