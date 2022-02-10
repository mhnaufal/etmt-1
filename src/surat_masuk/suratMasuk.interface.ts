import { Disposisi } from '@src/disposisi/disposisi.entity';
import { JenisSurat } from '@src/jenis_surat/jenisSurat.entity';

export interface ISuratMasuk {
  id: string;
  disposisi?: Disposisi;
  jenisSurat?: JenisSurat;
  noSurat: string;
  tglSurat: Date;
  penerima: string;
  pengirim: string;
  perihal: string;
  file: string;
  ringkasan: string;
}
