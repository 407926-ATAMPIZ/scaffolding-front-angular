import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyService {
  private apiUrl = 'http://localhost:8080/api/v1/dummies';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Dummy[]> {
    return this.httpClient.get<Dummy[]>(this.apiUrl)
  }

  getById(id: number): Observable<Dummy> {
    return this.httpClient.get<Dummy>(`${this.apiUrl}/${id}`)
  }

  create(dummy: DummyCreateDto): Observable<Dummy> {
    return this.httpClient.post<Dummy>(this.apiUrl, dummy)
  }

  update(dummy: DummyCreateDto, id:number): Observable<Dummy> {
    return this.httpClient.put<Dummy>(`${this.apiUrl}/${id}`, dummy)
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`)
  }

  searchDummies(dummyField?: string, fromDate?: string): Observable<Dummy[]> {
    let params = new HttpParams();
    if (dummyField) params = params.set('dummyField', dummyField)
    if (fromDate) params = params.set('fromDate', fromDate)
    return this.httpClient.get<Dummy[]>(`${this.apiUrl}/search`, {params});
  }

}
