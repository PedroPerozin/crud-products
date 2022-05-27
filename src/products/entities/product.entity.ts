import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Index } from 'typeorm/decorator/Index';
import { BaseEntity } from '../../common/entities/base.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Index('pk_products', ['id'], { unique: true })
@Entity('products', { schema: 'public' })
export class ProductEntity extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @Column('character varying', { name: 'price' })
  price: number;

  @Column('uuid', { name: 'userid' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.products, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'userid', referencedColumnName: 'id' }])
  user: UserEntity;
}
