import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Bairro } from "./Bairro";
import { Pessoa } from "./Pessoa";


@Entity('TB_ENDERECO')

    export class Endereco{
        @PrimaryGeneratedColumn({name:'CODIGO_ENDERECO', type:'int'})
            codigoEndereco: number;
        
        @ManyToOne(()=> Pessoa, (pessoa) => pessoa.enderecos,{onDelete:"CASCADE"})
        @JoinColumn({name: 'CODIGO_PESSOA'})
            pessoa: Pessoa;
        
        @ManyToOne(() => Bairro, (bairro) => bairro.enderecos,{onDelete:"CASCADE"})
        @JoinColumn({name: 'CODIGO_BAIRRO'})
            bairro: Bairro;
        
        @Column({name: 'NOME_RUA', type: 'varchar'})
            nomeRua: string;
        
        @Column({name: 'NUMERO', type: 'varchar'})
            numero: Number;
        
        @Column({name:'COMPLEMENTO', type: 'varchar'})
            complemento: string;
        
        @Column({name: 'CEP', type:'varchar'})
            cep: string;
    }

