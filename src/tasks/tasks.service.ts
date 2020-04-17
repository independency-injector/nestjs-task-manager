import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilteredDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    // private tasks: Task[] = [];

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTaskById(id: string): Task {
    //     const task = this.tasks.find(task => task.id === id);
    //     if (!task){
    //         throw new NotFoundException(`Task with id ${id} was not found`);
    //     }
    //     return task;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilteredDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();
    //     if(status){
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //         if(search) {
    //             tasks = tasks.filter(task => 
    //                 task.title.includes(search) || 
    //                 task.description.includes(search)
    //                 );
    //         }
    //     return tasks;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;

    //     const task: Task = {
    //         id: uuidv1(),
    //         title, 
    //         description,
    //         status: TaskStatus.OPEN,
    //     };
        
    //     this.tasks.push(task);
    //     return task;
    // }

    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
