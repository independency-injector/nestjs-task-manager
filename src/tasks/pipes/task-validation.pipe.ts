import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS
    ];
    
    transform(value: any){
        value = value.toUpperCase();

        if(!this.isValidStatus(value)){
            throw new BadRequestException(`${value} is invalid status option`);
        }
        
        return value;
    }

    private isValidStatus(status: any): boolean{
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}   