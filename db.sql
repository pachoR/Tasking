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
    project_id          SERIAL PRIMARY KEY,
    project_name        TEXT NOT NULL, 
    project_init_date   DATE NOT NULL, 
    project_end_date    DATE,
    project_creator     INT NOT NULL,
    FOREIGN KEY (project_creator) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE(project_name, project_creator)
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

CREATE VIEW projectsUser AS
    SELECT username AS "username", p.project_id AS "project_id", project_name AS "project", rol_name AS "rol", permissions AS "permissions", project_init_date AS "start_date", project_end_date AS "end_date"
    FROM users AS u
    INNER JOIN users_projects AS up ON u.user_id = up.user_id
    INNER JOIN projects AS p ON p.project_id = up.project_id
    INNER JOIN roles AS r ON up.rol_id = r.rol_id

CREATE VIEW allUsersProjects AS
    SELECT p.project_id AS "project_id", p.project_name AS "project", u.username as "username"
    FROM users AS u
    INNER JOIN users_projects AS up ON u.user_id = up.user_id
    INNER JOIN projects AS p ON up.project_id = p.project_id

