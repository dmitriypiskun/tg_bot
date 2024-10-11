import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  tgId: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName?: string | null;

  @Column({ nullable: true })
  phone?: string | null;

  @Column({ nullable: true })
  userName?: string | null;

  @Column({ nullable: true })
  language?: string | null;

  @Column({ nullable: true })
  photo?: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
