import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../api.service';
@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css'],
  providers : [ApiService]
})
export class ClientesListaComponent implements OnInit {
  modelo = 'clientes/';
  pages: number;
  datos: number;
  @Input() lista = [];
  @Input() data: any = [];
  term = '';
  busq = '';
  params = [
    {text: 'Nombre', value: '?nombre__icontains='},
    {text: 'DNI', value: '?dni__icontains='},
    {text: 'Telefono', value: '?telefono__icontains='}
  ];
  tableColumns:  string[] = ['nombre', 'telefono', 'dni', 'nacimiento', 'sexo', 'mayorista', 'editar', 'eliminar'];
  constructor(private servicio: ApiService) {
  }
  ngOnInit() {
  }
  paginarModelo($event) {
    this.lista = $event;
  }
  busqueda($event) {
    this.lista = $event.datosresults;
    this.datos = $event.datos.count;
    this.busq = $event.term;
  }
}

