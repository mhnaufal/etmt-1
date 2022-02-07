/** @Package */
import express, { Router } from 'express';
/** @Controller */
import { login, logout, register } from '@src/authentication/authentication.controller';
import { renderDashboard, renderLandingPage, renderLoginPage, renderRegisterPage, uploadFile } from '@src/home/home.controller';
/** @Middleware */
import { isAuthenticated, isNotAuthenticated } from '@src/middlewares/passport.middleware';
import upload from '@src/middlewares/multer.middleware';

const route: Router = express.Router();

route.get('/', renderLandingPage);

/* Register route */
route.get('/register', isNotAuthenticated, renderRegisterPage);
route.post('/register', isNotAuthenticated, register);

/* Login logout route */
route.get('/login', isNotAuthenticated, renderLoginPage);
route.post('/login', isNotAuthenticated, login);
route.delete('/logout', logout, isAuthenticated);

/* Dashboard route */
route.get('/dashboard', renderDashboard);
route.post('/upload', upload.single('avatar'), uploadFile);

export { route as homeRoute };
