import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Bairro } from "./Bairro";
import { Pessoa } from "./Pessoa";


@Entity('Tb_Endereco')
    export class Endereco{
        @PrimaryGeneratedColumn({name:'Codigo_Endereco', type:'int'})
            Codigo_Endereco: number;
        
        @Column({name: 'Nome_Rua', type: 'varchar'})
            Nome_Rua: string;
        
        @Column({name:'Complemento', type: 'varchar', nullable: true})
            Complemento: string;
        
        @Column({name: 'CEP', type:'varchar'})
            CEP: string;
        @Column({name: 'Status', type:'number'})
            Status: number;
        
        @ManyToOne(()=> Pessoa, (pessoa) => pessoa.Codigo_Pessoa)
            @JoinColumn({name: 'Nome_Pessoa'})
                pessoa: Pessoa;
        @ManyToOne(() => Bairro, (bairro) => bairro.Codigo_Bairro)
            @JoinColumn({name: 'Codigo_Bairro'})
                bairro: Bairro;
    }
