import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";

import {UF} from './UF';
import { Bairro } from "./Bairro";

@Entity('TB_MUNICIPIO')
    export class Municipio{
        @PrimaryGeneratedColumn({name: 'CODIGO_MUNICIPIO', type:'int'})
            codigoMunicipio: number;
        
        @ManyToOne(() => UF, (codigoUF) => codigoUF.municipios,{onDelete:"CASCADE"})
        @JoinColumn({name: 'Codigo_UF'})
            codigoUF: UF;
        @Column({name: 'NOME', type:'varchar'})
            nome: string;
        @Column({name: 'STATUS', type:'int'})
            status: number;
        @OneToMany(() => Bairro, (bairro) => bairro.codigoMunicipio)
            bairros: Bairro[];

    }

