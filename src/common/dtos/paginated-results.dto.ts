import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginatedResults {
  @Expose()
  rows: any;

  @Expose()
  @ApiProperty()
  page: number;

  @Expose()
  @ApiProperty()
  pageSize: number;

  @Expose()
  @ApiProperty()
  count: number;

  @Expose()
  @ApiProperty()
  pageCount?: number;

  @Expose()
  @ApiProperty()
  pageNumberIsGood?: boolean;

  @Expose()
  @ApiProperty()
  hasPreviousPage?: boolean;

  @Expose()
  @ApiProperty()
  hasNextPage?: boolean;

  @Expose()
  @ApiProperty()
  isFirstPage?: boolean;

  @Expose()
  @ApiProperty()
  isLastPage?: boolean;

  @Expose()
  @ApiProperty()
  numberOfFirstItemOnPage?: number;

  @Expose()
  @ApiProperty()
  firstItemOnPage?: number;

  @Expose()
  @ApiProperty()
  numberOfLastItemOnPage?: number;

  @Expose()
  @ApiProperty()
  lastItemOnPage?: number;

  constructor(data: any, count: number, page: number, pageSize: number) {
    this.rows = data;
    this.count = count;
    this.page = page;
    this.pageSize = pageSize;

    this.pageCount =
      this.count > 0
        ? Math.ceil(parseFloat(`${this.count}`) / parseFloat(`${pageSize}`))
        : 0;
    this.pageNumberIsGood =
      this.pageCount > 0 && page - 1 <= this.pageCount - 1 && page - 1 >= 0;
    this.hasPreviousPage = this.pageNumberIsGood && page - 1 > 0;
    this.hasNextPage = this.pageNumberIsGood && page < this.pageCount;
    this.isFirstPage = this.pageNumberIsGood && page - 1 === 0;
    this.isLastPage = this.pageNumberIsGood && page === this.pageCount;
    this.numberOfFirstItemOnPage = this.pageNumberIsGood
      ? (page - 1) * pageSize
      : 0;
    this.firstItemOnPage = this.pageNumberIsGood
      ? this.numberOfFirstItemOnPage
      : 0;
    this.numberOfLastItemOnPage = this.pageNumberIsGood
      ? this.numberOfFirstItemOnPage + this.rows.length - 1
      : 0;
    this.lastItemOnPage = this.pageNumberIsGood ? this.count - 1 : 0;
  }
}
