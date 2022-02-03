import { JenisSurat } from '@src/jenis_surat/jenisSurat.entity';

export interface ISuratKeluar {
  id: string;
  jenisSurat?: JenisSurat;
  noSurat: string;
  tglSurat: Date;
  tujuan: string;
  pembuat: string;
  perihal: string;
  file: string;
  ringkasan: string;
}
