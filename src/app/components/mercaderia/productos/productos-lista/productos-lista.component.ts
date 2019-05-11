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
  busq = '';
  params = [
    {text: 'Categoria', value: '?categoria__nombre__icontains='},
    {text: 'Modelo', value: '?modelo__nombre__icontains='},
    {text: 'Marca', value: '?modelo__marca__nombre__icontains='}
  ];
  tableColumns:  string[] = ['categoria', 'marca', 'modelo', 'costo', 'stock', 'unitario', 'punto', 'docena', 'editar', 'eliminar'];
  constructor(private servicio: ApiService) { }
  ngOnInit() {
  }
  paginarModelo($event) {
    this.lista = $event;
  }
  busqueda($event) {
    this.lista = $event.datos.results;
    this.datos = $event.datos.count;
    this.busq = $event.term;
  }
}
