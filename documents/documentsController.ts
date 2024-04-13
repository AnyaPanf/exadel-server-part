import express, { Request, Response } from 'express'

// const users = []

// const saveUser = (userName: string, userEmail: string, userPassword: string) => {
//     const newUser = [{
//         id: users.length + 1,
//         name: "",
//         email: "",
//         password: "",
//     },]
//     users.push(newUser)
// }
// тут, наверное должна быть ДБ, пока сделала так, чтобы просто работало

export const testPostDocument = (req: Request, res: Response) => {
    try {
        // const { name, email, password } = req.body
        // saveUser(name, email, password)
        res.send('User is successfully registered');
    } catch (error) {
        res.send(error);
        throw new Error('Oops! Something went wrong!');
    }
};