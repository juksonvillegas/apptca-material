import { Routes } from '@angular/router';
import { ConsignacionesAddeditComponent } from './consignaciones-addedit/consignaciones-addedit.component';
import { ConsignacionesListaComponent } from './consignaciones-lista/consignaciones-lista.component';
import { ConsignacionesEliminarComponent } from './consignaciones-eliminar/consignaciones-eliminar.component';

export const ConsignacionesRutas: Routes = [
    {path: 'agregar', component: ConsignacionesAddeditComponent},
    {path: 'lista', component: ConsignacionesListaComponent},
    {path: 'eliminar/:id', component: ConsignacionesEliminarComponent},
    {path: 'editar/:id', component: ConsignacionesAddeditComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
