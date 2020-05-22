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

  rowdata;

  toggle=false;


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
      { field: 'name', header: 'Name', display: 'table-cell' },
      {field: 'pages', header: 'Pages', display: 'table-cell' },
      { field: 'status', header: 'Status', display: 'table-cell' },
      { field: 'isbn', header: 'ISBN', display: 'table-cell' }
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
        if(a[property] < b[property]){
                return -1 * sort_order;
        }else if(a[property] > b[property]){
                return 1 * sort_order;
        }else{
          return 0 * sort_order;
        }
    }
  }

  changed(event) {

      console.log("event",event.target.name, event.target.checked);
      for (let i = 0; i < this.cols.length; i++) {
        if(this.cols[i].field === event.target.name && event.target.checked === false ) {
          this.cols[i]['display'] = 'none';
        }
        if(this.cols[i].field === event.target.name && event.target.checked === true ) {
          this.cols[i]['display'] = 'table-cell';
        }
      }
    }

    rowData(data) {
      this.toggle = true;
      console.log("data",data);
      this.rowdata = data;
    }
}
