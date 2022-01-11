import { InternalServerErrorException } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  CREATE_SCHEMA_FILE,
  DELETE_SCHEMA_FILE,
  SEED_SCHEMA_FILE,
} from './constants';
import { FileHelper } from './helpers/handle.file.helper';

export class createSchema1641911302726 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (
      process.env.NODE_ENV === 'test' ||
      process.env.NODE_ENV === 'development'
    ) {
      const seedSchema = FileHelper.read(CREATE_SCHEMA_FILE);
      const seedSchema1 = seedSchema.replace(
        '-- DROP ROLE IF EXISTS admin_projeto;',
        'DROP ROLE IF EXISTS admin_projeto;',
      );
      const seedSchema2 = seedSchema1.replace(
        '-- CREATE ROLE admin_projeto WITH ;',
        `CREATE ROLE admin_projeto WITH SUPERUSER ENCRYPTED PASSWORD 'softo123';`,
      );
      const createSchema = seedSchema2.replace(
        '-- DROP TABLE IF EXISTS',
        'DROP TABLE IF EXISTS',
      );
      await queryRunner.query(createSchema);
      const createSeedSql = FileHelper.read(SEED_SCHEMA_FILE);
      await queryRunner.query(createSeedSql);
      return;
    }
    const createSchemaSql = FileHelper.read(CREATE_SCHEMA_FILE);
    await queryRunner.query(createSchemaSql);

    const createSeedSql = FileHelper.read(SEED_SCHEMA_FILE);
    await queryRunner.query(createSeedSql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      throw new InternalServerErrorException(
        'Rollback available only in development.',
      );
    }
    const deleteSchemaSql = FileHelper.read(DELETE_SCHEMA_FILE);
    await queryRunner.query(deleteSchemaSql);
  }
}
