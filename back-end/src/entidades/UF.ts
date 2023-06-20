import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_UF')
    export class UF {
        @PrimaryGeneratedColumn({type:number})
            Codigo_UF: number;
        @Column({type:'string'})
            Sigla: string;
        @Column({type:'string'})
            Nome: string;
        @Column({type:number})
            Status: number;
        
    }