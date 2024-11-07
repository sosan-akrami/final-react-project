import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { University } from "./University";
import { Specialization } from "./Specialization";


@Entity()
export class Department{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @ManyToOne(() => University, (university) => university.departments)
    university: University

    @OneToMany(() => Specialization, (specialization) => specialization.department)
    specializations: Specialization[]
}