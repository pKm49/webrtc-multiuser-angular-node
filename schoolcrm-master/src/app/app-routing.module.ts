import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersModule } from './teachers/teachers.module';
import { StudentModule } from './student/student.module';


const routes: Routes = [
  {path: 'teacher', loadChildren: () => import('./teachers/teachers.module').then(m => TeachersModule)},
  {path: 'student', loadChildren: () => import('./student/student.module').then(m => StudentModule)},
  {path: '', redirectTo: 'teacher', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
