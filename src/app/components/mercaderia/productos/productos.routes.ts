import { Routes } from '@angular/router';
import { ProductosAddeditComponent } from './productos-addedit/productos-addedit.component';
import { ProductosListaComponent } from './productos-lista/productos-lista.component';
import { ProdutosEliminarComponent } from './produtos-eliminar/produtos-eliminar.component';

export const ProductosRutas: Routes = [
    {path: 'agregar', component: ProductosAddeditComponent},
    {path: 'lista', component: ProductosListaComponent},
    {path: 'eliminar/:id', component: ProdutosEliminarComponent},
    {path: 'editar/:id', component: ProductosAddeditComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
