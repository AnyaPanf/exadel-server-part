import { Request, Response } from 'express'

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
// тут, наверное должна быть бд, пока сделала так, чтобы просто работало

export const testPostDocument = (req: Request, res: Response) => {
    try {
        // const { name, email, password } = req.body
        // saveUser(name, email, password)
        res.status(200).send('Everything is correct!');
    } catch (error) {
        res.status(404).send(`Oops! There is an error: ${error}`);
    }
};