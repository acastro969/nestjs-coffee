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
  @PrimaryGeneratedColumn() // Marca la propiedad como Columna y la hace autoincremental
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @OneToMany(() => Rating, (rating) => rating.coffee)
  ratings: Rating[];

  @JoinTable() // Especifica el lado propietario de la relación
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors: Flavor[];
}
