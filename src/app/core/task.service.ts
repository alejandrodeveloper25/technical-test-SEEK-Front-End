import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../models/global.interface';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://13.38.79.193:8080/task';


  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    return { headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` }) };
  }

  getTasks(): Observable<any> {
    return this.http.get<Tarea[]>(this.apiUrl, this.getAuthHeaders());
  }

  getTaskById(task: Tarea): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.apiUrl}/${task.id}`, this.getAuthHeaders());
  }

  createTask(task: Partial<Tarea>): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, task, this.getAuthHeaders());
  }

  updateTask(task: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${task.id}`, task, this.getAuthHeaders());
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`, this.getAuthHeaders());
  }
}
