CREATE DATABASE burgers_db; 
USE burgers_db; 

CREATE TABLE burger 
(
	id int NOT NULL AUTO_INCREMENT, 
    name VARCHAR(300) NOT NULL, 
    eaten BOOLEAN DEFAULT false, 
    PRIMARY KEY (id)
); 