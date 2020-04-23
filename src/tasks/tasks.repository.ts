import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task.status.enum";
import { GetTasksFilteredDto } from "./dto/get-task-filter.dto";
import { User } from "src/auth/user.entity";
import { Logger, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    
    private logger = new Logger('TaskRepository');

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;

        try{
        await task.save();
        } catch(ex) {
            this.logger.error(`Failed to create a new task for user "${user.username}". Data: ${JSON.stringify(createTaskDto.title)}`, ex.stack);
            throw new InternalServerErrorException();
        }
        delete task.user;
        return task;
    }

    async getTasks(filterDto: GetTasksFilteredDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id });

        if(status) {
            query.andWhere('task.status = :status', {status });
        }

        if(search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%`})
        }

        try {
        const tasks = await query.getMany();
        return tasks;
        } catch(ex) {
            this.logger.error(`Failed to get tasks for user "${user.username}", filters: ${JSON.stringify(filterDto)}`, ex.stack);
            throw new InternalServerErrorException();
        }
    }
}