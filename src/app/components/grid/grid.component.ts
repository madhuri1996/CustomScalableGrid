import { Component, OnInit } from '@angular/core';
import { DataService, Book } from 'src/app/services/data.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  books: Book[];

  cols: any[];

  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.service.getBooks().then(books => this.books = books);
    this.cols = [
      { field: 'name', header: 'Name' },
      {field: 'pages', header: 'Pages' },
      { field: 'status', header: 'Status'},
      { field: 'isbn', header: 'ISBN'}
    ]
  }

}
