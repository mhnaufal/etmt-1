import express, { Router } from 'express';
import { getAllPengguna, createPengguna } from './pengguna.controller';

const route: Router = express.Router();

route.get('/pengguna', getAllPengguna);
route.post('/pengguna/tambah', createPengguna);

export { route as penggunaRoute };
