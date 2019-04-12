import { RouterModule, Routes } from '@angular/router';
import {ClientesComponent} from './components/clientes/clientes.component';
import { ClientesRutas } from './components/clientes/clientes.routes';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ProveedoresRutas } from './components/proveedores/proveedores.routes';
import { MercaderiaComponent } from './components/mercaderia/mercaderia.component';
import { CategoriasComponent } from './components/mercaderia/categorias/categorias.component';
import { CategoriasRutas } from './components/mercaderia/categorias/categorias.routes';

const appRoutes: Routes = [
    {path: 'clientes', component: ClientesComponent, children: ClientesRutas},
    {path: 'proveedores', component: ProveedoresComponent, children: ProveedoresRutas},
    {path: 'mercaderia', component: MercaderiaComponent},
    {path: 'categorias', component: CategoriasComponent, children: CategoriasRutas},
    {path: '', redirectTo: '/clientes/agregar', pathMatch: 'full'},
    {path: '**', redirectTo: '/clientes/agregar', pathMatch: 'full'},
];
export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: false});
