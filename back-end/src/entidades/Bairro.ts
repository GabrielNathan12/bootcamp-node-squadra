import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { Municipio } from "./Municipio";
import { Endereco } from "./Endereco";

@Entity('TB_BAIRRO')
    export class Bairro{
        @PrimaryGeneratedColumn({name: 'CODIGO_BAIRRO', type: 'int'})
            codigoBairro: number;
        @ManyToOne(() => Municipio, (municipio) => municipio.bairros)
        @JoinColumn({name:'CODIGO_MUNICIPIO'})
            codigoMunicipio: Municipio;
        @Column({name: 'NOME', type:'varchar'})
            nome: string;
        @Column({name: 'STATUS', type:'int'})
            status: number;
        @ManyToOne(() => Endereco, (endereco) => endereco.bairro)
            enderecos: Endereco[];
    }