import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-produtos-eliminar',
  templateUrl: './produtos-eliminar.component.html',
  styleUrls: ['./produtos-eliminar.component.css']
})
export class ProdutosEliminarComponent implements OnInit {
  modelo = 'productos/';
  id = '';
  dato = {id: -1, estado: true};
  constructor(
    private servicio: ApiService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
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
            this.router.navigateByUrl('/productos/lista');
          } else { console.log(error); }
        }
      );
    }
  }
  eliminar() {
    this.dato.estado = false;
    this.servicio.deleteData(this.modelo, this.dato).subscribe(
      data => {
        this.router.navigateByUrl('/productos/lista');
        this.snackBar.open('Registro eliminado...', 'x', {duration: 5000});
      },
      error => {
        this.snackBar.open(error.name, 'x', {duration: 3000});
      }
    );
  }
}
