import express, { Router } from 'express';
import renderLandingPage from './home.controller';

const route: Router = express.Router();

route.get('/', renderLandingPage);

export { route as homeRoute };
