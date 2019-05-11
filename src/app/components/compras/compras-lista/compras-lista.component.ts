import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-compras-lista',
  templateUrl: './compras-lista.component.html',
  styleUrls: ['./compras-lista.component.css']
})

export class ComprasListaComponent implements OnInit {
  modelo = 'compras/';
  pages: number;
  datos: number;
  @Input() lista = [];
  @Input() data: any = [];
  term = '';
  busq = '';
  params = [
    {text: 'Proveedor', value: '?proveedor__nombre__icontains='}
  ];
  tableColumns:  string[] = ['fecha', 'proveedor', 'flete', 'ver'];
  constructor() { }
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
