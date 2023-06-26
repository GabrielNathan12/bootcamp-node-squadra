import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Endereco } from "./Endereco";

@Entity('TB_PESSOA')
    export class Pessoa{
        @PrimaryGeneratedColumn({name: 'CODIGO_PESSOA', type: 'int'})
            CODIGO_PESSOA: number;
        @Column({name:'NOME', type: 'varchar'})
            NOME: string;
        @Column({name: 'SOBRENOME', type: 'varchar'})
            SOBRENOME: string;
        @Column({name: 'IDADE', type: 'int'})
            IDADE: number;
        @Column({name: 'DATA_NASC', type: 'date'})
            DATA_NASC: Date;
        @Column({name: 'LOGIN', type:'varchar'})
            LOGIN: string;
        @Column({name:'SENHA', type: 'varchar'})
            SENHA: string;
        @Column({name: 'STATUS', type: 'int'})
            STATUS: number;
        @OneToMany(() => Endereco, (endereco) => endereco.PESSOA)
            ENDERECOS: Endereco[];

}