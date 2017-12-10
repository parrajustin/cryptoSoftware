import { Observable, Subscription } from 'rxjs/Rx';
import { NgRedux } from '@angular-redux/store';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { IAppState, LogStateActions } from '../store';
import { handleSub } from '../util';

@Injectable()
export class ApiController {
  private baseUrl: string = '';
  private subArry: Subscription[] = [];
  private token: string = '';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private http: HttpClient
  ) {
    const tokenSub = ngRedux.select<string>('token').subscribe(token => this.token = token);
    this.subArry.push(tokenSub);
  }

  public post<T>(url: string, data: any): Observable<{} | T> {
    return this.http.post<T>(this.baseUrl + url, data, {
      headers: {'X-Access-Token': this.token}
    }).catch((error) => Observable.throw(error));
  }

  public get<T>(url: string): Observable<{} | T> {
    return this.http.get<T>(this.baseUrl + url, {
      headers: {'X-Access-Token': this.token}
    }).catch((error) => Observable.throw(error));
  }
}