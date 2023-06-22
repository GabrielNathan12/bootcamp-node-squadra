import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

import {Municipio} from './Municipio';

@Entity('Tb_UF')
    export class UF{
        @PrimaryGeneratedColumn({name: 'Codigo_UF', type: 'int'})
            Codigo_UF: number;
        
        @Column({name: 'Sigla', type:'varchar2'})
            Sigla: string;
        
        @Column({name:'Nome_Municipio', type:'varchar'})
            Nome:string;
        
        @Column({name:'Status', type:'int'})
            Status: number;
        
        @OneToMany(() => Municipio, (municipio) => municipio.Codigo_UF)
            Municipios: Municipio[];
    }