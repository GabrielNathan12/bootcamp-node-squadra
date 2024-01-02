import { CampusNulos, DadosDuplicados, RequisicaoMalFeita, TipoVarivelInvalida } from "../../configuracoes/helpers/ErrosApi";

export class ExecoesAPIUF{

    public async verificarCampusNulosCriacao(uf:any){
        const {nome, sigla, status} = uf;

        if(!nome){
            throw new CampusNulos("Campo nome uf é nulo");
        }
        if(!sigla){
            throw new CampusNulos("Campo sigla uf é nulo");
        }
        if(!status){
            throw new CampusNulos("Campo status uf é nulo");
        }
    }

    public async vericartiposDeValoresCriacao(uf:any){
        const {nome, sigla, status} = uf;

        if(typeof nome !== "string"){
            throw new TipoVarivelInvalida("Campo nome uf, não é uma string");
        }
        
        if(typeof sigla !== "string"){
            throw new TipoVarivelInvalida("Campo sigla uf, não é uma string");
        }

        if(sigla.length !== 2){
            throw new TipoVarivelInvalida("Campo sigla uf, possui mais de 2 caracteres");
        }

        if(typeof status !== "number"){
            throw new TipoVarivelInvalida("Campo status uf, não é uma string");
        }

        if(status != 1 && status != 2){
            throw new TipoVarivelInvalida("Campo status uf, não é um valor válido");
        }
    }
    
    public async verificarDuplicadasCriacao(nome: any, sigla: any){
        if(nome !== null){
            throw new DadosDuplicados("Campo nome já está registrado");
        }
        if(sigla !== null){
            throw new DadosDuplicados("Campo sigla já está registrado");
        }
    }

    public async verificarParametrosValidos(parametros: any){
        const chaves = ['codigoUF', 'nome', 'sigla', 'status'];

        for(const chave in parametros){
            if(!chaves.includes(chave)){
                throw new RequisicaoMalFeita("Paramêtro não encontrado");
            }
        }

        if(parametros.sigla && parametros.sigla.length !== 2){
            throw new RequisicaoMalFeita("Sigla buscada não possui 2 caracteres");
        }
    }

    public async verificarCampusNulosAtualizacao(){

    }
    public async verificarDuplicadasAtualizacao(){

    }
}