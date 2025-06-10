CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    contraseña VARCHAR(100), -- Idealmente hasheada
    rol VARCHAR(20) CHECK (rol IN ('cliente', 'admin')) DEFAULT 'cliente'
);

CREATE TABLE IF NOT EXISTS servicios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contrataciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    servicio_id INT REFERENCES servicios(id),
    fecha_solicitud DATE,
    comentario TEXT,
    estado VARCHAR(20) CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')) DEFAULT 'pendiente'
);


-- Contraseña debe ir con comillas simples, no dobles ("prueba123" → 'prueba123')
INSERT INTO usuarios(nombre, correo, contraseña, rol) VALUES
('Daniel Durán', 'daninsoi924@gmail.com', 'prueba123', 'admin');

-- Elimina el punto y coma en la segunda línea de servicios (deja solo uno al final)
INSERT INTO servicios (nombre, descripcion, precio) VALUES
('Consultoría en Ciberseguridad', 'Evaluación completa de la seguridad de su infraestructura IT', 1500.00),
('Pentesting', 'Pruebas de penetración para identificar vulnerabilidades', 2500.00),
('Auditoría de Seguridad', 'Revisión exhaustiva de políticas y procedimientos de seguridad', 1800.00),
('Capacitación en Seguridad', 'Entrenamiento para empleados sobre buenas prácticas de seguridad', 800.00),
('Implementación de Firewall', 'Configuración y despliegue de soluciones de firewall', 1200.00),
('Monitoreo 24/7', 'Servicio de monitoreo continuo de la red y sistemas', 3000.00);
