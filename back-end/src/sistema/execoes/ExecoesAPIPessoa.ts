import { CampusNulos, TipoVarivelInvalida } from "../../configuracoes/helpers/ErrosApi";

export class ExecoesAPIPessoa{
    
    public async verificaCampusNulosCriacao(nome: any, sobrenome: any, idade: any, login: any, senha: any, status: any){
        if(!nome){
            throw new CampusNulos('nome pessoa é nulo');
        }
        if(!sobrenome){
            throw new CampusNulos('sobrenome pessoa é nulo');
        }
        if(!idade){
            throw new CampusNulos('idade pessoa é nulo');
        }
        if(!login){
            throw new CampusNulos('login pessoa é nulo');
        }
        if(!senha){
            throw new CampusNulos('senha pessoa é nulo');
        }
        if(!status){
            throw new CampusNulos('status pessoa é nulo');
        }
    }

    public async verificaTiposDeValoresCriacao(nome: any, sobrenome: any, idade: any, login: any, senha: any, status: any){

        if(typeof nome !== 'string'){
            throw new TipoVarivelInvalida('nome pessoa não é uma string');
        }
        if(typeof sobrenome !== 'string'){
            throw new TipoVarivelInvalida('sobrenome pessoa não é uma string');
        }
        if(typeof idade !== 'number'){
            throw new TipoVarivelInvalida('idade pessoa não é um number');
        }
        if(typeof login !== 'string'){
            throw new TipoVarivelInvalida('login pessoa não é uma string');
        }
        if(typeof senha !== 'string'){
            throw new TipoVarivelInvalida('senha pessoa não é uma string');
        }
        if(typeof status !== 'number'){
            throw new TipoVarivelInvalida('status pessoa não é uma number');
        }
        if(status !== 1 && status !== 2){
            throw new TipoVarivelInvalida('status pessoa não é um valor válido');
        }
    }
}