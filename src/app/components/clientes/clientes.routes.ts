import { Routes } from '@angular/router';
import { ClientesAddeditComponent } from './clientes-addedit/clientes-addedit.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ClientesEliminarComponent } from './clientes-eliminar/clientes-eliminar.component';

export const ClientesRutas: Routes = [
    {path: 'agregar', component: ClientesAddeditComponent},
    {path: 'lista', component: ClientesListaComponent},
    {path: 'eliminar/:id', component: ClientesEliminarComponent},
    {path: 'editar/:id', component: ClientesAddeditComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
