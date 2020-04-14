import { TaskStatus } from "../task.model";

export class GetTasksFilteredDto {
    status: TaskStatus;
    search: string;
}