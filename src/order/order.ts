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
  Max,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/user';

@Table({ tableName: 'order', timestamps: false })
export class Order extends Model<Order> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @IsPositive()
  @Max(500)
  @Column({
    allowNull: false,
    validate: { min: 0, max: 500 },
  })
  ghzinform: number;

  @IsPositive()
  @Column({
    allowNull: false,
    type: DataType.FLOAT,
    validate: { min: 0 },
  })
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

  @Column(DataType.STRING)
  url: string;
}
