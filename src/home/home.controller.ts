import { Request, Response } from 'express';

const renderLandingPage = (req: Request, res: Response): void => {
  res.render('landingpage', { layout: false });
};

const renderLoginPage = (req: Request, res: Response): void => {
  res.render('login', { layout: false });
};

export { renderLandingPage, renderLoginPage };
