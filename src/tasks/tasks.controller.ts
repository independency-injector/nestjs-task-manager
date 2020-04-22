import { Controller, Get, Post, Body, Delete, Param, Patch, UsePipes, ValidationPipe, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service'; 
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-validation.pipe';
import { GetTasksFilteredDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}
        
        @Get()
        getTasks(
            @Query(ValidationPipe) filterDto: GetTasksFilteredDto,
            @GetUser() user: User
            ): Promise<Task[]> { 
        return this.tasksService.getTasks(filterDto, user);  
        }

        @Get('/:id')
        getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
            return this.tasksService.getTaskById(id);
        }

        @Post()
        @UsePipes(ValidationPipe)
        createTask(
            @GetUser() user: User,
            @Body() createTaskDto: CreateTaskDto
            ): Promise<Task> {
           return this.tasksService.createTask( createTaskDto, user);
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
