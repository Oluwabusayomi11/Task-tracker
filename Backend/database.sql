CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(140) NOT NULL
);

INSERT into user (email, password) VALUES ('iyekolobusayomi@gmail.com', '12345');

CREATE TABLE project (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATETIME,
    status ENUM('Not Started', 'In Progress', 'Completed', 'On Hold') DEFAULT 'Not Started',
    priority ENUM ('High', 'Medium', 'Low') DEFAULT 'High',
    project_id INT,
    
    FOREIGN KEY (project_id) REFERENCES project(id) on DELETE CASCADE
);