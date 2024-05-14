CREATE DATABASE IF NOT EXISTS ticket_system;

USE ticket_system;

CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    details TEXT
);
