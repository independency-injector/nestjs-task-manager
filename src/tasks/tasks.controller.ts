import { Controller, Get, Post, Body, Delete, Param, Patch, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-validation.pipe';
import { GetTasksFilteredDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}
        
        @Get()
        getAllTasks(@Query(ValidationPipe) filterDto: GetTasksFilteredDto): Task[] {
            if (Object.keys(filterDto).length){
                return this.tasksService.getTasksWithFilters(filterDto);
            }
            return this.tasksService.getAllTasks();
        }

        @Get('/:id')
        getTaskById(@Param('id') id: string): Task {
            return this.tasksService.getTaskById(id);
        }

        @Post()
        @UsePipes(ValidationPipe)
        createTask(@Body() createTaskDto: CreateTaskDto): Task {
           return this.tasksService.createTask(createTaskDto);
        }

        @Delete('/:id')
        deleteTask(@Param('id') id: string): void {
            this.tasksService.deleteTask(id);
        }

        @Patch('/:id/status')
        updateStatus(
            @Param('id') id: string,
            @Body('status', TaskStatusValidationPipe) status: TaskStatus
        ): Task {
            return this.tasksService.updateTaskStatus(id, status);
        }
}
