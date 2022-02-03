/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Pengguna } from '@src/pengguna/pengguna.entity';
import { Disposisi } from '@src/disposisi/disposisi.entity';

@Entity('jabatan')
export class Jabatan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  jabatan!: string;

  @Column({
    type: 'char',
    length: 15,
  })
  kode!: string;

  @OneToMany(() => Pengguna, pengguna => pengguna.idJabatan)
  pengguna!: Pengguna[];

  @OneToMany(() => Disposisi, disposisi => disposisi.idTujuanJabatan)
  diposisi!: Disposisi[];

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
