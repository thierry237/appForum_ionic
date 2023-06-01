export interface IUser {
    idUser?: number,
    lastname: string,
    firstname: string,
    username: string,
    email: string,
    password: string,
    isAdmin: boolean,
    createdAt?: string
}

export interface ISingleUser {
    dara: IUser
}

export interface IDataUser {
    data: IUser[]
}

export interface IResponseRegister {
    idUser: number,
    username: string,
    isAdmin: boolean
}
