import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/task.service';
import { Tarea } from 'src/app/models/global.interface';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  dropListIds = ['start', 'progress', 'finished'];
  tasks: Tarea[] = [];
  newTask: Partial<Tarea> = { title: '', description: '', status: 'start' };
  selectedTask: Tarea = { id: 0, title: '', description: '', status: 'start' };
  applyViewModal = false;

  tasksByStatus: { [key: string]: Tarea[] } = { start: [], progress: [], finished: [] };

  constructor(private taskService: TaskService) {}

  dropListConnectedIds: string[] = [];

  ngOnInit(): void {
    this.dropListConnectedIds = this.dropListIds.map(s => 'drop-list-' + s);
    this.loadTasks();
  }


  loadTasks(): void {
    this.taskService.getTasks().subscribe(response => {
      this.tasks = Array.isArray(response.data) ? response.data : [];
      this.tasksByStatus = {  
        start: this.tasks.filter(task => task.status === 'start'),
        progress: this.tasks.filter(task => task.status === 'progress'),
        finished: this.tasks.filter(task => task.status === 'finished')
      };
    });
  }
  

  onDrop(event: CdkDragDrop<Tarea[]>) {
    console.log('Previous ID:', event.previousContainer.id);
    console.log('Current ID:', event.container.id);

    if (event.previousContainer.id !== event.container.id) {
      const tarea = event.previousContainer.data[event.previousIndex];
      event.previousContainer.data.splice(event.previousIndex, 1);

      const newStatus = event.container.id.replace('drop-list-', ''); 

      tarea.status = newStatus; // Asignar el estado correcto
    event.container.data.splice(event.currentIndex, 0, tarea);

      this.taskService.updateTask(tarea).subscribe(() => this.loadTasks());
    }
  }
  

  getFilteredTasks(status: string) {
    return this.tasks.filter(t => t.status === status);
  }

  openTaskForm() {
    this.applyViewModal = true;
    this.selectedTask = { id: 0, title: '', description: '', status: 'start' };
  }

  closeTaskForm() {
    this.applyViewModal = false;
    this.selectedTask = { id: 0, title: '', description: '', status: 'start' };
  }

  editTask(task: Tarea) {
    console.log(task);
    this.applyViewModal = true;
    this.selectedTask = { ...task };
  }

  saveTask() {
    if (this.selectedTask?.id) {
      this.taskService.updateTask(this.selectedTask).subscribe((response) => {
        console.log(response)
        this.loadTasks();
        this.closeTaskForm();
        
      });
    } else {
      const newTaskData: Partial<Tarea> = { 
        title: this.selectedTask.title, 
        description: this.selectedTask.description, 
        status: 'start' 
      };
  
      this.taskService.createTask(newTaskData).subscribe((response) => {
        console.log(response);
        this.loadTasks();
        this.closeTaskForm();
      });
    }
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
      this.closeTaskForm()
    });
  }

}
