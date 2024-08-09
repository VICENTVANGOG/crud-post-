export interface BodyRequestLogin {
    email: string;
    password: string;
}

export interface BodyResponseLogin {
    message: string
}

export interface BodyRequestRegister {
    email: string;
    password: string;
}

export interface BodyResponseRegister {
    email: string,
    password: string,
    id: number
}