import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-precios-lista',
  templateUrl: './precios-lista.component.html',
  styleUrls: ['./precios-lista.component.css']
})
export class PreciosListaComponent implements OnInit {
  modelo = 'precios/';
  pages: number;
  datos: number;
  @Input() lista = [];
  @Input() data: any = [];
  term = '';
  busq = '';
  params = [
    {text: 'Nombre', value: '?nombre__icontains='}
  ];
  tableColumns:  string[] = ['nombre', 'unitario', 'punto', 'docena', 'editar', 'eliminar'];
  constructor(private servicio: ApiService) { }
  ngOnInit() {
  }
  paginarModelo($event) {
    this.lista = $event;
  }
  busqueda($event) {
    this.lista = $event.results;
    this.datos = $event.count;
    this.busq = $event.term;
  }
}
