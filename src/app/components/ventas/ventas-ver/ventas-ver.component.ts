import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-ventas-ver',
  templateUrl: './ventas-ver.component.html',
  styleUrls: ['./ventas-ver.component.css']
})
export class VentasVerComponent implements OnInit {
  modelo = 'ventas/';
  pages: number;
  datos: number;
  @Input() lista = [];
  @Input() data: any = [];
  term = '';
  busq = '';
  id = '';
  dato = '';
  params = [
    {text: 'Cliente', value: '?cliente__nombre__icontains='}
  ];
  total = 0;
  param = '?producto=&venta=';
  tableColumns:  string[] = ['producto', 'cantidad', 'precio'];
  eliminando = false;
  constructor(
    private servicio: ApiService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }
  cargarDatos() {
    this.id = this.rutaActiva.snapshot.params.id;
    if (this.id) {
      this.servicio.getDataId(this.modelo, this.id).subscribe(
        data => {
          this.dato = data;
        },
        error => {
          if (error.status === 404) {
            this.router.navigateByUrl('/ventas/lista');
          } else { console.log(error); }
        }
      );
      this.param += this.id;
      this.servicio.getData('ventas_detalle/', this.param).subscribe(
        data => {
          this.lista = data.results;
          for (const item of this.lista) {
            this.total += item.cantidad * item.precio;
          }
        },
        error => {
          if (error.status === 404) {
            this.router.navigateByUrl('/ventas/lista');
          } else { console.log(error); }
        }
      );
    }
  }
  eliminar() {
    this.eliminando = true;
  }
  siEliminar() {
    this.servicio.realDeleteData(this.modelo, this.id).subscribe(
      data => {
        this.router.navigateByUrl('/ventas/lista');
        this.snackBar.open('Registro Totalmente elimnado...', 'x', {duration: 10000});
      },
      error => {
        if (error.status === 404) {
          this.router.navigateByUrl('/ventas/lista');
        } else { console.log(error); }
      }
    );
  }
  noEliminar() {
    this.eliminando = false;
  }
}
