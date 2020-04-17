import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilteredDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {};
        
    getTasks(filterDto: GetTasksFilteredDto): Promise <Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const foundTask = await this.taskRepository.findOne(id);
        if(!foundTask) throw new NotFoundException('There is no such task');

        return foundTask;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`Task with id ${id} was not found`);
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const foundTask = await this.getTaskById(id);
        foundTask.status = status;
        return await foundTask.save();
    }
    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
