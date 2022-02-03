import bcrypt from 'bcrypt';
/* eslint-disable import/prefer-default-export */
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import JenisKelamin from '@src/helpers/jenisKelamin.helper';
import Peran from '@src/helpers/peran.helper';
// eslint-disable-next-line import/no-cycle
import { Jabatan } from '@src/jabatan/jabatan.entity';

@Entity('pengguna')
export class Pengguna extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  nip!: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  nama!: string;

  @Column({
    name: 'jenis_kelamin',
    type: 'enum',
    enum: JenisKelamin,
    default: JenisKelamin.LAKILAKI,
  })
  jenisKelamin!: JenisKelamin;

  @Column({
    name: 'no_hp',
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  noHp!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  alamat!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  agama!: string;

  @Column({
    type: 'enum',
    enum: Peran,
    default: Peran.PEGAWAI,
  })
  peran!: Peran;

  @Column({
    name: 'tgl_lahir',
    type: 'timestamp',
    nullable: true,
  })
  tglLahir!: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  golongan!: string;

  @ManyToOne(() => Jabatan, jabatan => jabatan.id)
  @JoinColumn({ name: 'id_jabatan', referencedColumnName: 'id' })
  idJabatan!: Jabatan;

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

  @BeforeInsert()
  async hasPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
