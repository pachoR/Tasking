CREATE TABLE users (
    user_id             SERIAL PRIMARY KEY UNIQUE NOT NULL, 
    username            TEXT UNIQUE NOT NULL,
    email               TEXT UNIQUE NOT NULL,
    user_pass           TEXT UNIQUE NOT NULL
);

CREATE TABLE roles (
    rol_id              SERIAL PRIMARY KEY UNIQUE NOT NULL, 
    rol_name            TEXT UNIQUE NOT NULL, 
    permissions         SMALLINT NOT NULL
);


CREATE TABLE projects (
    project_id          SERIAL PRIMARY KEY UNIQUE NOT NULL,
    project_name        TEXT UNIQUE NOT NULL, 
    project_init_date   DATE NOT NULL, 
    project_end_date    DATE,
    project_creator     INT NOT NULL,
    FOREIGN KEY (project_creator) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE users_projects (
    user_id             INT NOT NULL, 
    project_id          INT NOT NULL ,
    rol_id              INT NOT NULL,
    UNIQUE(user_id, project_id),
    FOREIGN KEY (rol_id) REFERENCES roles (rol_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects (project_id) ON DELETE CASCADE ON UPDATE CASCADE
);


ALTER TABLE DELETE COLUMN project_creator

INSERT INTO roles (rol_name, permissions) VALUES ('Project Manager', ~0)

INSERT INTO projects (project_name, project_init_date, project_end_date) VALUES ('Tasking', CURRENT_DATE, CURRENT_DATE + INTERVAL '10 days');


CREATE VIEW projectsUser AS
    SELECT username AS "username", project_name AS "project", rol_name AS "rol", permissions AS "permissions", project_init_date AS "start_date", project_end_date AS "end_date"
    FROM users AS u
    INNER JOIN users_projects AS up ON u.user_id = up.user_id
    INNER JOIN projects AS p ON p.project_id = up.project_id
    INNER JOIN roles AS r ON up.rol_id = r.rol_id


SELECT * FROM projectsUser AS pU
LEFT JOIN users AS u ON pU.username = u.username
WHERE u.user_id = 18