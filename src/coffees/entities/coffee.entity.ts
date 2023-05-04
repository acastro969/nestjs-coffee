import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';
import { Rating } from '../../ratings/entities/rating.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn() // Marks the property as a Column and makes it auto incremental
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @OneToMany(() => Rating, (rating) => rating.coffee)
  ratings: Rating[];

  @JoinTable() // Specifies the owner side of the relationship
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors: Flavor[];
}
