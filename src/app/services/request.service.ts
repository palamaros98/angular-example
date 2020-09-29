import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
const host = 'https://newkatrinasite.awery.com/admin/api';
import {NotifierService} from 'angular-notifier';
@Injectable()


export class RequestService {
    private readonly notifier: NotifierService;

    constructor(
        private http: HttpClient,
        private router: Router,
        notifierService: NotifierService) {
        this.notifier = notifierService;
    }

    public post(url: string, params: object): Observable<any> {
        const headers = new HttpHeaders({
                'Content-Type': 'application/json;charset=utf-8'
            }
        );
        return this.http
            .post(host + url, params, {
                headers: headers,
                withCredentials: true
            })
            .pipe(catchError(this.errorHandler.bind(this)));
    }

    public get(url: string): Observable<any> {
        return this.http
            .get(host + url, {
                withCredentials: true
            })
            .pipe(catchError(this.errorHandler.bind(this)));
    }

    private errorHandler(error: HttpErrorResponse) {
        if (error.error.error) {
            this.notifier.notify( 'error', error.error.message );
        }

        if (error.error.error === 401) {
            this.router.navigate(['/unauthorized']);
        }

        return of(error.error);
    }

}
