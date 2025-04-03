import { Column, DataType, Table, Unique, Model } from 'sequelize-typescript';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Table({ tableName: 'user' })
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  userName: string;

  @Unique({
    name: 'email',
    msg: 'This email is already registered, please sign in',
  })
  @Column({ type: DataType.STRING(50), allowNull: false })
  email: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  password: string;

  @Column({
    type: DataType.ENUM(...Object.values(Role)),
    allowNull: false,
    defaultValue: Role.USER,
  })
  role: Role;
}
