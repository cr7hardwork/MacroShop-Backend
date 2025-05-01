import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/modules/user/user";


@Table({tableName : 'reviews',timestamps : true})
export class Reviews extends Model<Reviews>{

@AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;


  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id : number


  @BelongsTo(() => User)
  user : User

  @Column(DataType.TEXT)
  text: string

}