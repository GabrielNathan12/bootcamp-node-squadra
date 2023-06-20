-- Database: Bootcamp_Node

-- DROP DATABASE IF EXISTS "Bootcamp_Node";

CREATE DATABASE "Bootcamp_Node"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	

-- Criacao da Tabela de tb_UF

CREATE TABLE tb_UF(
	CODIGO_UF INT NOT NULL,
	SIGLA varchar(2) NOT NULL,
	NOME varchar(35) NOT NULL, 
	STATUS INT not NULL,
	PRIMARY KEY(CODIGO_UF)
);

-- Criacao da Tabela Municipio, com chave estrangeira de apontando para o codigo de UF
CREATE TABLE tb_Municipio(
	CODIGO_UF INT NOT NULL,
	CODIGO_MUNICIPIO INT NOT NULL,
	NOME varchar(35) NOT NULL,
	STATUS INT NOT NULL,
	PRIMARY KEY (CODIGO_MUNICIPIO),
	FOREIGN KEY (CODIGO_UF) REFERENCES tb_UF (CODIGO_UF)
);

-- Criacao da Tabela tb_bairro, com a chave estrangeira apontando para o codigo do municipio 
CREATE TABLE tb_Bairro(
	CODIGO_MUNICIPIO INT NOT NULL,
	CODIGO_BAIRRO INT NOT NULL, 
	NOME varchar(35) NOT NULL, 
	STATUS INT NOT NULL, 
	PRIMARY KEY (CODIGO_BAIRRO),
	FOREIGN KEY (CODIGO_MUNICIPIO) REFERENCES tb_Municipio(CODIGO_MUNICIPIO)
	
);

-- Criacao da Tabela tb_Pessoa
CREATE TABLE tb_Pessoa(
	CODIGO_PESSOA INT NOT NULL,
	NOME varchar(35) NOT NULL,
	EMAIL varchar(35) NOT NULL,
	SENHA varchar(35) NOT NULL,
	DATANASCIMENTO DATE NOT NULL,
	IDADE INT NOT NULL,
	STATUS INT NOT NULL,
	PRIMARY KEY (NOME)
);
