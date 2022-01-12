import { ProductsEntity } from 'src/products/entities/products.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Index('pk_users', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class UserEntity extends BaseEntity {
  @Column('character varying', { name: 'firstname', length: 200 })
  firstName: string;

  @Column('character varying', { name: 'lastname', length: 200 })
  lastName: string;

  @Column('character varying', { name: 'email', length: 300 })
  email: string;

  @Column('character varying', { name: 'passwordhash', nullable: true })
  passwordHash: string | null;

  @OneToMany(() => ProductsEntity, (products) => products.user)
  products: ProductsEntity[];
}
