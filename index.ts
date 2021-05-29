import express from 'express'
import usersRouter from './users/controller/UsersController'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { PostgresConnection } from './commons/PostgresConnection';

dotenv.config()

async function main() {
    await PostgresConnection.getConnection().connect();

    PostgresConnection.getConnection().execute('SELECT * FROM users_ruben').then(resultado => {
        console.log(resultado.rows)
    });

    /*PostgresConnection.getConnection().execute("INSERT INTO users_ruben(name, username, password) VALUES ($1,$2,$3)", ['Aldair', 'aldairmh', '123456']).then(resultado => {
        console.log(resultado)
    });*/

    /*PostgresConnection.getConnection().execute("UPDATE users_ruben SET name = $1 WHERE id=$2", ['Daniel', 1]).then(resultado => {
        console.log(resultado)
    });*/

    /*PostgresConnection.getConnection().execute("DELETE FROM users_ruben WHERE id=$1", [1]).then(resultado => {
        console.log(resultado)
    });*/

    const app = express()
    const port = 8080;

    app.use(express.json())


    app.post('/signIn', (request, response) => {
        const { body } = request;
        const { user, password } = body;
        /*const user = body.user;
        const password = body.password;*/
        /** {id: 1, user: user} */
        const token = jwt.sign({ id: 1, user }, 'SECRET_KEY', {
            expiresIn: '1d'
        }) //GENERACIÓN DE TOKEN //JWT
        response.status(200).send({ token: token })
    });

    //MIDDLEWARE
    app.use((request, response, next) => {
        const token = request.headers.token;
        if (!token) {
            response.status(400).send({ message: 'No viene token' })
            return;
        }
        try {
            const decoded = jwt.verify(String(token), 'SECRET_KEY'); //JWT
            next()
        } catch (e) {
            response.status(400).send({ message: 'PROHIBIDO' })
        }
        //response.status(401).send({ message: 'PROHIBIDO' })
    });

    app.use(usersRouter);

    app.get('',
        (request, response) => {
            response.status(201);
            response.send('Hello From GET')
        }
    )

    app.post('', (request, response) => {
        console.log(request.headers);
        console.log(request.query);
        response.status(201);
        response.send(request.body)
    })


    app.listen(port, () => {
        console.log(`App is running on Port ${port}`);
    })
}

main();