import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Index } from 'typeorm/decorator/Index';
import { BaseEntity } from '../../common/entities/base.entity';

@Index('pk_products', ['id'], { unique: true })
@Index('fk_user_products', ['userId'], {})
@Entity('products', { schema: 'public' })
export class ProductsEntity extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @Column('character varying', { name: 'price' })
  price: Float32Array;

  @Column('character varying', { name: 'email', length: 300 })
  email: string;

  @ManyToOne(() => UserEntity, (user) => user.products)
  user: UserEntity;
}
