import JenisKelamin from '@src/helpers/jenisKelamin.helper';
import Peran from '@src/helpers/peran.helper';

export interface IPengguna {
  id: string;
  nip: string;
  email: string;
  password: string;
  nama: string;
  jenis_kelamin: JenisKelamin;
  no_hp: string;
  agama: string;
  peran: Peran;
  tgl_lahir?: Date;
  golongan: string;
  id_jabatan?: string;
}
