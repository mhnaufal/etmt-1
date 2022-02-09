/** @Package */
import { Request, Response } from 'express';

const renderLandingPage = (req: Request, res: Response): void => {
  res.render('landingpage', { layout: false });
};

const renderRegisterPage = (req: Request, res: Response): void => {
  const error = req.flash('error');
  res.render('register', { error, layout: false });
};

const renderLoginPage = (req: Request, res: Response): void => {
  const error = req.flash('error');
  res.render('login', { error, layout: false });
};

const renderDashboard = (req: Request, res: Response): void => {
  res.render('dashboard', { title: 'Dashboard' });
};

const uploadFile = (req: Request, res: Response): void => {
  console.log(req.file);

  res.send('Upload file success');
};

export { renderLandingPage, renderRegisterPage, renderLoginPage, renderDashboard, uploadFile };
