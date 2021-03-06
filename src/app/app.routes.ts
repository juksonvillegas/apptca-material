import { RouterModule, Routes } from '@angular/router';
import {ClientesComponent} from './components/clientes/clientes.component';
import { ClientesRutas } from './components/clientes/clientes.routes';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ProveedoresRutas } from './components/proveedores/proveedores.routes';
import { CategoriasComponent } from './components/mercaderia/categorias/categorias.component';
import { CategoriasRutas } from './components/mercaderia/categorias/categorias.routes';
import { MarcasComponent } from './components/mercaderia/marcas/marcas.component';
import { MarcasRutas } from './components/mercaderia/marcas/marcas.routes';
import { ModelosRutas } from './components/mercaderia/modelos/modelos.routes';
import { ModelosComponent } from './components/mercaderia/modelos/modelos.component';
import { PreciosComponent } from './components/mercaderia/precios/precios.component';
import { PreciosRutas } from './components/mercaderia/precios/precios.routes';
import { ProductosRutas } from './components/mercaderia/productos/productos.routes';
import { ProductosComponent } from './components/mercaderia/productos/productos.component';
import { ConsignacionesComponent } from './components/consignaciones/consignaciones.component';
import { ConsignacionesRutas } from './components/consignaciones/consignaciones.routes';
import { ComprasComponent } from './components/compras/compras.component';
import { ComprasRutas } from './components/compras/compras.routes';
import { VentasComponent } from './components/ventas/ventas.component';
import { VentasRutas } from './components/ventas/ventas.routes';

const appRoutes: Routes = [
    {path: 'clientes', component: ClientesComponent, children: ClientesRutas},
    {path: 'proveedores', component: ProveedoresComponent, children: ProveedoresRutas},
    {path: 'categorias', component: CategoriasComponent, children: CategoriasRutas},
    {path: 'marcas', component: MarcasComponent, children: MarcasRutas},
    {path: 'modelos', component: ModelosComponent, children: ModelosRutas},
    {path: 'precios', component: PreciosComponent, children: PreciosRutas},
    {path: 'productos', component: ProductosComponent, children: ProductosRutas},
    {path: 'consignaciones', component: ConsignacionesComponent, children: ConsignacionesRutas},
    {path: 'compras', component: ComprasComponent, children: ComprasRutas},
    {path: 'ventas', component: VentasComponent, children: VentasRutas},
    {path: '', redirectTo: '/clientes/agregar', pathMatch: 'full'},
    {path: '**', redirectTo: '/clientes/agregar', pathMatch: 'full'},
];
export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: false});
