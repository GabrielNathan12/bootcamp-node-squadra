import { CampusNulos, RequisicaoMalFeita, TipoVarivelInvalida } from "../../configuracoes/helpers/ErrosApi";

export class ExecoesAPIEnderecos{
    public async verificaCampusNulosCriacao(codigoBairro: any, nomeRua: any, numero: any, complemento: any, cep: any){
        if(!codigoBairro){
            throw new CampusNulos('codigoBairro endereco é nulo');
        }
        if(!nomeRua){
            throw new CampusNulos('nomeRua endereco é nulo');
        }
        if(!numero){
            throw new CampusNulos('numero endereco é nulo');
        }
        if(!complemento){
            throw new CampusNulos('complemento endereco é nulo');
        }
        if(!cep){
            throw new CampusNulos('cep endereco é nulo');
        }
    }

    public async verificaTiposDeValoresCriacao(codigoBairro: any, nomeRua: any, numero: any, complemento: any, cep: any){
        if(typeof codigoBairro !== 'number'){
            throw new TipoVarivelInvalida('codigoBairro endereco não é um number');
        }
        if(typeof nomeRua !== 'string'){
            throw new TipoVarivelInvalida('nomeRua endereco não é uma string');
        }
        if(typeof numero !== 'string'){
            throw new TipoVarivelInvalida('numero endereco não é uma string');
        }
        if(typeof complemento !== 'string'){
            throw new TipoVarivelInvalida('complemento endereco não é uma string');
        }
        if(typeof cep !== 'string'){
            throw new TipoVarivelInvalida('cep endereco não é uma string');
        }
    }
    
    public async verificaSeBairroExistePeloCodigoBairro(bairro: any){
        if(bairro === null){
            throw new RequisicaoMalFeita('bairro não encontrado por esse codigo');
        }
    }
}