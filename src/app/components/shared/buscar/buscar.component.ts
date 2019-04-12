import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  @Input() modelo: string;
  @Input() params = [];
  datos = [];
  term = '';
  select = '';
  @Output() busquedaEvent = new EventEmitter<any>();
  constructor(private servicio: ApiService)  {
  }
  busqueda($event) {
    if ($event.target.value.length > 1) {
      const split = $event.target.value.split('+');
      if (split.length > 1) {
        this.term = '';
        split.forEach((value, index) => {
          this.term += this.params[index].value + value + '&';
        });
      } else {
        // falta obtener el valor del select
        this.term = this.select + $event.target.value;
      }
      this.servicio.findDataComplete(this.modelo, this.term).subscribe(
        data => {
          // data results contiene solo el array de datos
          this.datos = data;
          this.busquedaEvent.emit(this.datos);
        },
        error => {
          console.log(error);
        }
      );
    }
    if ($event.target.value.length === 0 ) {
      this.datos = [];
      this.busquedaEvent.emit(this.datos);
    }
  }
  selected($event) {
    this.select = $event.target.value;
  }
  ngOnInit() {
    this.select = this.params[0].value;
  }
}
