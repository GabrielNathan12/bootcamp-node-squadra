import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Bairro } from "./Bairro";
import { Pessoa } from "./Pessoa";


@Entity('Tb_Endereco')
    export class Endereco{
        @PrimaryGeneratedColumn({name:'Codigo_Endereco', type:'int'})
            Codigo_Endereco: number;
        @Column({name: 'Codigo_Pessoa', type:'int'})
            Codigo_Pessoa: number;
        
        @Column({name:'Codigo_Bairro', type:'int'})
            Codigo_Bairro: number;
        
        @Column({name: 'Nome_Rua', type: 'varchar'})
            Nome_Rua: string;
        
        @Column({name: 'Numero', type:'int'})
            Numero_Rua: number;
        
        @Column({name:'Complemento', type: 'varchar', nullable: true})
            Complemento: string;
        
        @Column({name: 'CEP', type:'varchar'})
            CEP: string;
        
        @ManyToOne(()=> Pessoa, (pessoa) => pessoa.Enderecos)
            @JoinColumn({name: 'Nome_Pessoa'})
                pessoa: Pessoa;
        @ManyToOne(() => Bairro, (bairro) => bairro.Municipios)
            @JoinColumn({name: 'Codigo_Bairro'})
                bairro: Bairro;
    }
