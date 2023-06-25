import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";

import {UF} from './UF';
import { Bairro } from "./Bairro";

@Entity('Tb_Municipio')

    export class Municipio{
        @PrimaryGeneratedColumn({name: 'Codigo_Municipio', type:'int'})
            Codigo_Municipio: number;

        @Column({name: 'Nome', type:'varchar'})
            Nome: string;
        @Column({name: 'Status', type:'int'})
            Status: number;
        @ManyToOne(() => UF, (codigoUF) => codigoUF.Municipios)
            @JoinColumn({name: 'Codigo_UF'})
                codigo_UF: UF;
        
        @OneToMany(() => Bairro, (bairro) => bairro.Codigo_Municipio)
            Bairros: Bairro[];

    }