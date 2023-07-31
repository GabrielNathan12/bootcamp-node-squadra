"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endereco = void 0;
const typeorm_1 = require("typeorm");
const Bairro_1 = require("./Bairro");
const Pessoa_1 = require("./Pessoa");
let Endereco = exports.Endereco = class Endereco {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'CODIGO_ENDERECO', type: 'int' }),
    __metadata("design:type", Number)
], Endereco.prototype, "codigoEndereco", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Pessoa_1.Pessoa, (pessoa) => pessoa.enderecos, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'CODIGO_PESSOA' }),
    __metadata("design:type", Pessoa_1.Pessoa)
], Endereco.prototype, "codigoPessoa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Bairro_1.Bairro, (bairro) => bairro.enderecos, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'CODIGO_BAIRRO' }),
    __metadata("design:type", Bairro_1.Bairro)
], Endereco.prototype, "codigoBairro", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'NOME_RUA', type: 'varchar' }),
    __metadata("design:type", String)
], Endereco.prototype, "nomeRua", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'NUMERO', type: 'number' }),
    __metadata("design:type", Number)
], Endereco.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'COMPLEMENTO', type: 'varchar' }),
    __metadata("design:type", String)
], Endereco.prototype, "complemento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CEP', type: 'varchar' }),
    __metadata("design:type", String)
], Endereco.prototype, "cep", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'STATUS', type: 'number' }),
    __metadata("design:type", Number)
], Endereco.prototype, "status", void 0);
exports.Endereco = Endereco = __decorate([
    (0, typeorm_1.Entity)('TB_ENDERECO')
], Endereco);
