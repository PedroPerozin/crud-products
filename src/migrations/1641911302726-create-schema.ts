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
