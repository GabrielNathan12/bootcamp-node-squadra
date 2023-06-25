import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Endereco } from "./Endereco";

@Entity('Tb_Pessoa')
    export class Pessoa{
        @PrimaryGeneratedColumn({name: 'Codigo_Pessoa', type: 'int'})
            Codigo_Pessoa: number;
        @Column({name:'Nome', type: 'varchar'})
            Nome_Pessoa: string;
        @Column({name: 'Sobrenome', type: 'varchar'})
            Sobrenome: string;
        @Column({name: 'Idade', type: 'int'})
            Idade: number;
        @Column({name: 'Data_Nasc', type: 'date'})
            Data_Nasc: Date;
        @Column({name: 'Login', type:'varchar'})
            Login: string;
        @Column({name:'Senha', type: 'varchar'})
            Senha: string;
        @Column({name: 'Status', type: 'int'})
            Status: number;
        @OneToMany(() => Endereco, (endereco) => endereco.Codigo_Endereco)
            Enderecos: Endereco[];

}