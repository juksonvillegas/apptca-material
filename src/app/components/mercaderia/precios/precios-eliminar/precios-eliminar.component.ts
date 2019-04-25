import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-precios-eliminar',
  templateUrl: './precios-eliminar.component.html',
  styleUrls: ['./precios-eliminar.component.css']
})
export class PreciosEliminarComponent implements OnInit {
  modelo = 'precios/';
  id = '';
  dato = {id: '', marca_nombre: '' , marca: '', nombre: '', estado: true };
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
            this.router.navigateByUrl('/precios/lista');
          } else { console.log(error); }
        }
      );
    }
  }
  eliminar() {
    this.dato.estado = false;
    this.servicio.deleteData(this.modelo, this.dato).subscribe(
      data => {
        this.router.navigateByUrl('/precios/lista');
        this.snackBar.open('Registro eliminado...', 'x', {duration: 5000});
      },
      error => {
        this.snackBar.open(error.name, 'x', {duration: 3000});
      }
    );
  }
}