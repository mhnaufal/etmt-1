import express, { Router } from 'express';
import { login, register } from '@src/authentication/authentication.controller';
import { renderDashboard, renderLandingPage, renderLoginPage, renderRegisterPage } from './home.controller';

const route: Router = express.Router();

route.get('/', renderLandingPage);

route.get('/register', renderRegisterPage);
route.post('/register', register);

route.get('/login', renderLoginPage);
route.post('/login', login);

route.get('/dashboard', renderDashboard);

export { route as homeRoute };
