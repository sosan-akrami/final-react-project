import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Specialization } from "./Specialization";


@Entity()
export class Student{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    lastName: string

    @Column()
    email: string
    
    @ManyToOne(() => Specialization, (specialization) => specialization.students)
    specialization : Specialization
}