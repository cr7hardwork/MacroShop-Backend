import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table({tableName : 'reviews',timestamps : true})
export class Reviews extends Model<Reviews>{

@AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;


  @Column
  username: string;

  @Column
  text: string

  @Column
  createdAt: Date
}