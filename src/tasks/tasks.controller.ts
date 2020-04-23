import { Controller, Get, Post, Body, Delete, Param, Patch, UsePipes, ValidationPipe, Query, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
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
    private logger = new Logger('TasksController');
    constructor(private tasksService: TasksService) {}
        
        @Get()
        getTasks(
            @Query(ValidationPipe) filterDto: GetTasksFilteredDto,
            @GetUser() user: User
            ): Promise<Task[]> { 
            this.logger.verbose(`User "${user.username}" retreived all tasks. Filters: ${JSON.stringify(filterDto)}`);
            return this.tasksService.getTasks(filterDto, user);  
        }

        @Get('/:id')
        getTaskById(
            @Param('id', ParseIntPipe) id: number,
            @GetUser() user: User
            ): Promise<Task> {
            return this.tasksService.getTaskById(id, user);
        }

        @Post()
        @UsePipes(ValidationPipe)
        createTask(
            @GetUser() user: User,
            @Body() createTaskDto: CreateTaskDto
            ): Promise<Task> {
                this.logger.verbose(`User "${user.username}" created a new task: ${JSON.stringify(createTaskDto.title)}`);
                return this.tasksService.createTask( createTaskDto, user);
        }

        @Delete('/:id')
        deleteTask(
            @GetUser() user: User,
            @Param('id', ParseIntPipe) id: number
            ): Promise<void> {
            return this.tasksService.deleteTask(id, user);
        }

        @Patch('/:id/status')
        updateStatus(
            @Param('id', ParseIntPipe) id: number,
            @Body('status', TaskStatusValidationPipe) status: TaskStatus,
            @GetUser() user: User
        ): Promise<Task> {
            return this.tasksService.updateTaskStatus(id, status, user);
        }
}
