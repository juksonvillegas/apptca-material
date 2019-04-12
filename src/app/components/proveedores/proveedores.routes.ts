import { Routes } from '@angular/router';
import { ProveedoresAddeditComponent } from './proveedores-addedit/proveedores-addedit.component';
import { ProveedoresListaComponent } from './proveedores-lista/proveedores-lista.component';
import { ProveedoresEliminarComponent } from './proveedores-eliminar/proveedores-eliminar.component';

export const ProveedoresRutas: Routes = [
    {path: 'agregar', component: ProveedoresAddeditComponent},
    {path: 'lista', component: ProveedoresListaComponent},
    {path: 'eliminar/:id', component: ProveedoresEliminarComponent},
    {path: 'editar/:id', component: ProveedoresAddeditComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
