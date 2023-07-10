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
exports.Pessoa = void 0;
const typeorm_1 = require("typeorm");
const Endereco_1 = require("./Endereco");
let Pessoa = exports.Pessoa = class Pessoa {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'CODIGO_PESSOA', type: 'int' }),
    __metadata("design:type", Number)
], Pessoa.prototype, "codigoPessoa", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'NOME', type: 'varchar' }),
    __metadata("design:type", String)
], Pessoa.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SOBRENOME', type: 'varchar' }),
    __metadata("design:type", String)
], Pessoa.prototype, "sobrenome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'IDADE', type: 'int' }),
    __metadata("design:type", Number)
], Pessoa.prototype, "idade", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'LOGIN', type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Pessoa.prototype, "login", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SENHA', type: 'varchar' }),
    __metadata("design:type", String)
], Pessoa.prototype, "senha", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'STATUS', type: 'int' }),
    __metadata("design:type", Number)
], Pessoa.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Endereco_1.Endereco, (endereco) => endereco.codigoPessoa),
    __metadata("design:type", Array)
], Pessoa.prototype, "enderecos", void 0);
exports.Pessoa = Pessoa = __decorate([
    (0, typeorm_1.Entity)('TB_PESSOA')
], Pessoa);
