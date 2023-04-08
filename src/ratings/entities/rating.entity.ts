import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from '../../coffees/entities/coffee.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column({ default: null })
  comments: string;

  @ManyToOne(() => Coffee, (coffee) => coffee, { onDelete: 'CASCADE' })
  coffee: Coffee;
}
