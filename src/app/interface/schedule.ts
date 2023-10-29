import { Clazz } from "./clazz"
import { User } from "./user"

export interface Schedule {
    id?: bigint,
    sessionName?: string
    startTime?: string,
    endTime?: string,
    trainingType?: string,
    clazzType?: string,
    clazzDetails?: string,
    trainers?: User[],
    clazz?: Clazz,
    organizer?: User,
}
