import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Bairro } from "./Bairro";
import { Pessoa } from "./Pessoa";


@Entity('TB_ENDERECO')
    export class Endereco{
        @PrimaryGeneratedColumn({name:'CODIGO_ENDERECO', type:'int'})
            codigoEndereco: number;
        
        @ManyToOne(()=> Pessoa, (pessoa) => pessoa.enderecos)
        @JoinColumn({name: 'CODIGO_PESSOA'})
            pessoa: Pessoa;
        
        @OneToOne(() => Bairro, (bairro) => bairro.enderecos)
        @JoinColumn({name: 'CODIGO_BAIRRO'})
            bairro: Bairro;
        
        @Column({name: 'NOME_RUA', type: 'varchar'})
            nomeRua: string;
        
        @Column({name: 'NUMERO', type: 'number'})
            numero: Number;
        
        @Column({name:'COMPLEMENTO', type: 'varchar', nullable: true})
            complemento: string;
        
        @Column({name: 'CEP', type:'varchar'})
            cep: string;
        @Column({name: 'Status', type:'number'})
            status: number;
    }
