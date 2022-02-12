/** @Package */
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { Jabatan } from './jabatan.entity';

const createJabatan = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;

  const errors = await validate(data);

  if (errors.length > 0) {
    next(errors);
  }

  try {
    const jabatan = await Jabatan.create(data);
    res.json({ hasil: jabatan });
  } catch (error) {
    next(error);
  }
};

export default createJabatan;
