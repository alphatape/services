import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class VerificationToken {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({
    unique: true,
    nullable: false,
  })
  public identifier: number;

  @Column()
  public token: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public expires: Date;
}

export default VerificationToken;
