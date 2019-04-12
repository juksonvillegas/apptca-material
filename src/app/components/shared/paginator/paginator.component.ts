import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() modelo: string;
  @Input() pages: number;
  @Input() datos: number;
  lista = [];
  @Output() paginationEvent = new EventEmitter<any>();
  constructor(private servicio: ApiService) {
  }
  ngOnInit() {
    this.paginar(1);
  }
  paginar = (page) => {
    const ruta = '?page=' + page;
    this.servicio.getData(this.modelo, ruta).subscribe(
      data => {
        this.lista = data.results;
        this.datos = data.count;
        this.paginationEvent.emit(this.lista);
      },
      error => {
        console.log(error);
      }
    );
  }
}
