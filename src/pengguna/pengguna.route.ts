/** @Package */
import express, { Router } from 'express';
/** @Controller */
import { getAllPengguna, getPenggunaById, createPengguna, updatePengguna, deletePengguna } from './pengguna.controller';

const route: Router = express.Router();

route.get('/pengguna', getAllPengguna);
route.post('/pengguna/tambah', createPengguna);
route.get('/pengguna/:id', getPenggunaById);
route.post('/pengguna/edit/:id', updatePengguna);
route.post('/pengguna/hapus/:id', deletePengguna);

export { route as penggunaRoute };
