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

CREATE TABLE tasks (
    task_id         SERIAL PRIMARY KEY, 
    task_title      VARCHAR(50) NOT NULL,
    task_descp      VARCHAR(300) NOT NULL,
    task_init       TIMESTAMP NOT NULL,
    task_end        TIMESTAMP,
    project_id      INT NOT NULL,
    task_creator    INT NOT NULL, 
    FOREIGN KEY (project_id) REFERENCES projects (project_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE tasks_user (
    task_id         INT NOT NULL,
    user_id         INT NOT NULL,
    done            BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks (task_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_invitations (
    user_id         INT NOT NULL,
    project_id      INT NOT NULL,
    inviter         INT NOT NULL,
    accepted        CHAR(1) NOT NULL DEFAULT 'P', 
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects (project_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (inviter) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- accepted can hold three posible values:
--      A = ACCEPTED
--      P = PENDING
--      D = DECLINE

DROP TABLE user_invitations

UPDATE tasks_user
SET done = FALSE
