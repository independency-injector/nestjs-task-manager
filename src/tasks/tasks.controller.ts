import { Controller, Get, Post, Body, Delete, Param, Patch, UsePipes, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service'; 
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-validation.pipe';
import { GetTasksFilteredDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}
        
        @Get()
        getTasks(@Query(ValidationPipe) filterDto: GetTasksFilteredDto): Promise<Task[]> { 
        return this.tasksService.getTasks(filterDto);  
        }

        @Get('/:id')
        getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
            return this.tasksService.getTaskById(id);
        }

        @Post()
        @UsePipes(ValidationPipe)
        createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
           return this.tasksService.createTask(createTaskDto);
        }

        @Delete('/:id')
        deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
            return this.tasksService.deleteTask(id);
        }

        @Patch('/:id/status')
        updateStatus(
            @Param('id', ParseIntPipe) id: number,
            @Body('status', TaskStatusValidationPipe) status: TaskStatus
        ): Promise<Task> {
            return this.tasksService.updateTaskStatus(id, status);
        }
}
