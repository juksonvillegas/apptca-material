import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { ApiService } from '../../../api.service';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']

})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() modelo: string;
  @Input() pages: number;
  @Input() datos: number;
  @Input() busq: string;
  lista = [];
  @Output() paginationEvent = new EventEmitter<any>();
  constructor(private servicio: ApiService) {
  }
  ngOnInit() {
    // this.paginar(1);
  }

  ngOnChanges() {
    this.paginar(1);
  }

  pagination() {
    const a: number = Math.trunc(+this.datos / 10);
    let b: number = this.datos % 10;
    if (b > 0) {
      b = a + 1;
      this.pages = b;
    } else { this.pages = a; }
  }
  paginar = (page) => {
    let ruta: string;
    if (this.busq) {
      ruta = '&page=' + page;
    } else {
      ruta = '?page=' + page;
    }
    this.servicio.getData(this.modelo + this.busq , ruta).subscribe(
      data => {
        this.lista = data.results;
        this.datos = data.count;
        this.pagination();
        this.paginationEvent.emit(this.lista);
      },
      error => {
        console.log(error);
      }
    );
  }
}
