/* Nuevos equipos */
INSERT INTO `equipos` (`id_equipo`, `liga`, `nombre`, `escudo`) VALUES 
(115, '7', 'Osasuna', NULL), 
(116, '7', 'Alavés', NULL),
(117, '7', 'Fundación Albacete', NULL),
(118, '7', 'AEM SE Lleida', NULL),
(119, '7', 'Real Oviedo Femenino', NULL),
(120, '7', 'CE Europa', NULL),
(121, '21', 'Bizkerre', NULL),
(122, '22', 'Añorga', NULL),
(123, '21', 'Racing Féminas', NULL); 

/* Nuevas jugadoras */
INSERT INTO `jugadoras` (`id_jugadora`, `Nombre`, `Apellidos`, `Apodo`, `Nacimiento`, `Nacionalidad`, `Posicion`, `imagen`, `retiro`) VALUES
(493, 'Irati', 'Alfaro Nagore', 'Irati', '2004-05-27', 1, 3, NULL, '0000'),
(492, 'Ane', 'Bordagaray Casado ', 'Ane', '2008-03-25', 1, 3, NULL, '0000'),
(491, 'Meritxell', 'Muñoz Alsina', 'Meritxell', '2003-06-18', 1, 1, NULL, '0000'),
(490, 'Ariadna', 'Domènech Cedrés', 'Ariadna', '2005-07-21', 1, 3, NULL, '0000'),
(489, 'Olivia', 'Fergusson', 'Fergusson', '1995-03-27', 2, 10, NULL, '0000'),
(488, 'Isabelle Naomi', 'Louise Hoekstra', 'Hoekstra', '2003-07-31', 7, 10, NULL, '0000'),
(487, 'Ainhoa', 'Domènech Cedrés', 'Domenech', '2005-07-21', 1, 10, NULL, '0000'),
(486, 'Ona', 'Baradad Rius', 'Baradad', '2024-04-16', 1, 10, NULL, '0000'),
(485, 'Aïcha', 'Cámara Cámara', 'Aïcha', '2006-12-11', 1, 3, NULL, '0000'),
(484, 'Clara', 'Serrajordi Díaz', 'Serrajordi', '2007-12-07', 1, 5, NULL, '0000'),
(483, 'Ainoa', 'Gómez Luna', 'Ainoa', '2007-04-13', 1, 5, NULL, '0000'),
(482, 'Laia', 'Martret Jiménez', 'Martret', '2005-08-28', 1, 5, NULL, '0000'),
(481, 'Martine', 'Trollsas Fenger', 'Fenger', '2006-10-09', 3, 5, NULL, '0000'),
(480, 'Carla', 'Juliá Martínez', 'Juliá', '2006-12-14', 1, 3, NULL, '0000'),
(479, 'Daniela', 'Agote Aguirre', 'Agote', '2006-08-27', 1, 10, NULL, '0000'),
(478, 'Oihana', 'Agirregomezkorta Garcia', 'Oihana', '2004-06-30', 1, 10, NULL, '0000'),
(477, 'Maitane', 'Vilariño Mendinueta', 'Vilariño', '2002-06-30', 1, 5, NULL, '0000'),
(476, 'Elene', 'Gurtubay Loyo', 'Gurtu', '2007-10-03', 1, 5, NULL, '0000'),
(475, 'Alejandra', 'Estefanía Díez', 'Estefa', '2003-09-15', 1, 5, NULL, '0000'),
(474, 'Nerea', 'Benito Zaldivar', 'Benito', '2004-09-22', 1, 3, NULL, '0000');


/*Actualizar datos de jugadoras*/
UPDATE `jugadoras` SET `retiro` = '2025' WHERE `jugadoras`.`id_jugadora` = 109; 

/* Trayectorias modificadas */
/*  
    player        team        years         actual
    -----------------------------------------
    Itxaso        ATH        2021-2025      NO
    Itsaso        ATH        2021-2025      NO  
    Nahikari      ATH        2023-2025      NO
    Peke          ATH        2021-2026      NO  
    Marta San     ATH        2023-2026      NO
    Engen         FCB        2021-2025      NO
    Mar           RCDE       2022-2025      NO
    Ana Belen H.  RCDE       2023-2025      NO
    Carol Marin   RCDE       2021-2025      NO
    Amanda M.     RCDE       2024-2025      NO
    Natalia M.    RCDE       2024-2025      NO
    Trudi         RCDE       2024-2025      NO
    Iara          RCDE       2024-2025      NO
    Chamorro      RCDE       2023-2025      NO


*/    

INSERT INTO `trayectoria` (`id`, `jugadora`, `equipo`, `años`, `imagen`, `equipo_actual`) VALUES
(846, 133, 52, '2018-2019', NULL, 0),
(845, 133, 116, '2020-2023', NULL, 0),
(844, 136, 115, '2016-2024', NULL, 0),
(843, 136, 80, '2025-act', NULL, 1),
(842, 135, 13, '2025-act', NULL, 1),
(841, 135, 65, '2024-2025', NULL, 0),
(840, 135, 13, '2022-2024', NULL, 0),
(839, 131, 11, '2025-act', NULL, 1),
(838, 128, 2, '2012-2019', NULL, 0),
(837, 128, 107, '2019-2021', NULL, 0),
(836, 128, 2, '2025-act', NULL, 1),
(835, 126, 107, '2021-2023', NULL, 0),
(834, 126, 13, '2019-2021', NULL, 0),
(833, 126, 52, '2009-2019', NULL, 0),
(832, 126, 52, '2025-act', NULL, 1),
(831, 488, 23, '2022-2024', NULL, 0),
(830, 493, 10, '2021-act', NULL, 1),
(829, 492, 10, '2020-act', NULL, 1),
(828, 489, 26, '2025-act', NULL, 1),
(827, 487, 26, '2021-act', NULL, 1),
(826, 486, 26, '2025-act', NULL, 1),
(825, 488, 26, '2024-2026', NULL, 0),
(824, 490, 26, '2019-act', NULL, 1),
(823, 491, 26, '2025-act', NULL, 1),
(822, 116, 2, '2015-2022', NULL, 0),
(821, 116, 27, '2025-act', NULL, 1),
(820, 483, 1, '2022-act', NULL, 1),
(819, 484, 1, '2022-act', NULL, 1),
(818, 485, 1, '2019-act', NULL, 1),
(817, 482, 1, '2017-act', NULL, 1),
(816, 481, 1, '2023-act', NULL, 1),
(815, 480, 1, '2025-act', NULL, 1),
(814, 14, 4, '2025-act', NULL, 1);