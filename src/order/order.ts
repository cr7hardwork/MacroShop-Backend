import { IsPositive } from 'class-validator';
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

  @IsPositive()
  @Column({ allowNull: false })
  ghzinform: number;

  @IsPositive()
  @Column({ allowNull: false, type: DataType.FLOAT })
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
