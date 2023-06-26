import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";

import {UF} from './UF';
import { Bairro } from "./Bairro";

@Entity('TB_MUNICIPIO')

    export class Municipio{
        @PrimaryGeneratedColumn({name: 'CODIGO_MUNICIPIO', type:'int'})
            CODIGO_MUNICIPIO: number;
        
        @ManyToOne(() => UF, (codigoUF) => codigoUF.MUNICIPIOS)
        @JoinColumn({name: 'Codigo_UF'})
            CODIGO_UF: UF;
        @Column({name: 'NOME', type:'varchar'})
            NOME: string;
        @Column({name: 'STATUS', type:'int'})
            STATUS: number;
        @OneToMany(() => Bairro, (bairro) => bairro.CODIGO_MUNICIPIO)
            BAIRROS: Bairro[];

    }