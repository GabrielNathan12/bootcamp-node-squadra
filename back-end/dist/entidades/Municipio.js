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
exports.Municipio = void 0;
const typeorm_1 = require("typeorm");
const UF_1 = require("./UF");
const Bairro_1 = require("./Bairro");
let Municipio = exports.Municipio = class Municipio {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'CODIGO_MUNICIPIO', type: 'int' }),
    __metadata("design:type", Number)
], Municipio.prototype, "codigoMunicipio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UF_1.UF, (codigoUF) => codigoUF.municipios),
    (0, typeorm_1.JoinColumn)({ name: 'Codigo_UF' }),
    __metadata("design:type", UF_1.UF)
], Municipio.prototype, "codigoUF", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'NOME', type: 'varchar' }),
    __metadata("design:type", String)
], Municipio.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'STATUS', type: 'int' }),
    __metadata("design:type", Number)
], Municipio.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Bairro_1.Bairro, (bairro) => bairro.codigoMunicipio),
    __metadata("design:type", Array)
], Municipio.prototype, "bairros", void 0);
exports.Municipio = Municipio = __decorate([
    (0, typeorm_1.Entity)('TB_MUNICIPIO')
], Municipio);
