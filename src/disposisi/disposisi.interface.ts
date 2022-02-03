import { Jabatan } from '@src/jabatan/jabatan.entity';
import { SuratMasuk } from '@src/surat_masuk/suratMasuk.entity';

export interface IDisposisi {
  id: string;
  idTujuanJabatan?: Jabatan;
  idSuratMasuk?: SuratMasuk;
  instruksi: string;
}
