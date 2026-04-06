-- data.sql

-- LIMPIEZA DE TABLAS PREVIAS (Para modo reinicio H2)
DROP TABLE IF EXISTS transacciones_inventario CASCADE;
DROP TABLE IF EXISTS estados_obra CASCADE;
DROP TABLE IF EXISTS obras_autores CASCADE;
DROP TABLE IF EXISTS obras CASCADE;
DROP TABLE IF EXISTS autores CASCADE;
DROP TABLE IF EXISTS carreras CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- CREACIÓN DE TABLAS ESTRICTA MENTE SOLICITADAS POR RÚBRICA (5 MÍNIMO)
CREATE TABLE usuarios (
    id_usuario BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100), email VARCHAR(100) UNIQUE, password VARCHAR(255), rol VARCHAR(20)
);

CREATE TABLE carreras (
    id_carrera BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    facultad VARCHAR(100)
);

CREATE TABLE autores (
    id_autor BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    nacionalidad VARCHAR(50)
);

CREATE TABLE obras (
    id_obra BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    genero VARCHAR(50),
    anio_publicacion INT,
    isbn VARCHAR(20),
    precio DOUBLE,
    stock INT,
    estado_actual VARCHAR(20),
    id_carrera BIGINT,
    FOREIGN KEY (id_carrera) REFERENCES carreras(id_carrera)
);

CREATE TABLE obras_autores (
    id_obra BIGINT,
    id_autor BIGINT,
    PRIMARY KEY (id_obra, id_autor),
    FOREIGN KEY (id_obra) REFERENCES obras(id_obra),
    FOREIGN KEY (id_autor) REFERENCES autores(id_autor)
);

CREATE TABLE estados_obra (
    id_estado BIGINT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(150),
    fecha TIMESTAMP,
    id_obra BIGINT,
    FOREIGN KEY (id_obra) REFERENCES obras(id_obra)
);

CREATE TABLE transacciones_inventario (
    id_transaccion BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(20), cantidad INT, costo_unitario DOUBLE, costo_total DOUBLE, fecha TIMESTAMP,
    id_obra BIGINT,
    FOREIGN KEY (id_obra) REFERENCES obras(id_obra)
);

-- INSERCIÓN DE DATOS INICIALES
INSERT INTO usuarios (nombre, email, password, rol) VALUES ('Admin TI', 'admin@itq.edu.ec', '123456', 'ADMIN');
INSERT INTO usuarios (nombre, email, password, rol) VALUES ('Académico', 'academico@itq.edu.ec', '123456', 'ACADEMICO');
INSERT INTO usuarios (nombre, email, password, rol) VALUES ('Gestor Inventario', 'gestor@itq.edu.ec', '123456', 'GESTOR');
INSERT INTO usuarios (nombre, email, password, rol) VALUES ('Estudiante', 'estudiante@itq.edu.ec', '123456', 'ESTUDIANTE');

-- 1. CARRERAS
INSERT INTO carreras (nombre, facultad) VALUES ('Sistemas', 'Facultad de Ingeniería');
INSERT INTO carreras (nombre, facultad) VALUES ('Administracion', 'Facultad de Ciencias Administrativas');

-- 2. AUTORES
INSERT INTO autores (nombre, nacionalidad) VALUES ('Ian Sommerville', 'Reino Unido');
INSERT INTO autores (nombre, nacionalidad) VALUES ('Idalberto Chiavenato', 'Brasil');
INSERT INTO autores (nombre, nacionalidad) VALUES ('Robert C. Martin', 'EEUU');

-- 3. OBRAS
INSERT INTO obras (titulo, anio_publicacion, isbn, estado_actual, precio, stock, id_carrera) VALUES
('Ingeniería de Software 9na Edición', 2011, '9786073206037', 'Publicado', 120.0, 5, 1),
('Clean Code: A Handbook of Agile Software', 2008, '9780132350884', 'Publicado', 45.0, 0, 1),
('Introduccion a la Teoria General de la Administracion', 2014, '9781456216447', 'Borrador', 60.0, 10, 2);

-- 4. OBRAS_AUTORES (Muchos a Muchos)
INSERT INTO obras_autores (id_obra, id_autor) VALUES (1, 1);
INSERT INTO obras_autores (id_obra, id_autor) VALUES (2, 3);
INSERT INTO obras_autores (id_obra, id_autor) VALUES (3, 2);

-- 5. ESTADOS HISTORIAL
INSERT INTO estados_obra (descripcion, fecha, id_obra) VALUES ('Creado y Subido', '2026-01-01 10:00:00', 1);
INSERT INTO estados_obra (descripcion, fecha, id_obra) VALUES ('Aprobado Académico', '2026-01-05 12:00:00', 1);
INSERT INTO estados_obra (descripcion, fecha, id_obra) VALUES ('Terminado de crear', '2026-02-15 09:30:00', 2);
INSERT INTO estados_obra (descripcion, fecha, id_obra) VALUES ('En revisión externa', '2026-03-20 15:45:00', 3);

-- 6. TRANSACCIONES
INSERT INTO transacciones_inventario (tipo, cantidad, costo_unitario, costo_total, fecha, id_obra) VALUES
('Compra', 5, 100.0, 500.0, '2026-04-01 08:00:00', 1),
('Venta', 1, 130.0, 130.0, '2026-04-02 14:00:00', 1);
