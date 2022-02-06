import express, { Router } from 'express';
import { login, logout, register } from '@src/authentication/authentication.controller';
import { renderDashboard, renderLandingPage, renderLoginPage, renderRegisterPage } from './home.controller';
import { isAuthenticated, isNotAuthenticated } from '@src/middlewares/passport.middleware';

const route: Router = express.Router();

route.get('/', renderLandingPage);

route.get('/register', isNotAuthenticated, renderRegisterPage);
route.post('/register', register);

route.get('/login', isNotAuthenticated, renderLoginPage);
route.post('/login', login);
route.delete('/logout', logout);

route.get('/dashboard', isAuthenticated, renderDashboard);

export { route as homeRoute };
