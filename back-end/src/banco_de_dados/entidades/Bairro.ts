import { Entity, Column, PrimaryGeneratedColumn  ,JoinColumn, ManyToOne, OneToMany, Unique } from "typeorm";
import { Municipio } from "./Municipio";
import { Endereco } from "./Endereco";

@Entity('TB_BAIRRO')
@Unique(['municipio', 'nome'])
    export class Bairro{
        @PrimaryGeneratedColumn({name: 'CODIGO_BAIRRO', type: 'int'})
            codigoBairro: number;
        @ManyToOne(() => Municipio, (municipio) => municipio.bairros,{onDelete:"CASCADE"})
        @JoinColumn({name:'CODIGO_MUNICIPIO'})
            municipio: Municipio;
        @Column({name: 'NOME', type:'varchar'})
            nome: string;
        @Column({name: 'STATUS', type:'int'})
            status: number;
        @OneToMany(() => Endereco, (endereco) => endereco.bairro)
            enderecos: Endereco[];
    }
