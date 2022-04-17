import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseApi {
  public readonly urlApiBase: string = environment.baseUrl;

  constructor(protected http: HttpClient) {}

  get<T>(rota: string, id?: number): Observable<T> {
    return this.http.get<T>(`${this.urlApiBase}${rota}/${id}`);
  }

  getWithParams<T>(rota: string, params: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.urlApiBase}${rota}`, {
      params: params,
    });
  }

  getAll<T>(rota: string): Observable<T> {
    return this.http.get<T>(`${this.urlApiBase}${rota}`);
  }

  post<T>(rota: string, entity: any): Observable<T> {
    return this.http.post<T>(`${this.urlApiBase}${rota}`, entity);
  }

  put<T>(rota: string, entity: any): Observable<T> {
    return this.http.put<T>(`${this.urlApiBase}${rota}`, entity);
  }

  delete<T>(rota: string, id: number): Observable<T> {
    return this.http.delete<T>(`${this.urlApiBase}${rota}/${id}`);
  }
}
