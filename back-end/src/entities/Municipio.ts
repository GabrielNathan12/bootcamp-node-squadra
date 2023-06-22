import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinColumn } from "typeorm";

import {UF} from './UF';
import { Bairro } from "./Bairro";

@Entity('Tb_Municipio')

    export class Municipio{
        @PrimaryGeneratedColumn({name: 'Codigo_Municipio', type:'int'})
            Codigo_Municipio: number;
        
        @Column({name: 'Codigo_UF', type: 'int'})
            Codigo_UF: number;
        @Column({name: 'Nome', type:'varchar'})
            Nome: string;
        @Column({name: 'Status', type:'int'})
            Status: number;
        @ManyToMany(() => UF, (codigoUF) => codigoUF.Municipios)
            @JoinColumn({name: 'Codigo_UF'})
            codigoUF: UF;
        
        @OneToMany(() => Bairro, (bairro) => bairro.Municipios)
            Bairros: Bairro[];

    }