-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           11.8.2-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para escola_db
CREATE DATABASE IF NOT EXISTS `escola_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `escola_db`;

-- Copiando estrutura para tabela escola_db.alunos
CREATE TABLE IF NOT EXISTS `alunos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `cpf` char(11) DEFAULT NULL,
  `cep` char(8) DEFAULT NULL,
  `uf` char(2) DEFAULT NULL,
  `rua` varchar(120) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `complemento` varchar(120) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela escola_db.alunos: ~7 rows (aproximadamente)
INSERT IGNORE INTO `alunos` (`id`, `nome`, `cpf`, `cep`, `uf`, `rua`, `numero`, `complemento`, `create_at`, `update_at`) VALUES
	(1, 'Vitor Lima', '12345678910', '06000000', 'SP', 'Rua SENAI', 123, 'Apto 12', '2025-09-17 11:28:26', '2025-09-17 11:28:26'),
	(2, 'Wendel', '98765432100', '06000001', 'SP', 'Av. Central', 123, NULL, '2025-09-17 11:28:26', '2025-09-17 11:28:26'),
	(3, 'Matheus', '45678912399', '06000002', 'SP', 'Rua Nova', 123, 'Casa 1', '2025-09-17 11:28:26', '2025-09-17 11:28:26'),
	(4, 'VINI', '36395371849', '05554868', 'SP', 'RUA LINDA', 4, '12B', '2025-09-23 13:29:29', '2025-09-23 13:29:59'),
	(20, 'kaique', '32165498745', '02544654', 'sp', 'asdasd', 12, '3215', '2025-10-01 13:19:04', '2025-10-01 13:19:04'),
	(21, 'vini', '32165478956', '32165412', 'as', 'sdfgsjdkgh', 78, '54', '2025-10-01 13:25:21', '2025-10-01 13:25:21'),
	(24, 'vinicius ribeiro dos santos', '32165498745', '02832457', 'qw', 'belem', 564, 'f', '2025-10-01 13:33:35', '2025-10-01 13:33:35');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
