/* eslint-disable import/prefer-default-export */
import { DeleteResult, EntityRepository, Repository, UpdateResult } from 'typeorm';
import { Pengguna } from '@src/pengguna/pengguna.entity';
import { IPengguna } from './pengguna.interface';
import HttpException from '@src/utils/HttpException';
import { isEmpty } from '@src/helpers/isEmpty';

@EntityRepository(Pengguna)
export class PenggunaRepository extends Repository<Pengguna> {
  async findAllPengguna(): Promise<IPengguna[]> {
    const semuaPengguna: IPengguna[] = await this.find();

    return semuaPengguna;
  }

  async findByIdPengguna(id: string): Promise<IPengguna> {
    const pengguna: IPengguna | undefined = await this.findOne({ id });
    if (!pengguna) throw new HttpException(404, 'Pengguna tidak ditemukan!');

    return pengguna;
  }

  async findByEmailPengguna(email: string): Promise<IPengguna> {
    const pengguna: IPengguna | undefined = await this.findOne({ email });
    if (!pengguna) throw new HttpException(404, 'Pengguna tidak ditemukan!');

    return pengguna;
  }

  async findByNamaPengguna(nama: string): Promise<IPengguna> {
    const pengguna: IPengguna | undefined = await this.findOne({ nama });
    if (!pengguna) throw new HttpException(404, 'Pengguna tidak ditemukan!');

    return pengguna;
  }

  async createPengguna(penggunaData: IPengguna): Promise<IPengguna> {
    if (isEmpty(penggunaData)) throw new HttpException(400, 'Data pengguna salah');

    const findPengguna: IPengguna | undefined = await this.findOne({ where: [{ email: penggunaData.email }, { no_hp: penggunaData.noHp }] });
    if (findPengguna) throw new HttpException(409, 'Pengguna telah terdaftar!');

    const createdPengguna: Pengguna = this.create({ ...penggunaData });
    await createdPengguna.save();

    return createdPengguna;
  }

  async updatePengguna(id: string, penggunaData: IPengguna): Promise<UpdateResult> {
    if (isEmpty(penggunaData)) throw new HttpException(400, 'Data pengguna salah');

    const findPengguna: IPengguna | undefined = await this.findOne({
      where: [{ email: penggunaData.email }, { no_hp: penggunaData.noHp }],
    });
    if (findPengguna) throw new HttpException(409, 'Email atau nomor hp tersebut telah digunakan!');

    const updatedPengguna: UpdateResult = await this.update(id, { ...penggunaData });

    return updatedPengguna;
  }

  async deletePengguna(id: string): Promise<DeleteResult> {
    const pengguna = await this.delete(id);
    if (!pengguna) throw new HttpException(404, 'Pengguna tidak terdaftar!');

    return pengguna;
  }
}
