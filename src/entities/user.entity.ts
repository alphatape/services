import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({
    nullable: true,
  })
  public firstName: string;

  @Column({
    nullable: true,
  })
  public lastName: string;

  @Column({
    unique: true,
    nullable: false,
  })
  public email: string;

  @Column({
    nullable: true,
  })
  public image: string;

  @UpdateDateColumn({
    nullable: true,
  })
  public emailVerified: Date;
}

export default User;
