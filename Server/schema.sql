-- estas son querys 
CREATE DATABASE userStories;

USE userStories;
-- para user el usario
sudo mysql -u sanbega -p
show tables;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
);

CREATE TABLE item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);

CREATE TABLE shared_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    user_id INT,
    shared_with_id INT,
    FOREIGN KEY (item_id) REFERENCES item(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE

);
-- para eliminar
drop  table nombre de la tabla ;

-- insertando usarios 
INSERT INTO users (name, email, password) VALUES ('Sanbega', 'correoPrueba1@gmail.com', 'sanbega4');
INSERT INTO users (name, email, password) VALUES ('Prueba', 'correoPrueba@gmail.com', 'prueba2');

-- insertando item

INSERT INTO item (title, user_id)
VALUES
("clonar repo  😒 ",1),
("correr repo  🤨",1),
("trabajar tarjetas  🥺",2),
("guardar cambios 🙂",2),
("hacer commit 👉",1),
("hacer un push 👈",1),
("crear nueva rama trabajo 😳",2),
("hacer pruebas 😞",2);

-- insertando shared_items

INSERT INTO shared_items (item_id, user_id, shared_with_id) VALUES(1,1,2);