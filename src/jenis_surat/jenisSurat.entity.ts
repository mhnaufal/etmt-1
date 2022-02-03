/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { SuratMasuk } from '@src/surat_masuk/suratMasuk.entity';
import { SuratKeluar } from '@src/surat_keluar/suratKeluar.entity';

@Entity('jenis_surat')
export class JenisSurat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  nama!: string;

  @Column({
    type: 'char',
    length: 15,
  })
  kode!: string;

  @OneToMany(() => SuratMasuk, suratMasuk => suratMasuk.jenisSurat)
  suratMasuk!: SuratMasuk[];

  @OneToMany(() => SuratKeluar, suratKeluar => suratKeluar.jenisSurat)
  suratKeluar!: SuratKeluar[];

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
