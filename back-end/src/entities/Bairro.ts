import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { Municipio } from "./Municipio";

@Entity('Tb_Bairro')
    export class Bairro{
        @PrimaryGeneratedColumn({name: 'Codigo_Bairro', type: 'int'})
            Codigo_Bairro: number;
        @Column({name: 'Codigo_Municipio', type: 'int'})
            Codigo_Municipio: number;
        @Column({name: 'Nome_Bairro', type:'varchar'})
            Nome_Bairro: string;
        @Column({name: 'Status', type:'int'})
            Status: number;
        @ManyToOne(() => Municipio, (municipio) => municipio.Bairros)
            @JoinColumn({name:'Codigo_Municipio'})
                Municipios: Municipio
    }