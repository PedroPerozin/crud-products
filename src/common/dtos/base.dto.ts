import {
  ClassConstructor,
  classToClass,
  plainToClass,
} from 'class-transformer';

export abstract class BaseDto {
  public static factory<T, R>(
    ResponseDto: ClassConstructor<T>,
    plainTResponseData: R,
  ): T {
    const updatedResponseData = plainToClass<T, R>(
      ResponseDto,
      plainTResponseData,
      {
        ignoreDecorators: true,
      },
    );

    return classToClass(updatedResponseData, { excludeExtraneousValues: true });
  }
}
