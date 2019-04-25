import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule, MAT_EXPANSION_PANEL_DEFAULT_OPTIONS} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consignaciones-addedit',
  templateUrl: './consignaciones-addedit.component.html',
  styleUrls: ['./consignaciones-addedit.component.css']
})
export class ConsignacionesAddeditComponent implements OnInit {
  public formGroup: FormGroup;
  modelo = 'productos/';
  param = '?nombre__icontains=';
  modelos = [];
  id = '';
  dato = {id: '', marca: '-1', marca_nombre: '', modelo: '-1', modelo_nombre: '' , categoria: '-1', categoria_nombre: '',
  precio: '-1', precio_nombre: '', p_unitario: '', p_punto: '', p_docena: '', estado: true };
  isLoading = false;
  constructor() { }

  ngOnInit() {
  }

}
