import JenisKelamin from '@src/helpers/jenisKelamin.helper';
import Peran from '@src/helpers/peran.helper';

export interface IPengguna {
  id: string;
  nip: string;
  email: string;
  password: string;
  nama: string;
  jenisKelamin: JenisKelamin;
  noHp?: string;
  agama?: string;
  peran: Peran;
  tglLahir?: Date;
  golongan?: string;
  idJabatans?: string;
}
