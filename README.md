The permissions managed on every single project are structure on a SMALLINT where each bit
represent a certain permission/privilege, so if that bit is a 1 it means that the user got
permission to perform that operation, 0 if not.

1. View Tasks (bit 0): Allows the user to view tasks in the project.
2. Edit Tasks (bit 1): Allows the user to modify existing tasks.
3. Create Tasks (bit 2): Allows the user to create new tasks in the project.
4. Delete Tasks (bit 3): Allows the user to delete tasks.
5. Assign Tasks (bit 4): Allows the user to assign tasks to other users.
6. Mark Tasks as Complete (bit 5): Allows the user to confirm or mark tasks as complete.
7. View Project Details (bit 6): Allows the user to view general project details (deadlines, milestones, etc.).
8. Edit Project Details (bit 7): Allows the user to edit project settings (deadline, description, etc.).
9. Add/Remove Users (bit 8): Allows the user to add or remove team members.
10. Manage Roles (bit 9): Allows the user to assign or modify user roles in the project.
11. Create Branches/Phases (bit 10): Allows the user to create new project branches or phases.
12. Delete Branches/Phases (bit 11): Allows the user to delete existing project branches or phases.
13. View Reports (bit 12): Allows the user to view project progress reports.
14. Generate Reports (bit 13): Allows the user to generate new reports.
15. Manage Permissions (bit 14): Allows the user to modify permission settings for other users.
16. Manage Budget/Resources (bit 15): Allows the user to edit the budget or allocate resources for the project.
