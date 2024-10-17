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

INSERT INTO tasks (task_title, task_descp, task_init, task_end, project_id) VALUES ('IoT interconection', 'Connecting V1 devices with the main server', CURRENT_DATE, NULL, 9);

CREATE TABLE tasks (
    task_id         SERIAL PRIMARY KEY, 
    task_title      VARCHAR(50) NOT NULL,
    task_descp      VARCHAR(100) NOT NULL,
    task_init       TIMESTAMP NOT NULL,
    task_end        TIMESTAMP,
    project_id      INT NOT NULL,
    task_creator    INT NOT NULL, 
    FOREIGN KEY (project_id) REFERENCES projects (project_id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE tasks
ALTER COLUMN task_descp TYPE VARCHAR(300)

SELECT * FROM tasks

CREATE TABLE tasks_user (
    task_id         INT NOT NULL,
    user_id         INT NOT NULL,
    done            BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks (task_id) ON DELETE CASCADE ON UPDATE CASCADE
);
    
-- Retrieves the all the tasks from each project
CREATE VIEW tasks_projects AS 
    SELECT p.project_name AS "project", u.username AS "username", t.task_id AS "task_id", t.task_title AS "task_title", t.task_descp AS "task_desc", 
    t.task_init AS "start_date", t.task_end AS "due_date", tu.done AS "done"
    FROM tasks as t 
    INNER JOIN tasks_user AS tu ON t.task_id = tu.task_id
    INNER JOIN projects AS p ON t.project_id = p.project_id
    INNER JOIN users AS u ON u.user_id = tu.user_id
    

CREATE VIEW task_user AS 
    SELECT u.username AS "username", t.task_id AS "task_id", t.task_title AS "task_title", t.task_descp AS "task_descp", t.task_init AS "init_date",
    t.task_end AS "end_date", tu.done AS "done", p.project_id AS "project_id", p.project_name AS "project_name", uc.username AS "task_creator"
    FROM tasks AS t 
    INNER JOIN tasks_user AS tu ON t.task_id = tu.task_id
    INNER JOIN projects AS p ON t.project_id = p.project_id 
    INNER JOIN users AS u ON u.user_id = tu.user_id
    INNER JOIN users AS uc ON uc.user_id = t.task_creator


SELECT * FROM tasks

UPDATE tasks 
SET task_descp = 'Conecta sensores de temperatura, iluminación, movimiento y humedad a internet. Recopila datos en tiempo real a través de una plataforma centralizada. Automatiza acciones como encender luces, ajustar el termostato o activar sistemas de ventilación, optimizando el consumo energético del hogar'
WHERE task_id = 4