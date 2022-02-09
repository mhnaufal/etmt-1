/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Disposisi } from '@src/disposisi/disposisi.entity';
import { JenisSurat } from '@src/jenis_surat/jenisSurat.entity';

@Entity('surat_masuk')
export class SuratMasuk extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @OneToOne(() => Disposisi, disposisi => disposisi.idSuratMasuk)
  disposisi!: Disposisi;

  @ManyToOne(() => JenisSurat, jenisSurat => jenisSurat.id)
  @JoinColumn({ name: 'jenis_surat', referencedColumnName: 'id' })
  jenisSurat!: JenisSurat;

  @Column({
    name: 'no_surat',
    type: 'varchar',
    length: 20,
    unique: true,
  })
  noSurat!: string;

  @Column({ name: 'tgl_surat', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  tglSurat!: Date;

  @Column({ type: 'varchar', length: 255 })
  penerima!: string;

  @Column({ type: 'varchar', length: 255 })
  pengirim!: string;

  @Column({ type: 'varchar', length: 255 })
  perihal!: string;

  @Column({ type: 'blob' })
  file!: string;

  @Column({ type: 'text' })
  ringkasan!: string;

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
