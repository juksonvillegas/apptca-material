import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-marcas-lista',
  templateUrl: './marcas-lista.component.html',
  styleUrls: ['./marcas-lista.component.css']
})
export class MarcasListaComponent implements OnInit {
  modelo = 'marcas/';
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
    this.lista = $event.results;
    this.datos = $event.count;
    this.busq = $event.term;
  }
}
