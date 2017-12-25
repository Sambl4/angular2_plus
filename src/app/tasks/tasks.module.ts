import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks.routing.module';

import { TaskComponent, TaskFormComponent, TaskListComponent, TaskArrayService } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule
  ],
  declarations: [
    TaskListComponent,
    TaskComponent,
    TaskFormComponent
  ],
  providers: [
    TaskArrayService
  ]
})
export class TasksModule { }
