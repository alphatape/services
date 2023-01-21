import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Account {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public userId: number;

  @Column()
  public type: string;

  @Column()
  public provider: string;

  @Column()
  public providerAccountId: string;

  @Column()
  public refresh_token: string;

  @Column()
  public access_token: string;

  @Column()
  public expires_at: number;

  @Column()
  public token_type: string;

  @Column()
  public scope: string;

  @Column()
  public id_token: string;

  @Column()
  public session_state: string;

  @Column()
  public oauth_token_secret: string;

  @Column()
  public oauth_token: string;
}

export default Account;
