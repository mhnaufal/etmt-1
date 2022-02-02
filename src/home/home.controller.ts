import { Request, Response } from 'express';

const renderLandingPage = (req: Request, res: Response): void => {
  res.render('landingpage');
};

export default renderLandingPage;
