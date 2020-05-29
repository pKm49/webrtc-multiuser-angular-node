import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentclassComponent } from './studentclass/studentclass.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent, children: [
    {path: 'class', component: StudentclassComponent},
    {path: '', redirectTo: 'class', pathMatch: 'full'}
  ]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
