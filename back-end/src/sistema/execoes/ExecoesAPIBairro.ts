import { CampusNulos, RequisicaoMalFeita, TipoVarivelInvalida } from "../../configuracoes/helpers/ErrosApi";

export class ExecoesAPIBairro{

    public async verificarCampusNulosCriacao(bairro: any){
        const {nome, codigoMunicipio, status} = bairro;

        if(!nome){
            throw new CampusNulos('Campo nome Bairro é nulo');
        }
        if(!codigoMunicipio){
            throw new CampusNulos('Campo codigoMunicipio é nulo');
        }
        if(!status){
            throw new CampusNulos('Campo status bairro é nulo');
        }
    }
    
    public async verificarTiposDeValoresCriacao(bairro: any){
        const {nome, codigoMunicipio, status} = bairro;

        if(typeof nome !== "string"){
            throw new TipoVarivelInvalida("Campo nome bairro, não é uma string");
        }
        
        if(typeof codigoMunicipio !== "number"){
            throw new TipoVarivelInvalida("Campo codigoMunicipio bairro, não é um number");
        }

        if(typeof status !== "number"){
            throw new TipoVarivelInvalida("Campo status bairro, não é uma string");
        }

        if(status != 1 && status != 2){
            throw new TipoVarivelInvalida("Campo status bairro, não é um valor válido");
        }
    }

    public async existeMunicipioPeloCodigoMunicipio(municipio: any){
        if(municipio === null){
            throw new RequisicaoMalFeita('Não existe esse codigoMunicipio registrado');
        }
    }

    public async existeDuplicadaBairro(bairro: any){
        if(bairro !== null && bairro !== undefined){
            throw new RequisicaoMalFeita('Existe já um bairro com o mesmo nome registrado nesse municipio');
        }
    }

    public async verificarCampusNulosAtualizacao(bairro: any){
        const {codigoBairro ,nome,  codigoMunicipio, status} = bairro;

        if(!codigoBairro){
            throw new CampusNulos("Campo codigoBairro bairro é nulo");
        }
        if(!nome){
            throw new CampusNulos("Campo nome bairro é nulo");
        }
        if(!codigoMunicipio){
            throw new CampusNulos("Campo codigoUF bairro é nulo");
        }
        if(!status){
            throw new CampusNulos("Campo status bairro é nulo");
        }
    }
    public async verificarTiposDeValoresAtualizacao(bairro: any){
        const {codigoBairro, nome, codigoMunicipio, status} = bairro;

        if(typeof codigoBairro !== 'number'){
            throw new TipoVarivelInvalida("Campo codigoBairro bairro, não é um number");
        }
        if(typeof nome !== "string"){
            throw new TipoVarivelInvalida("Campo nome bairro, não é uma string");
        }
        if(typeof codigoMunicipio !== "number"){
            throw new TipoVarivelInvalida("Campo codigoMunicipio bairro, não é um number");
        }
        if(typeof status !== "number"){
            throw new TipoVarivelInvalida("Campo status bairro, não é um number");
        }
        if(status != 1 && status != 2){
            throw new TipoVarivelInvalida("Campo status bairro, não é um valor válido");
        }
    }
    
    public async verificarAtualizacao(bairro: any){
        if(bairro === null){
            throw new RequisicaoMalFeita('codigoBairro ou codigoMunicipio não foram encontrados');
        }
    }

    public async existeBairroPeloCodigoBairro(codigoBairro: number){
        if(!codigoBairro){
            throw new RequisicaoMalFeita('Não existe esse bairro cadastrado');
        }
    }

    public async verificarParametrosValidos(parametros: any){
        const chaves = ['codigoBairro', 'codigoMunicipio', 'nome', 'status'];

        for(const chave in parametros){
            if(!chaves.includes(chave)){
                throw new RequisicaoMalFeita('Paramêtro não encontrado');
            }
        }
    }
}