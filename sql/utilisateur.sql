-- ======================
-- 1) UTILISATEUR
-- ======================
INSERT INTO "Utilisateur" ("nom", "prenom", "telephone", "email", "password", "profile","updatedAt")
VALUES 
  ('Doe', 'John', '0600000001', 'john.doe@example.com', 'password123', 'CLIENT',NOW()),
  ('Smith', 'Jane', '0600000002', 'jane.smith@example.com', 'password123', 'BOUTIQUIER',NOW()),
  ('Brown', 'Charlie', '0600000003', 'charlie.brown@example.com', 'password123', 'ADMIN',NOW()),
  ('Evans', 'Alice', '0600000004', 'alice.evans@example.com', 'password123', 'CLIENT',NOW());
