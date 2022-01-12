import {
  BaseEntity as TypeOrmBaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

export class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryColumn('uuid', { primary: true, name: 'id' })
  id: string = uuid();

  @Generated('increment')
  @Column({ type: 'bigint', name: 'alternativeid' })
  alternativeId: number;

  @CreateDateColumn({ name: 'createddate', type: 'timestamp with time zone' })
  createdDate = new Date(new Date().toUTCString());

  @UpdateDateColumn({
    name: 'updateddate',
    nullable: true,
    type: 'timestamp with time zone',
  })
  updatedDate?: Date;

  @DeleteDateColumn({
    name: 'deleteddate',
    nullable: true,
    type: 'timestamp with time zone',
  })
  deletedDate?: Date;
}
