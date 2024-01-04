export class ErrosApi extends Error{
    public readonly statusCode: number;

    constructor(mensagem: string, statusCode: number){
        super(mensagem);
        this.statusCode = statusCode;
    }

}

export class CampusNulos extends ErrosApi{
    constructor(mensagem: string){
        super(mensagem, 400);
    }
}


export class DuplicadasEncontradas extends ErrosApi{
    constructor(mensagem: string){
        super(mensagem, 400);
    }
}

export class CampusGrandes extends ErrosApi{
    constructor(mensagem: string){
        super(mensagem, 400);
    }
}

export class RequisicaoMalFeita extends ErrosApi{
    constructor(mensagem: string){
        super(mensagem, 400);
    }
}

export class DadosDuplicados extends ErrosApi{
    constructor(mensagem: string){
        super(mensagem, 400);
    }
}

export class EmailExiste extends ErrosApi{
    constructor(mensagem: string){
        super(mensagem, 400);
    }
}

export class ErroInternoServidor extends ErrosApi{
    constructor(mensagem: string){
        super(mensagem, 500);
    }
}

export class RequisicaoNaoEncontrada extends ErrosApi{
    constructor(mensagem: string){
        super(mensagem, 400);
    }
}

export class TipoVarivelInvalida extends ErrosApi{
    constructor(mensagem: string){
        super(mensagem, 400);
    }
}