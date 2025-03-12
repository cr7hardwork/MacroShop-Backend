import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/user';

@Table({ tableName: 'order', timestamps: false })
export class Order extends Model<Order> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Column({ allowNull: false })
  ghzinform: number;

  @Column({ allowNull: false })
  sensity: number;

  @Column({ allowNull: false })
  macroVariantSpeed: string;

  @Column({ allowNull: false })
  whichWeapon: string;

  @ForeignKey(() => User)
  @Column
  owner_id: number;

  @BelongsTo(() => User, { foreignKey: 'owner_id' })
  owner: User;
}
