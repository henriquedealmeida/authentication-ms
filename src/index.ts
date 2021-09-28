import express, {Request, Response, NextFunction} from 'express';
import jwtAuthenticationMiddleware from './middleware/jwt-authentication.middleware';
import errorHandler from './middleware/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

// Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configurações de rotas
app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);
app.use(statusRoute);
app.use(authorizationRoute);

// Configuração do error handler
app.use(errorHandler);

// Inicialização do servidor
app.listen(3000, () => {
    console.log('funciona');
});