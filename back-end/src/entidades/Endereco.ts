import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Bairro } from "./Bairro";
import { Pessoa } from "./Pessoa";


@Entity('TB_ENDERECO')
    export class Endereco{
        @PrimaryGeneratedColumn({name:'CODIGO_ENDERECO', type:'int'})
            CODIGO_ENDERECO: number;
        
        @ManyToOne(()=> Pessoa, (pessoa) => pessoa.ENDERECOS)
        @JoinColumn({name: 'CODIGO_PESSOA'})
            PESSOA: Pessoa;
        
        @OneToOne(() => Bairro, (bairro) => bairro.ENDERECOS)
        @JoinColumn({name: 'CODIGO_BAIRRO'})
            BAIRRO: Bairro;
        
        @Column({name: 'NOME_RUA', type: 'varchar'})
            NOME_RUA: string;
        
        @Column({name: 'NUMERO', type: 'number'})
            NUMERO: Number;
        
        @Column({name:'COMPLEMENTO', type: 'varchar', nullable: true})
            COMPLEMENTO: string;
        
        @Column({name: 'CEP', type:'varchar'})
            CEP: string;
        @Column({name: 'Status', type:'number'})
            STATUS: number;
    }
