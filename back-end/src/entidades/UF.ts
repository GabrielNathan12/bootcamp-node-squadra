import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

import {Municipio} from './Municipio';

@Entity('TB_UF')
    export class UF{
        @PrimaryGeneratedColumn({name: 'CODIGO_UF', type: 'int'})
            CODIGO_UF: number;
        
        @Column({name: 'SIGLA', type:'varchar2'})
            SIGLA: string;
        
        @Column({name:'NOME', type:'varchar'})
            NOME:string;
        
        @Column({name:'STATUS', type:'int'})
            STATUS: number;
        
        @OneToMany(() => Municipio, (municipio) => municipio.CODIGO_UF)
            MUNICIPIOS: Municipio[];
    }