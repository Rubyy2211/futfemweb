-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-09-2024 a las 00:04:25
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `futfem`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id_equipo` int(11) NOT NULL,
  `liga` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `escudo` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadoras`
--

CREATE TABLE `jugadoras` (
  `id_jugadora` int(11) NOT NULL,
  `Nombre` text NOT NULL,
  `Apellidos` text NOT NULL,
  `Apodo` text NOT NULL,
  `Nacimiento` date NOT NULL,
  `Nacionalidad` int(11) NOT NULL,
  `Posicion` int(2) NOT NULL DEFAULT 13,
  `imagen` longblob NULL,
  `retiro` year(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ligas`
--

CREATE TABLE `ligas` (
  `id_liga` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `logo` longblob NOT NULL,
  `pais` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

CREATE TABLE `paises` (
  `id_pais` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `bandera` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posiciones`
--

CREATE TABLE `posiciones` (
  `idPosicion` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `abreviatura` text NOT NULL,
  `idPosicionPadre` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `Nombre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trayectoria`
--

CREATE TABLE `trayectoria` (
  `id` int(11) NOT NULL,
  `jugadora` int(11) NOT NULL,
  `equipo` int(11) NOT NULL,
  `años` text NOT NULL,
  `imagen` longblob NULL,
  `equipo_actual` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(20) NOT NULL,
  `Apellidos` varchar(50) DEFAULT NULL,
  `Usuario` varchar(20) NOT NULL,
  `rol` int(11) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `token` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Estructura de tabla para la tabla `pistas`
--

CREATE TABLE `pistas` (
  `id_juego` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `valor` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ;

--
-- Volcado de datos para la tabla `pistas`
--

INSERT INTO `pistas` (`id_juego`, `descripcion`, `valor`) VALUES
(1, 'Guess Trayectoria', '{\"idJugadora\":\"67\"}'),
(2, 'Wordle', '{\"idJugadora\":\"4\"}'),
(3, 'Adivina Jugadora', '{\"idJugadora\":\"25\"}'),
(4, 'Grid', '{\"pais1\":\"5\",\"pais2\":\"7\",\"pais3\":\"3\",\"club1\":\"8\",\"club2\":\"1\",\"club3\":\"3\"}');


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id_equipo`),
  ADD KEY `liga` (`liga`);

--
-- Indices de la tabla `jugadoras`
--
ALTER TABLE `jugadoras`
  ADD PRIMARY KEY (`id_jugadora`),
  ADD KEY `Nacionalidad` (`Nacionalidad`),
  ADD KEY `Posicion` (`Posicion`);

--
-- Indices de la tabla `ligas`
--
ALTER TABLE `ligas`
  ADD PRIMARY KEY (`id_liga`),
  ADD KEY `pais_2` (`pais`),
  ADD KEY `pais` (`pais`) USING BTREE;

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id_pais`);

--
-- Indices de la tabla `posiciones`
--
ALTER TABLE `posiciones`
  ADD PRIMARY KEY (`idPosicion`),
  ADD KEY `idPosicionPadre` (`idPosicionPadre`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `trayectoria`
--
ALTER TABLE `trayectoria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jugadora` (`jugadora`),
  ADD KEY `equipo` (`equipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rol` (`rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jugadoras`
--
ALTER TABLE `jugadoras`
  MODIFY `id_jugadora` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ligas`
--
ALTER TABLE `ligas`
  MODIFY `id_liga` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises`
  MODIFY `id_pais` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `posiciones`
--
ALTER TABLE `posiciones`
  MODIFY `idPosicion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `trayectoria`
--
ALTER TABLE `trayectoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pistas`
--
ALTER TABLE `pistas`
  MODIFY `id_juego` int(11) NOT NULL AUTO_INCREMENT;
  
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `equipos_ibfk_1` FOREIGN KEY (`liga`) REFERENCES `ligas` (`id_liga`);

--
-- Filtros para la tabla `jugadoras`
--
ALTER TABLE `jugadoras`
  ADD CONSTRAINT `jugadoras_ibfk_1` FOREIGN KEY (`Nacionalidad`) REFERENCES `paises` (`id_pais`),
  ADD CONSTRAINT `jugadoras_ibfk_2` FOREIGN KEY (`Posicion`) REFERENCES `posiciones` (`idPosicion`);

--
-- Filtros para la tabla `ligas`
--
ALTER TABLE `ligas`
  ADD CONSTRAINT `ligas_ibfk_1` FOREIGN KEY (`pais`) REFERENCES `paises` (`id_pais`);

--
-- Filtros para la tabla `posiciones`
--
ALTER TABLE `posiciones`
  ADD CONSTRAINT `posiciones_ibfk_1` FOREIGN KEY (`idPosicionPadre`) REFERENCES `posiciones` (`idPosicion`);

--
-- Filtros para la tabla `trayectoria`
--
ALTER TABLE `trayectoria`
  ADD CONSTRAINT `trayectoria_ibfk_1` FOREIGN KEY (`jugadora`) REFERENCES `jugadoras` (`id_jugadora`),
  ADD CONSTRAINT `trayectoria_ibfk_2` FOREIGN KEY (`equipo`) REFERENCES `equipos` (`id_equipo`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
