import express, {Request, Response, NextFunction} from 'express';
import errorHandler from './middleware/error-handler.middleware';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

// Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configurações de rotas
app.use(usersRoute);
app.use(statusRoute);

// Configuração do error handler
app.use(errorHandler);

// Inicialização do servidor
app.listen(3000, () => {
    console.log('funciona');
});