import { Disposisi } from '@src/disposisi/disposisi.entity';
import { Pengguna } from '@src/pengguna/pengguna.entity';

export interface IJenisJabatan {
  id: string;
  jabatan: string;
  kode: string;
  pengguna?: Pengguna;
  disposisi?: Disposisi;
}
