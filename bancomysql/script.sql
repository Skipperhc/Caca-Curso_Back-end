-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cacacurso
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `cacacurso` ;

-- -----------------------------------------------------
-- Schema cacacurso
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cacacurso` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `cacacurso` ;

-- -----------------------------------------------------
-- Table `Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Usuario` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(200) NOT NULL,
  `nome` VARCHAR(200) NOT NULL,
  `idThirdParty` VARCHAR(150) NOT NULL,
  `imageUrl` VARCHAR(3000) NULL,
  `provider` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;
CREATE UNIQUE INDEX `idThirdParty_UNIQUE` ON `Usuario` (`idThirdParty` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Curso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Curso` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Curso` (
  `idCurso` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `link` VARCHAR(5000) NOT NULL,
  `temaPrincipal` VARCHAR(100) NOT NULL,
  `horas` FLOAT NULL,
  `keywords` VARCHAR(5000) NULL,
  `likes` INT NULL DEFAULT 0,
  `dislikes` INT NULL DEFAULT 0,
  PRIMARY KEY (`idCurso`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Avaliacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Avaliacao` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Avaliacao` (
  `idAvaliacao` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `idCurso` INT NOT NULL,
  `comentario` VARCHAR(1000) NOT NULL,
  `dataComentario` DATETIME NOT NULL,
  PRIMARY KEY (`idAvaliacao`),
  CONSTRAINT `fk_Avaliacao_Usuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Avaliacao_Curso1`
    FOREIGN KEY (`idCurso`)
    REFERENCES `Curso` (`idCurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_Avaliacao_Usuario_idx` ON `Avaliacao` (`idUsuario` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_Avaliacao_Curso1_idx` ON `Avaliacao` (`idCurso` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `UsuarioFavoritos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `UsuarioFavoritos` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `UsuarioFavoritos` (
  `idCurso` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  `dataFavorito` DATETIME NOT NULL,
  PRIMARY KEY (`idCurso`, `idUsuario`),
  CONSTRAINT `fk_Curso_has_Usuario_Curso1`
    FOREIGN KEY (`idCurso`)
    REFERENCES `Curso` (`idCurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Curso_has_Usuario_Usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_Curso_has_Usuario_Usuario1_idx` ON `UsuarioFavoritos` (`idUsuario` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_Curso_has_Usuario_Curso1_idx` ON `UsuarioFavoritos` (`idCurso` ASC) VISIBLE;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
