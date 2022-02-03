import express, { Router } from 'express';
import { renderLandingPage, renderLoginPage } from './home.controller';

const route: Router = express.Router();

route.get('/', renderLandingPage);
route.get('/login', renderLoginPage);

export { route as homeRoute };
