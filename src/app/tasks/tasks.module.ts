import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule
  ]
})
export class TasksModule { }
