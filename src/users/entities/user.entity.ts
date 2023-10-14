import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    UserId: number;
    @Column()
    UserName: string;
    @Column()
    Tel: string;
    @Column()
    Password: string;
    @CreateDateColumn()
    Create_at: Date;
    @UpdateDateColumn()
    Update_at: Date;
    @DeleteDateColumn()
    Delete_at: Date;
}
