export interface IToken {
    idUser: number,
    isAdmin: boolean,
    token: string
}

export interface ITokenPayload {
    idUser: number,
    isAdmin: boolean,
    username: string,
    iat: number,
    exp: number
}
