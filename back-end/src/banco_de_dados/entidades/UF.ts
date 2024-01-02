import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique} from 'typeorm';

import {Municipio} from './Municipio';

@Entity('TB_UF')
@Unique(['sigla'])
@Unique(['nome'])
    export class UF{
        @PrimaryGeneratedColumn({name: 'CODIGO_UF', type: 'int'})
            codigoUF: number;
        
        @Column({name: 'SIGLA', type:'varchar2'})
            sigla: string;
        
        @Column({name:'NOME', type:'varchar'})
            nome:string;
        
        @Column({name:'STATUS', type:'int'})
            status: number;
        
        @OneToMany(() => Municipio, (municipio) => municipio.uf)
            municipios: Municipio[];
    }