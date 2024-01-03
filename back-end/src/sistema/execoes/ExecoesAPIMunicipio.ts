import { CampusNulos, DadosDuplicados, RequisicaoMalFeita, TipoVarivelInvalida } from "../../configuracoes/helpers/ErrosApi";

export class ExecoesAPIMunicipio{

    public async verificarCampusNulosCriacao(municipio:any){
        const {nome, codigoUF, status} = municipio;

        if(!nome){
            throw new CampusNulos("Campo nome Municipio é nulo");
        }
        if(!codigoUF){
            throw new CampusNulos("Campo codigoUF municipio é nulo");
        }
        if(!status){
            throw new CampusNulos("Campo status municipio é nulo");
        }
    }

    public async existeUFPeloCodigoUF(uf: any){
        if(uf === null){   
            throw new RequisicaoMalFeita("Não existe esse codigoUF registrado");
        }
    }

    public async existeDuplicataMunicipio(municipio: any){
        if(municipio !== null){
            throw new RequisicaoMalFeita("Existe já esse nome municipio registrado nesse codigoUF");
        }
    }
    
    public async vericarTiposDeValoresCriacao(municipio:any){
        const {nome, codigoUF, status} = municipio;

        if(typeof nome !== "string"){
            throw new TipoVarivelInvalida("Campo nome municipio, não é uma string");
        }
        
        if(typeof codigoUF !== "number"){
            throw new TipoVarivelInvalida("Campo codigoUF municipio, não é um number");
        }

        if(typeof status !== "number"){
            throw new TipoVarivelInvalida("Campo status municipio, não é uma string");
        }

        if(status != 1 && status != 2){
            throw new TipoVarivelInvalida("Campo status municipio, não é um valor válido");
        }
    }
    
    public async verificarDuplicadasCriacao(nome: any, codigoUF: any){
        if(nome !== null){
            throw new DadosDuplicados("Campo nome já está registrado");
        }
        if(codigoUF !== null){
            throw new DadosDuplicados("Campo sigla já está registrado");
        }
    }

    public async verificarParametrosValidos(parametros: any){
        const chaves = ['codigoMunicipio', 'nome', 'codigoUF', 'status'];

        for(const chave in parametros){
            if(!chaves.includes(chave)){
                throw new RequisicaoMalFeita("Paramêtro não encontrado");
            }
        }
    }

    public async verificarCampusNulosAtualizacao(municipio: any){
        const {codigoMunicipio ,nome,  codigoUF, status} = municipio;

        if(!codigoMunicipio){
            throw new CampusNulos("Campo codigomunicipio municipio é nulo");
        }
        if(!nome){
            throw new CampusNulos("Campo nome municipio é nulo");
        }
        if(!codigoUF){
            throw new CampusNulos("Campo codigoUF municipio é nulo");
        }
        if(!status){
            throw new CampusNulos("Campo status municipio é nulo");
        }
    }
    public async vericarTiposDeValoresAtualizacao(municipio:any){
        const {codigoMunicipio, nome, codigoUF, status} = municipio;

        if(typeof codigoMunicipio !== 'number'){
            throw new TipoVarivelInvalida("Campo codigoMunicipio municipio, não é um number");
        }
        if(typeof nome !== "string"){
            throw new TipoVarivelInvalida("Campo nome municipio, não é uma string");
        }
        if(typeof codigoUF !== "number"){
            throw new TipoVarivelInvalida("Campo codigoUF municipio, não é um number");
        }
        if(typeof status !== "number"){
            throw new TipoVarivelInvalida("Campo status municipio, não é um number");
        }
        if(status != 1 && status != 2){
            throw new TipoVarivelInvalida("Campo status municipio, não é um valor válido");
        }
    }

    public async verificarDuplicadasAtualizacao(municipio: any, codigoMunicipio: number){
        if(municipio && municipio.codigoMunicipio !== codigoMunicipio){
            throw new DadosDuplicados("Campo nome municipio já está registrado nesse UF");
        }
    }
    public async existeMunicipioPeloCodigomunicipio(municipio: any){
        if(!municipio){
            throw new RequisicaoMalFeita("Não existe esse municipio pelo codigoMunicipio");
        }
    }
}