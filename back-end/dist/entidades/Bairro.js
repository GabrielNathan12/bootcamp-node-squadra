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
exports.Bairro = void 0;
const typeorm_1 = require("typeorm");
const Municipio_1 = require("./Municipio");
const Endereco_1 = require("./Endereco");
let Bairro = exports.Bairro = class Bairro {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'CODIGO_BAIRRO', type: 'int' }),
    __metadata("design:type", Number)
], Bairro.prototype, "codigoBairro", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Municipio_1.Municipio, (municipio) => municipio.bairros, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'CODIGO_MUNICIPIO' }),
    __metadata("design:type", Municipio_1.Municipio)
], Bairro.prototype, "municipio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'NOME', type: 'varchar' }),
    __metadata("design:type", String)
], Bairro.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'STATUS', type: 'int' }),
    __metadata("design:type", Number)
], Bairro.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Endereco_1.Endereco, (endereco) => endereco.bairro),
    __metadata("design:type", Array)
], Bairro.prototype, "enderecos", void 0);
exports.Bairro = Bairro = __decorate([
    (0, typeorm_1.Entity)('TB_BAIRRO')
], Bairro);
