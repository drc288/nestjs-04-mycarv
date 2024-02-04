import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;
}