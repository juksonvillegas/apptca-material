import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material';

@Component({
  selector: 'app-clientes-eliminar',
  templateUrl: './clientes-eliminar.component.html',
  styleUrls: ['./clientes-eliminar.component.css']
})
export class ClientesEliminarComponent implements OnInit {
  modelo = 'clientes/';
  id = '';
  dato = {id: '', nombre: '', telefono: '', dni: '', nacimiento: '', sexo: true, mayorista: false, estado: true };
  constructor(
    private servicio: ApiService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
      this.cargarDatos();
    }

  ngOnInit() {
  }
  eliminar() {
    this.dato.estado = false;
    this.servicio.deleteData(this.modelo, this.dato).subscribe(
      data => {
        this.router.navigateByUrl('/clientes/lista');
        this.snackBar.open('Registro eliminado...', 'x', {duration: 5000});
      },
      error => {
        this.snackBar.open(error.name, 'x', {duration: 3000});
      }
    );
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
            this.router.navigateByUrl('/clientes/lista');
          } else { console.log(error); }
        }
      );
    }
  }
}
