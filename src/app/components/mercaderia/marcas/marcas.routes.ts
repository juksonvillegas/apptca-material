import { Routes } from '@angular/router';
import { MarcasAddeditComponent } from './marcas-addedit/marcas-addedit.component';
import { MarcasListaComponent } from './marcas-lista/marcas-lista.component';
import { MarcasEliminarComponent } from './marcas-eliminar/marcas-eliminar.component';

export const MarcasRutas: Routes = [
    {path: 'agregar', component: MarcasAddeditComponent},
    {path: 'lista', component: MarcasListaComponent},
    {path: 'eliminar/:id', component: MarcasEliminarComponent},
    {path: 'editar/:id', component: MarcasAddeditComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
