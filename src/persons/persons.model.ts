import { 
    BelongsToMany, 
    Column, 
    DataType, 
    Model, 
    Table } from "sequelize-typescript";
import { Profession } from "../professions/professions.model";
import { ProfessionPerson } from "./professionPerson.model";


@Table({tableName: 'person', createdAt: false, updatedAt: false})
export class Person extends Model<Person> {

    @Column({ type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true })
    personKinopoiskId: number;

    @Column({ type: DataType.STRING(255)})
    photoLink: string;

    @Column({ type: DataType.STRING(255)})
    name: string;
    
    @Column({ type: DataType.STRING(255)})
    nameEng: string;

    @BelongsToMany( () => Profession, () => ProfessionPerson)
    professions: Profession[];
}

