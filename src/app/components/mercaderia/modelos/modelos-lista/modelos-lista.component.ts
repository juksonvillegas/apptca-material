import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-modelos-lista',
  templateUrl: './modelos-lista.component.html',
  styleUrls: ['./modelos-lista.component.css']
})
export class ModelosListaComponent implements OnInit {
  modelo = 'modelos/';
  pages: number;
  datos: number;
  term = '';
  @Input() lista = [];
  @Input() data: any = [];
  busq = '';
  params = [
    {text: 'Nombre', value: '?nombre__icontains='},
    {text: 'Marca', value: '?marca__nombre__icontains='},
    {text: 'Extendido', value: '?extendido__icontains='}
  ];
  tableColumns:  string[] = ['marca_nombre', 'nombre', 'extendido', 'editar', 'eliminar'];
  constructor(private servicio: ApiService) {
  }
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
