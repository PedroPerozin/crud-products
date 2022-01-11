import { join } from 'path';

const SCRIPTS_FOLDER = join(__dirname, '..', 'scripts');

export const CREATE_SCHEMA_FILE = `${SCRIPTS_FOLDER}/001-create-schema.sql`;
export const DELETE_SCHEMA_FILE = `${SCRIPTS_FOLDER}/001-delete-schema.sql`;
export const SEED_SCHEMA_FILE = `${SCRIPTS_FOLDER}/001-seed-schema.sql`;