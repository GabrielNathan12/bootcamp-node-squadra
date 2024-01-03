import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, Unique } from "typeorm";

import {UF} from './UF';
import { Bairro } from "./Bairro";

@Entity('TB_MUNICIPIO')
@Unique(['uf', 'nome'])
    export class Municipio{
        @PrimaryGeneratedColumn({name: 'CODIGO_MUNICIPIO', type:'int'})
            codigoMunicipio: number;
        
        @ManyToOne(() => UF, (codigoUF) => codigoUF.municipios,{onDelete:"CASCADE"})
        @JoinColumn({name: 'CODIGO_UF'})
            uf: UF;
        @Column({name: 'NOME', type:'varchar'})
            nome: string;
        @Column({name: 'STATUS', type:'int'})
            status: number;
        @OneToMany(() => Bairro, (bairro) => bairro.municipio)
            bairros: Bairro[];

    }

