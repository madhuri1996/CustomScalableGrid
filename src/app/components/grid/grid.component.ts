import { Component, OnInit } from '@angular/core';
import { DataService, Book } from 'src/app/services/data.service';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  upArrow = faArrowUp;
  downArrow = faArrowDown;

  books: Book[];

  barray: Book[];

  paginationId;

  cols: any[];

  isValue: number = 1;

  records_count:number;

  buttons_count: number;

  btns_array = [];


  constructor(private service: DataService) {

   }

  ngOnInit(): void {
    this.service.getBooks().then(books => {
      this.books = books;
      this.records_count = books.length;
      this.buttons_count = this.records_count/10;
      for(let i = 1; i<=this.buttons_count; i++) {
        this.btns_array.push(i);
      }
      this.barray = books.slice(0,10);
    });

    this.cols = [
      { field: 'name', header: 'Name' },
      {field: 'pages', header: 'Pages' },
      { field: 'status', header: 'Status'},
      { field: 'isbn', header: 'ISBN'}
    ]
  }

  paginate(event) {
    console.log(event.target.attributes.id.nodeValue);
    this.paginationId = event.target.attributes.id.nodeValue;
    this.isValue = this.paginationId;
    this.barray = this.books.slice(this.paginationId*10-10,this.paginationId*10);

  }

  sort(columnName, orderType) {
    console.log("column name and order type",columnName, orderType);
    this.barray = this.barray.sort(this.dynamicSort(columnName,orderType));
  }

  dynamicSort(property,order) {
    let sort_order = 1;
    if(order === "desc"){
        sort_order = -1;
    }
    return function (a, b){
        // a should come before b in the sorted order
        if(a[property] < b[property]){
                return -1 * sort_order;
        // a should come after b in the sorted order
        }else if(a[property] > b[property]){
                return 1 * sort_order;
        // a and b are the same
        }else{
          return 0 * sort_order;
        }
    }
}

}
