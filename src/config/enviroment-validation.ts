import { plainToClass } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  PORT: number;

  @IsNotEmpty()
  URL_BACKEND: string;

  @IsNotEmpty()
  URL_FRONTEND: string;

  @IsString()
  @IsNotEmpty()
  PWD: string;

  @IsBoolean()
  @IsNotEmpty()
  TYPEORM_LOGGING: boolean;

  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsString()
  @IsNotEmpty()
  DB_USER: string;

  @IsString()
  @IsNotEmpty()
  DB_PASS: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  DB_PORT?: number;

  @IsString()
  @IsNotEmpty()
  DB_HOST_TEST: string;

  @IsString()
  @IsNotEmpty()
  DB_USER_TEST: string;

  @IsString()
  @IsNotEmpty()
  DB_PASS_TEST: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME_TEST: string;

  @IsString()
  @IsNotEmpty()
  DB_PORT_TEST: string;

  @IsBoolean()
  @IsNotEmpty()
  STATUS: boolean;

  @IsString()
  @IsOptional()
  AWS_ACCESS_KEY_ID: string;

  @IsString()
  @IsOptional()
  AWS_SECRET_ACCESS_KEY: string;

  @IsString()
  @IsOptional()
  AWS_S3_REGION: string;

  @IsString()
  @IsOptional()
  AWS_S3_BUCKET_NAME: string;

  @IsOptional()
  @IsString()
  MAILER_HOST: string;

  @IsOptional()
  @IsInt()
  MAILER_PORT: number;

  @IsOptional()
  @IsString()
  MAILER_USER: string;

  @IsOptional()
  @IsString()
  MAILER_PASS: string;

  @IsOptional()
  @IsString()
  MAILER_FROM: string;

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  FASTIFY_LIMITS_FIELD_SIZE: number;

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  FASTIFY_LIMITS_FILE_SIZE: number;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET_EXPIRES_IN: string;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET_REFRESHTOKEN: string;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET_REFRESHTOKEN_EXPIRES_IN: string;

  @IsNotEmpty()
  @IsNumber()
  HASH_ROUNDS: number;

  @IsNotEmpty()
  @IsNumber()
  ACCESS_FAILS_LIMIT: number;

  @IsNotEmpty()
  @IsNumber()
  ACCESS_BLOCKED_FOR_MINUTES: number;
}

export const validate = (
  config: Record<string, unknown>,
): EnvironmentVariables => {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
