import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

// @Entity()
@Unique(['filename'])
export class Camera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 38
  })
  total_parking: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
