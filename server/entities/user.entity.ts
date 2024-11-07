import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    OneToMany,
    ManyToMany,
    JoinTable,
    BeforeUpdate,
} from 'typeorm';


@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 30 })
    fullName!: string;

    @Column({ unique: true, length: 15 })
    username: string;

    @Column({ unique: true, length: 30 })
    email!: string;

    @Column({ select: false }) // typeorm package
    password!: string;

    @Column({ default: false })
    isAdmin!: boolean; // true or false

    @Column({ default: true })
    active: boolean;

    @Column({ nullable: true }) // typeorm package
    avatar!: string;


    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;

}