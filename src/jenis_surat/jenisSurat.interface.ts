import { Disposisi } from '@src/disposisi/disposisi.entity';
import { Pengguna } from '@src/pengguna/pengguna.entity';

export interface IJenisSurat {
  id: string;
  nama: string;
  kode: string;
  suratMasuk?: Pengguna;
  suratKeluar?: Disposisi;
}
