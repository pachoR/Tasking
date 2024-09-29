CREATE TABLE users (
    user_id             SERIAL PRIMARY KEY UNIQUE NOT NULL, 
    username            TEXT UNIQUE NOT NULL,
    email               TEXT UNIQUE NOT NULL,
    user_pass           TEXT UNIQUE NOT NULL
);

CREATE TABLE roles (
    rol_id              SERIAL PRIMARY KEY UNIQUE NOT NULL, 
    rol_name            TEXT UNIQUE NOT NULL, 
    permissions         INT NOT NULL
);


CREATE TABLE projects (
    project_id          SERIAL PRIMARY KEY UNIQUE NOT NULL,
    project_name        TEXT UNIQUE NOT NULL, 
    project_init_date   DATE NOT NULL, 
    project_end_date    DATE NULL
);

CREATE TABLE users_projects (
    user_id             INT NOT NULL, 
    project_id          INT NOT NULL ,
    UNIQUE(user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects (project_id) ON DELETE CASCADE ON UPDATE CASCADE
);


DROP TABLE users;
DROP TABLE projects;
DROP TABLE roles;
DROP TABLE users_projects;

SELECT * FROM users;

INSERT INTO users(username, email, user_pass) VALUES ('pacho', 'alfrrugu@hotmail.com', 'pacho123');
INSERT INTO users(username, email, user_pass) VALUES ('alejandro', 'alex.ruiz@hotmail.com', 'alex123');