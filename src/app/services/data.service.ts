import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Book {
  name;
  isbn,
  pages;
  status;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<any>('assets/data.json')
    .toPromise()
    .then(res => <Book[]>res.data)
    .then(data => { return data; });
  }
}
