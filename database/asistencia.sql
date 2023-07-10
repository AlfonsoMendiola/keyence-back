# unicamente crear la bd, las tablas y la vista y ejecutar el comando npx para crear los modelos
CREATE DATABASE keyence;

USE keyence;

CREATE TABLE empleados(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE
)ENGINE=InnoDB;

INSERT INTO empleados VALUES
    (0, "AAA"),
    (0, "BBB"),
    (0, "CCC"),
    (0, "DDD"),
    (0, "FFF");
DROP TABLE empleados;

CREATE TABLE asistencias(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    punch_in TIME,
    punch_out TIME,
    id_empleado INT UNSIGNED,
    CONSTRAINT FOREIGN KEY(id_empleado) REFERENCES  Empleados(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
)ENGINE=InnoDB;
INSERT INTO `asistencias` (`id`, `fecha`, `punch_in`, `punch_out`, `id_empleado`) VALUES (NULL, '2023-01-01', '09:00:00', '18:01:00', '1');
DROP TABLE asistencias;

CREATE VIEW vista_asistencias AS
SELECT e.id AS 'Employee ID',
       e.name AS 'Employee Name',
       a.fecha AS 'Date',
       a.punch_in AS 'Punch In',
       a.punch_out AS 'Punch Out',
       ADDTIME(a.punch_out, -a.punch_in) AS 'Activity Time'
FROM asistencias a
INNER JOIN empleados e ON a.id_empleado = e.id;
DROP VIEW vista_asistencias;
SELECT * FROM vista_asistencias;

# npx sequelize-auto -o "./models" -d keyence -h localhost -u root -p 3306 -x -e mysql
# el comando solicitara pass de la bd