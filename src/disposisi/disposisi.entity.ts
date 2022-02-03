/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Jabatan } from '@src/jabatan/jabatan.entity';
import { SuratMasuk } from '@src/surat_masuk/suratMasuk.entity';

@Entity('disposisi')
export class Disposisi extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => Jabatan, jabatan => jabatan.id)
  @JoinColumn({ name: 'id_tujuan_jabatan', referencedColumnName: 'id' })
  idTujuanJabatan!: Jabatan;

  @OneToOne(() => SuratMasuk, suratMasuk => suratMasuk.disposisi)
  @JoinColumn({ name: 'id_surat_masuk', referencedColumnName: 'id' })
  idSuratMasuk!: SuratMasuk;

  @Column({ type: 'text' })
  instruksi!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;
}
