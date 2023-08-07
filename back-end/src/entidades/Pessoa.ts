import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Endereco } from "./Endereco";

@Entity('TB_PESSOA')
    export class Pessoa{
        @PrimaryGeneratedColumn({name: 'CODIGO_PESSOA', type: 'int'})
            codigoPessoa: number;
        @Column({name:'NOME', type: 'varchar'})
            nome: string;
        @Column({name: 'SOBRENOME', type: 'varchar'})
            sobrenome: string;
        @Column({name: 'IDADE', type: 'int'})
            idade: number;
        @Column({name: 'LOGIN', type:'varchar'})
            login: string;
        @Column({name:'SENHA', type: 'varchar'})
            senha: string;
        @Column({name: 'STATUS', type: 'int'})
            status: number;
        @OneToMany(() => Endereco, (endereco) => endereco.pessoa)
            enderecos: Endereco[];

}