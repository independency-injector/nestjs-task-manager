import { TaskStatus } from "../task.status.enum";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class GetTasksFilteredDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.DONE, TaskStatus.IN_PROGRESS])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}