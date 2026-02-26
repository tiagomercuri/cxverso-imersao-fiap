import { Routes } from '@angular/router';
import {Exemplo1ComponentComponent} from './components/exemplo1-component/exemplo1-component.component';
import {Exemplo2ComponentComponent } from './components/exemplo2-component/exemplo2-component.component';
 
export const routes: Routes = [
 
     {path:'exemplo-1', component: Exemplo1ComponentComponent},
     {path:'exemplo-2', component: Exemplo2ComponentComponent}
];
