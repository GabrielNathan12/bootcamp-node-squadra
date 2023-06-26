import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Municipio } from "./Municipio";
import { Endereco } from "./Endereco";

@Entity('Tb_BaiTB_BAIRRO')
    export class Bairro{
        @PrimaryGeneratedColumn({name: 'CODIGO_BAIRRO', type: 'int'})
            CODIGO_BAIRRO: number;
        @ManyToOne(() => Municipio, (municipio) => municipio.BAIRROS)
        @JoinColumn({name:'CODIGO_MUNICIPIO'})
            CODIGO_MUNICIPIO: Municipio;
        @Column({name: 'NOME', type:'varchar'})
            NOME: string;
        @Column({name: 'STATUS', type:'int'})
            STATUS: number;
        @OneToOne(() => Endereco, (endereco) => endereco.BAIRRO)
            ENDERECOS: Endereco;
    }