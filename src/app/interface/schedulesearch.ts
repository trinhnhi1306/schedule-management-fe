import { Clazz } from "./clazz";
import { User } from "./user";

export interface ScheduleSearch {
    sessionName?: string
    startTime?: string,
    endTime?: string,
    trainingType?: string,
    clazzType?: string,
    trainers?: User[],
    clazz?: Clazz,
}
