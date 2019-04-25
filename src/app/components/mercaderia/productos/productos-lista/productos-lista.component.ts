import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.css']
})
export class ProductosListaComponent implements OnInit {
  modelo = 'productos/';
  pages: number;
  datos: number;
  @Input() lista = [];
  @Input() data: any = [];
  term = '';
  params = [
    {text: 'Categoria', value: '?categoria__nombre__icontains='},
    {text: 'Modelo', value: '?modelo__nombre__icontains='},
    {text: 'Marca', value: '?modelo__marca__nombre__icontains='}
  ];
  tableColumns:  string[] = ['categoria', 'marca', 'modelo', 'costo', 'stock', 'unitario', 'punto', 'docena', 'editar', 'eliminar'];
  constructor(private servicio: ApiService) { }
  pagination() {
    const a: number = Math.trunc(+this.datos / 10);
    let b: number = this.datos % 10;
    if (b > 0) {
      b = a + 1;
      this.pages = b;
    } else { this.pages = a; }
  }
  paginar = (page) => {
    const ruta = '?page=' + page;
    this.servicio.getData(this.modelo, ruta).subscribe(
      data => {
        this.lista = data.results;
        this.datos = data.count;
        this.pagination();
      },
      error => {
        console.log(error);
      }
    );
  }
  ngOnInit() {
    this.paginar(1);
  }
  paginarModelo($event) {
    this.lista = $event;
  }
  busqueda($event) {
    if ($event.length === 0) {
      this.paginar(1);
    } else {
      this.lista = $event.results;
      this.datos = $event.count;
    }
  }
}
