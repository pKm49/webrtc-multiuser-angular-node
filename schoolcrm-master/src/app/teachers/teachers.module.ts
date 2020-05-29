import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { TeachersRoutingModule } from './teachers-routing.module';
import { HomeComponent } from './home/home.component';
import { ClassComponent } from './class/class.component';


@NgModule({
  declarations: [HomeComponent, ClassComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TeachersRoutingModule
  ]
})
export class TeachersModule { }
