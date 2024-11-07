import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Department } from "./Department";


@Entity()
export class University{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Department, (department) => department.university)
    departments: Department[]
}