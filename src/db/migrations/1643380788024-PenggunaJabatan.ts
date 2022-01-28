import {MigrationInterface, QueryRunner} from "typeorm";

export class PenggunaJabatan1643380788024 implements MigrationInterface {
    name = 'PenggunaJabatan1643380788024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`pengguna\` (\`id\` varchar(36) NOT NULL, \`nip\` varchar(20) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`nama\` varchar(255) NOT NULL, \`jenis_kelamin\` enum ('laki-laki', 'perempuan') NOT NULL DEFAULT 'laki-laki', \`no_hp\` varchar(15) NOT NULL, \`alamat\` text NOT NULL, \`agama\` varchar(255) NOT NULL, \`peran\` enum ('pegawai', 'admin') NOT NULL DEFAULT 'pegawai', \`tgl_lahir\` timestamp NULL, \`golongan\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id_jabatan\` int NULL, UNIQUE INDEX \`IDX_7b7ef5c9ca1aca4d27c28a3d89\` (\`nip\`), UNIQUE INDEX \`IDX_e2c44474b171bd878e3d8ec22b\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`jabatan\` (\`id\` int NOT NULL AUTO_INCREMENT, \`jabatan\` varchar(255) NOT NULL, \`kode\` char(15) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`pengguna\` ADD CONSTRAINT \`FK_cd0ba5fa80f7b5627cbdd87e2f7\` FOREIGN KEY (\`id_jabatan\`) REFERENCES \`jabatan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pengguna\` DROP FOREIGN KEY \`FK_cd0ba5fa80f7b5627cbdd87e2f7\``);
        await queryRunner.query(`DROP TABLE \`jabatan\``);
        await queryRunner.query(`DROP INDEX \`IDX_e2c44474b171bd878e3d8ec22b\` ON \`pengguna\``);
        await queryRunner.query(`DROP INDEX \`IDX_7b7ef5c9ca1aca4d27c28a3d89\` ON \`pengguna\``);
        await queryRunner.query(`DROP TABLE \`pengguna\``);
    }

}
