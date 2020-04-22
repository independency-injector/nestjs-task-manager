import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { GetTasksFilteredDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {};
        
    getTasks(filterDto: GetTasksFilteredDto, user: User): Promise <Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: number): Promise<Task> {
        const foundTask = await this.taskRepository.findOne(id);
        if(!foundTask) throw new NotFoundException('There is no such task');

        return foundTask;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
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
