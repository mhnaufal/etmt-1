import Faker from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { Jabatan } from './jabatan.entity';

define(Jabatan, (faker: typeof Faker) => {
  const jabatanSeed = new Jabatan();
  jabatanSeed.jabatan = faker.name.jobType();
  jabatanSeed.kode = `${faker.random.alphaNumeric(10)}`; // wrap it around template string ``

  return jabatanSeed;
});
