import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import logger from '@src/utils/logger';
import { PenggunaRepository } from './pengguna.service';
import { IPengguna } from './pengguna.interface';

const getAllPengguna = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const penggunaService = getCustomRepository(PenggunaRepository);

  try {
    const semuaPengguna = await penggunaService.findAllPengguna();

    logger.info(semuaPengguna);
    res.json({ hasil: semuaPengguna });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const getPenggunaById = async (req: Request, res: Response, next: NextFunction) => {
  const penggunaService = getCustomRepository(PenggunaRepository);
  const idPengguna = req.params.id;

  try {
    const pengguna = await penggunaService.findByIdPengguna(idPengguna);

    logger.info(pengguna);
    res.json({ hasil: pengguna });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const createPengguna = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const penggunaService = getCustomRepository(PenggunaRepository);
  const penggunaData: IPengguna = req.body;

  try {
    const pengguna: IPengguna = await penggunaService.createPengguna(penggunaData);
    logger.info('Pengguna created succesfully');
    res.json({ hasil: pengguna });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const updatePengguna = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const penggunaId = req.params.id;
  const penggunaService = getCustomRepository(PenggunaRepository);
  const penggunaData: IPengguna = req.body;

  try {
    const pengguna = await penggunaService.updatePengguna(penggunaId, penggunaData);

    logger.info('Pengguna created succesfully');
    res.json({ hasil: pengguna });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const deletePengguna = async (req: Request, res: Response, next: NextFunction) => {
  const penggunaService = getCustomRepository(PenggunaRepository);
  const idPengguna = req.params.id;

  try {
    const pengguna = await penggunaService.deletePengguna(idPengguna);

    logger.info(pengguna);
    res.json({ hasil: pengguna });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
export { getAllPengguna, getPenggunaById, createPengguna, updatePengguna, deletePengguna };
