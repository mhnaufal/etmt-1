import { NextFunction, Request, Response } from 'express';
import logger from '@src/utils/logger';
import { Pengguna } from './pengguna.entity';
import { IPengguna } from './pengguna.interface';

const getAllPengguna = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const semuaPengguna: IPengguna[] | undefined = await Pengguna.find();
    logger.info(semuaPengguna);
    res.json({ hasil: semuaPengguna });
  } catch (error) {
    logger.error(error);
    next(error);
    throw new Error("Error accessing 'getAllPengguna' route");
  }
};

const createPengguna = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { nip, email, password, nama, alamat } = req.body;

  const pengguna = Pengguna.create({
    nip,
    email,
    password,
    nama,
    alamat,
  });

  try {
    await pengguna.save();
    logger.info('Pengguna created succesfully');
    res.json({ hasil: pengguna });
  } catch (error) {
    logger.error(error);
    next(error);
    throw new Error("Error accessing 'getAllPengguna' route");
  }
};

export { getAllPengguna, createPengguna };
