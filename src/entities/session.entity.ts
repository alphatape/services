import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class Session {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  @Generated('uuid')
  public sessionToken: string;

  @Column({
    unique: true,
    nullable: false,
  })
  public userId: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public expires: Date;
}

export default Session;
