/*Actualizar datos de jugadoras*/
UPDATE `jugadoras` SET `retiro` = '2025' WHERE `jugadoras`.`id_jugadora` = 100; 
UPDATE `jugadoras` SET `Apodo` = 'Wifi' WHERE `jugadoras`.`id_jugadora` = 181; 


/* Trayectorias modificadas */
/*  
    player        team        years         actual
    -----------------------------------------
    Peke          ATH         2021-act      YES
    Rolfo         FCB         2021-2025     NO
    Martina       FCB         2024-2025     NO
    Ellie         FCB         2024-2025     NO
    Simona        ESP         2023-act      YES
    Baudet        LLP         2023-2024     NO
    Torroda       LUD         2023-2025     NO
    Naima         BET         2024-2025     NO
    Laura M.G.    LLP         2022-2024     NO
    Paula A.M     GRA         2024-2025     NO
    Browne        VCF         2024-2025     NO
    Eva N.        RMA         2024-act      YES
    Angeldahl     RMA         2024-act      YES
    Keukelaar     AJX         2023-2026     NO
    Alexia F.     GRA         2024-2025     NO
    Julia B.      CHE         2024-2025     NO
    Portales      LLP         2024-2025     NO
    Amaiur        RSO         2020-2025     NO
    Echezarreta   ADJ         2024-2025     NO
    Esther M.P.   BET         2024-2025     NO
    Isa T.        GRA         2023-2025     NO
    Marques       VCF         2024-2025     NO
    R.Marquez     BET         2014-2025     NO
    M.Cortes      SEV         2024-act      YES
    Gabarro       EVE         2024-2025     NO
    Blom          ADJ         2021-2025     NO
    Andrea A.A    EIB         2022-2025     NO
    Misa          RMA         2020-act      YES
    Barth         ATM         2022-2025     NO
    Pizarro       EIB         2022-2025     NO
    Lete          RSO         2018-2025     NO
    Moraza        ATM         2022-2025     NO
    Florentino    VCF         2023-2025     NO
    Molina        LUD         2024-2025     NO
    Paufer        LUD         2022-2025     NO
    Arola A.      RCDE        2024-2025     NO    

*/


/* Trayectorias nuevas */
INSERT INTO `trayectoria` (`id`, `jugadora`, `equipo`, `años`, `imagen`, `equipo_actual`) VALUES
(813, 479, 10, '2018-act', NULL, 1),
(812, 478, 10, '2022-act', NULL, 1),
(811, 477, 10, '2024-act', NULL, 1),
(810, 476, 10, '2024-act', NULL, 1),
(809, 475, 10, '2018-act', NULL, 1),
(808, 474, 10, '2017-act', NULL, 1),
(807, 120, 12, '2022-2024', NULL, 0),
(806, 120, 80, '2020-2022', NULL, 0),
(805, 120, 8, '2025-act', NULL, 1),
(804, 36, 8, '2025-act', NULL, 1),
(803, 28, 8, '2025-act', NULL, 1),
(802, 74, 7, '2020-2023', NULL, 0),
(801, 74, 8, '2025-act', NULL, 1),
(800, 48, 8, '2025-act', NULL, 1),
(799, 225, 109, '2025-act', NULL, 1),
(798, 304, 78, '2025-act', NULL, 1),
(797, 56, 78, '2025-act', NULL, 1),
(795, 181, 6, '2022-2024', NULL, 0),
(794, 181, 12, '2024-act', NULL, 1),
(793, 307, 44, '2021-2022', NULL, 0),
(792, 307, 12, '2025-act', NULL, 1),
(791, 380, 25, '2017-2019', NULL, 0),
(790, 380, 12, '2025-act', NULL, 1),
(789, 407, 12, '2025-act', NULL, 1),
(788, 216, 12, '2025-act', NULL, 1),
(787, 76, 4, '2020-2024', NULL, 0),
(786, 76, 12, '2025-act', NULL, 1),
(785, 256, 12, '2025-act', NULL, 1),
(784, 208, 79, '2023-2024', NULL, 0),
(783, 208, 55, '2022-2023', NULL, 0),
(782, 208, 11, '2020-2022', NULL, 0),
(781, 208, 12, '2025-act', NULL, 1),
(780, 355, 12, '2025-act', NULL, 1),
(779, 245, 6, '2025-act', NULL, 1),
(777, 328, 44, '2017-2018', NULL, 0),
(776, 328, 12, '2018-2019', NULL, 0),
(775, 328, 86, '2021-2022', NULL, 0),
(774, 328, 9, '2019-2021', NULL, 0),
(773, 328, 11, '2022-2024', NULL, 0),
(772, 328, 6, '2025-act', NULL, 1),
(771, 411, 6, '2025-act', NULL, 1),
(770, 270, 59, '2015-2019', NULL, 0),
(769, 270, 6, '2025-act', NULL, 1),
(768, 382, 7, '2026-act', NULL, 1),
(767, 150, 42, '2018-2020', NULL, 0),
(766, 150, 48, '2016-2018', NULL, 0),
(765, 150, 21, '2021-2024', NULL, 0),
(764, 154, 6, '2022-2024', NULL, 0),
(763, 154, 2, '2018-2022', NULL, 0),
(762, 89, 26, '2025-act', NULL, 1),
(761, 266, 10, '2018-2024', NULL, 0),
(760, 266, 26, '2025-act', NULL, 1),
(759, 326, 44, '2018-2021', NULL, 0),
(758, 326, 36, '2012-2018', NULL, 0),
(757, 326, 26, '2025-act', NULL, 1),
(756, 215, 79, '2022-2024', NULL, 0),
(755, 215, 44, '2019-2020', NULL, 0),
(754, 215, 59, '2018-2019', NULL, 0),
(753, 215, 26, '2025-act', NULL, 1),
(752, 37, 26, '2025-act', NULL, 1),
(751, 320, 26, '2016-2023', NULL, 0),
(750, 320, 1, '2014-2016', NULL, 0),
(749, 320, 26, '2025-act', NULL, 1),
(748, 124, 59, '2022-2023', NULL, 0),
(747, 2, 19, '2025-act', NULL, 1),
(746, 10, 91, '2025-ACT', NULL, 1),
(745, 19, 22, '2025-act', NULL, 1),
(744, 423, 1, '2025-act', NULL, 1),
(743, 423, 21, '2022-2025', NULL, 0),
(742, 423, 6, '2017-2022', NULL, 0),
(741, 423, 1, '2012-2017', NULL, 0),
(740, 103, 80, '2025-act', NULL, 1),
(739, 100, 83, '2025', NULL, 1),
(738, 98, 80, '2025-act', NULL, 1),
(737, 305, 10, '2025-act', NULL, 1),
(736, 298, 10, '2025-act', NULL, 1),
(735, 226, 10, '2025-act', NULL, 1);