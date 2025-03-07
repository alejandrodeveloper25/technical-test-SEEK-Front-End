import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskModalComponent } from './task-modal/task-modal.component';



@NgModule({
  declarations: [
    BoardComponent,
    TaskCardComponent,
    TaskModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TasksModule { }
