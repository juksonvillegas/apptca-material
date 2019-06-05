import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-ventas-lista',
  templateUrl: './ventas-lista.component.html',
  styleUrls: ['./ventas-lista.component.css']
})
export class VentasListaComponent implements OnInit {
  modelo = 'ventas/';
  pages: number;
  datos: number;
  @Input() lista = [];
  @Input() data: any = [];
  term = '';
  busq = '';
  params = [
    {text: 'Cliente', value: '?cliente__nombre__icontains='}
  ];
  total = 0;
  param = '?producto=&venta=';
  tableColumns:  string[] = ['fecha', 'cliente', 'total', 'ver'];
  constructor(
    private servicio: ApiService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
  ) { }
  ngOnInit() {
  }
  paginarModelo($event) {
    this.total = 0;
    this.lista = $event;
    // aca se genera el array con cada venta para luego agregar total
    for (const item of this.lista) {
      let total = 0;
      // ver si se genera de una vez
      const ruta = this.param + item.id;
      this.servicio.getData('ventas_detalle/', ruta).subscribe(
        data => {
          const detalles = data.results;
          for (const detalle of detalles) {
            total += detalle.cantidad * detalle.precio;
            item.total = total;
          }
          this.total += item.total;
        },
        error => {
          if (error.status === 404) {
            this.router.navigateByUrl('/ventas/agregar');
          } else { console.log(error); }
        }
      );
    }
  }
  busqueda($event) {
    this.lista = $event.datos.results;
    this.datos = $event.datos.count;
    this.busq = $event.term;
  }
}
