import { Course } from "./course";

export interface Clazz {
    id?: bigint,
    name?: string,
    description?: string,
    course?: Course
}
