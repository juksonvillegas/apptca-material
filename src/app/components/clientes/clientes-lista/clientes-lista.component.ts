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
  params = [
    {text: 'Nombre', value: '?nombre__icontains='},
    {text: 'DNI', value: '?dni__icontains='},
    {text: 'Telefono', value: '?telefono__icontains='}
  ];
  tableColumns:  string[] = ['nombre', 'telefono', 'dni', 'nacimiento', 'sexo', 'mayorista', 'editar', 'eliminar'];
  constructor(private servicio: ApiService) {
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
  pagination() {
    const a: number = Math.trunc(+this.datos / 10);
    let b: number = this.datos % 10;
    if (b > 0) {
      b = a + 1;
      this.pages = b;
    } else { this.pages = a; }
  }
  chargePage(page) {
    this.paginar(page);
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

