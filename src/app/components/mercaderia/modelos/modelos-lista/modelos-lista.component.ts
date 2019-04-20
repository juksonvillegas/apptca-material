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
  @Input() lista = [];
  @Input() data: any = [];
  term = '';
  params = [
    {text: 'Nombre', value: '?nombre__icontains='},
    {text: 'Marca', value: '?marca__nombre__icontains='},
    {text: 'Extendido', value: '?extendido__icontains='}
  ];
  tableColumns:  string[] = ['marca_nombre', 'nombre', 'extendido', 'editar', 'eliminar'];
  constructor(private servicio: ApiService) {
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
