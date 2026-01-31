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