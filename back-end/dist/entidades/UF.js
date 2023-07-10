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
exports.UF = void 0;
const typeorm_1 = require("typeorm");
const Municipio_1 = require("./Municipio");
let UF = exports.UF = class UF {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'CODIGO_UF', type: 'int' }),
    __metadata("design:type", Number)
], UF.prototype, "codigoUF", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SIGLA', type: 'varchar2' }),
    __metadata("design:type", String)
], UF.prototype, "sigla", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'NOME', type: 'varchar' }),
    __metadata("design:type", String)
], UF.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'STATUS', type: 'int' }),
    __metadata("design:type", Number)
], UF.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Municipio_1.Municipio, (municipio) => municipio.codigoUF),
    __metadata("design:type", Array)
], UF.prototype, "municipios", void 0);
exports.UF = UF = __decorate([
    (0, typeorm_1.Entity)('TB_UF')
], UF);
