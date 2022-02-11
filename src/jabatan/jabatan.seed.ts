/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Jabatan } from './jabatan.entity';

export default class CreateJabatan implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    /* Create data but dont saved it in database */
    // await factory(Jabatan)().make();
    const jabatanFactory = await factory(Jabatan)().makeMany(3);

    /* Create data and saved it in database */
    // await factory(Jabatan)().create();
    // await factory(Jabatan)().createMany(3);
  }
}
