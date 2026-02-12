/* Nuevos equipos */
INSERT INTO `equipos` (`id_equipo`, `liga`, `nombre`, `escudo`) VALUES 
(NULL, '17', 'Inter', NULL), 
(NULL, '12', 'Sporting Portugal ', NULL); 


/* Nuevas jugadoras*/
INSERT INTO `jugadoras` (`id_jugadora`, `Nombre`, `Apellidos`, `Apodo`, `Nacimiento`, `Nacionalidad`, `Posicion`, `imagen`, `retiro`) VALUES
(511, 'Natalia', 'Peñalvo Martín', 'Natalia', '2006-11-23', 1, 5, NULL, '0000'),
(510, 'Daniela', 'Miñambres Gutiérrez', 'Daniela', '2006-10-30', 1, 5, NULL, '0000'),
(509, 'Kathrine', 'Møller Kühl', 'Møller', '2003-07-05', 17, 5, NULL, '0000'),
(508, 'Priscilla', 'Chinchilla', 'Chinchilla', '2001-07-11', 29, 5, NULL, '0000'),
(507, 'Lydia', 'Rodríguez Pascual', 'Lydia', '2005-12-15', 1, 3, NULL, '0000'),
(506, 'Celia', 'Gómez García-Quijada', 'Celia', '2008-09-29', 1, 10, NULL, '0000'),
(505, 'Sara', 'Ilonka Däbritz', 'Sara', '1995-02-15', 15, 5, NULL, '0000'),
(504, 'Silvia', 'Cristóbal Fernández', 'Silvia', '2008-05-01', 1, 3, NULL, '0000'),
(503, 'Noemí', 'Bejarano Beltrán', 'Noemi', '2006-02-27', 1, 3, NULL, '0000'),
(502, 'Bella', 'Astrid Christina Andersson', 'Andersson', '2006-07-12', 16, 3, NULL, '0000'),
(501, 'Yasmim', 'Assis Ribeiro', 'Yasmim', '1996-10-28', 27, 3, NULL, '0000'),
(500, 'Sara', 'Holmgaard', 'Sara', '1999-01-28', 17, 3, NULL, '0000'),
(499, 'Merle', 'Frohms', 'Frohms', '1995-01-28', 15, 1, NULL, '0000'),
(498, 'Irune', 'Dorado Alosete', 'Irune', '2008-03-22', 1, 5, NULL, '0000'),
(497, 'Adriana', 'Folgado Blanco', 'Folgado', '2007-04-01', 1, 5, NULL, '0000'),
(496, 'Hanna', 'Ulrika Bennison', 'Hanna', '2002-10-16', 16, 5, NULL, '0000'),
(495, 'Iris', 'Ashley Santiago Garrido', 'Iris', '2007-11-09', 1, 10, NULL, '0000'),
(494, 'Paula', 'Comendador Prado', 'Pau', '2007-01-12', 1, 10, NULL, '0000');



/* Actualizacióon jugadoras */
UPDATE `jugadoras` SET `retiro` = '2025' WHERE `jugadoras`.`id_jugadora` = 146; 


/* Trayectorias modificadas */
/*  
    player        team        years         actual
    -----------------------------------------
    Chavas        RMA         2023-2025      NO
    Oihane        RMA         2023-2025      NO
    Oroz          RMA         2020-2025      NO  
    Leupolz       RMA         2024-2025      NO
    Moller        RMA         2021-2025      NO
    Camacho       RMA         2020-2025      NO
    Tati          ATM         2024-2025      NO
    Gaby          ATM         2023-2026      NO               
    Cardona       ATM         2022-2025      NO 
    Ajibade       ATM         2021-2025      NO

*/  


/* Nuevas trayectorias*/
INSERT INTO `trayectoria` (`id`, `jugadora`, `equipo`, `años`, `imagen`, `equipo_actual`) VALUES
(880, 64, 3, '2025-act', NULL, 1),
(879, 59, 96, '2025-act', NULL, 1),
(878, 55, 92, '2025-act', NULL, 1),
(877, 509, 85, '2024-2026', NULL, 0),
(876, 509, 91, '2023-2024', NULL, 0),
(875, 509, 18, '2022-2025', NULL, 0),
(874, 511, 6, '2020-act', NULL, 1),
(873, 510, 6, '2018-act', NULL, 1),
(872, 509, 6, '2025-act', NULL, 1),
(871, 508, 6, '2025-act', NULL, 1),
(870, 507, 6, '2022-act', NULL, 1),
(869, 506, 6, '2019-act', NULL, 1),
(868, 159, 6, '2019-2020', NULL, 0),
(867, 159, 90, '2025-act', NULL, 1),
(866, 153, 45, '2025-act', NULL, 1),
(865, 146, 20, '2020-2024', NULL, 0),
(864, 146, 14, '2014-2020', NULL, 0),
(863, 148, 115, '2011-2014', NULL, 0),
(862, 148, 10, '2014-2020', NULL, 0),
(861, 148, 73, '2025-act', NULL, 1),
(860, 140, 72, '2025-act', NULL, 1),
(859, 137, 17, '2025-act', NULL, 1),
(858, 495, 7, '2022-act', NULL, 1),
(857, 494, 7, '2022-act', NULL, 1),
(856, 496, 7, '2025-act', NULL, 1),
(855, 497, 7, '2020-act', NULL, 1),
(854, 498, 7, '2021-act', NULL, 1),
(853, 499, 7, '2025-act', NULL, 1),
(852, 500, 7, '2025-act', NULL, 1),
(851, 501, 7, '2024-act', NULL, 1),
(850, 502, 7, '2025-act', NULL, 1),
(849, 503, 7, '2023-act', NULL, 1),
(848, 504, 7, '2021-act', NULL, 1),
(847, 505, 7, '2025-act', NULL, 1);