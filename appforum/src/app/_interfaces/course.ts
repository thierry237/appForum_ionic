export interface ICourse {
    idCourse?: number,
    name: string,
    description: string,
    createdAt?: string
}

export interface ISingleCourse {
    course: ICourse
}

export interface IListCourse {
    courses: ICourse[]
}
