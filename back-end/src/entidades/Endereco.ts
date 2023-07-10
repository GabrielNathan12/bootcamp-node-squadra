import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Bairro } from "./Bairro";
import { Pessoa } from "./Pessoa";


@Entity('TB_ENDERECO')
    export class Endereco{
        @PrimaryGeneratedColumn({name:'CODIGO_ENDERECO', type:'int'})
            codigoEndereco: number;
        
        @ManyToOne(()=> Pessoa, (pessoa) => pessoa.enderecos)
        @JoinColumn({name: 'CODIGO_PESSOA'})
            codigoPessoa: Pessoa;
        
        @ManyToOne(() => Bairro, (bairro) => bairro.enderecos)
        @JoinColumn({name: 'CODIGO_BAIRRO'})
            codigoBairro: Bairro;
        
        @Column({name: 'NOME_RUA', type: 'varchar'})
            nomeRua: string;
        
        @Column({name: 'NUMERO', type: 'number'})
            numero: Number;
        
        @Column({name:'COMPLEMENTO', type: 'varchar'})
            complemento: string;
        
        @Column({name: 'CEP', type:'varchar'})
            cep: string;
        @Column({name: 'STATUS', type:'number'})
            status: number;
    }
