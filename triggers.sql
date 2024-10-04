CREATE OR REPLACE FUNCTION trigger_insert_projects()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO users_projects (user_id, project_id, rol_id)
    VALUES (NEW.project_creator, NEW.project_id, (SELECT rol_id FROM roles WHERE permissions = ~0));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_projects_insert
AFTER INSERT ON projects
FOR EACH ROW
EXECUTE FUNCTION trigger_insert_projects();

INSERT INTO projects (project_name, project_init_date, project_end_date, project_creator) VALUES ('Load', CURRENT_DATE, CURRENT_DATE + INTERVAL '21 days', 18);