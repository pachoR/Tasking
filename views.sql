
CREATE VIEW projectsUser AS
    SELECT username AS "username", p.project_id AS "project_id", project_name AS "project", rol_name AS "rol", permissions AS "permissions", project_init_date AS "start_date", project_end_date AS "end_date"
    FROM users AS u
    INNER JOIN users_projects AS up ON u.user_id = up.user_id
    INNER JOIN projects AS p ON p.project_id = up.project_id
    INNER JOIN roles AS r ON up.rol_id = r.rol_id

SELECT * from projectsUser
-- Retrieves the all the tasks from each project
CREATE VIEW tasks_projects AS 
    SELECT p.project_name AS "project", u.username AS "username", t.task_id AS "task_id", t.task_title AS "task_title", t.task_descp AS "task_desc", 
    t.task_init AS "start_date", t.task_end AS "due_date", tu.done AS "done"
    FROM tasks as t 
    INNER JOIN tasks_user AS tu ON t.task_id = tu.task_id
    INNER JOIN projects AS p ON t.project_id = p.project_id
    INNER JOIN users AS u ON u.user_id = tu.user_id
    

CREATE OR REPLACE VIEW task_user AS 
    SELECT u.user_id AS "user_id", u.username AS "username", t.task_id AS "task_id", t.task_title AS "task_title", t.task_descp AS "task_descp", t.task_init AS "init_date",
    t.task_end AS "end_date", tu.done AS "done", p.project_id AS "project_id", p.project_name AS "project_name", uc.username AS "task_creator"
    FROM tasks AS t 
    INNER JOIN tasks_user AS tu ON t.task_id = tu.task_id
    INNER JOIN projects AS p ON t.project_id = p.project_id 
    INNER JOIN users AS u ON u.user_id = tu.user_id
    INNER JOIN users AS uc ON uc.user_id = t.task_creator


CREATE OR REPLACE VIEW invitations AS
    SELECT ui.invitation_id AS "invitation_id", u.user_id AS "user_id", u.username AS "username", p.project_id AS "project_id", p.project_name 
    AS "project_name", r.rol_name AS "rol_name", r.permissions AS "permissions", i.user_id AS "inviter_id", i.username AS "inviter_username", 
    ui.accepted AS "accepted"
    FROM user_invitations AS ui 
    INNER JOIN users AS u ON u.user_id = ui.user_id 
    INNER JOIN roles AS r ON r.rol_id = ui.rol_id
    INNER JOIN projects AS p ON p.project_id = ui.project_id 
    INNER JOIN users AS i ON u.user_id = i.user_id 

CREATE OR REPLACE VIEW tasks_view AS
    SELECT t.task_id AS "task_id", t.task_title AS "task_title", t.task_descp AS "task_descp", t.task_init AS "init_date", t.task_end AS "end_date", t.project_id AS "project_id",
    p.project_name AS "project_name", uc.username AS "task_creator"
    FROM tasks AS t 
    INNER JOIN projects AS p ON p.project_id = t.project_id
    INNER JOIN users AS uc ON uc.user_id = t.task_creator ORDER BY task_id

SELECT * FROM invitations