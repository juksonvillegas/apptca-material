import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-categorias-lista',
  templateUrl: './categorias-lista.component.html',
  styleUrls: ['./categorias-lista.component.css']
})
export class CategoriasListaComponent implements OnInit {
  modelo = 'categorias/';
  pages: number;
  datos: number;
  @Input() lista = [];
  @Input() data: any = [];
  term = '';
  busq = '';
  params = [
    {text: 'Nombre', value: '?nombre__icontains='}
  ];
  tableColumns:  string[] = ['nombre', 'editar', 'eliminar'];
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
