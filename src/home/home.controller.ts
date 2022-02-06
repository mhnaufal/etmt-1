/** @Package */
import { Request, Response } from 'express';

const renderLandingPage = (req: Request, res: Response): void => {
  res.render('landingpage', { layout: false });
};

const renderRegisterPage = (req: Request, res: Response): void => {
  res.render('register', { layout: false });
};

const renderLoginPage = (req: Request, res: Response): void => {
  res.render('login', { layout: false });
};

const renderDashboard = (req: Request, res: Response): void => {
  res.render('dashboard', { title: 'Dashboard' });
};

export { renderLandingPage, renderRegisterPage, renderLoginPage, renderDashboard };
