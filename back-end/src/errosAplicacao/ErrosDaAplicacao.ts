export class ErrosDaAplicacao extends Error{
    
    constructor(mensagem: string, status: number){
        super(mensagem);
        this.name = this.constructor.name;
        this.status = status;
    }

    status: number;
}