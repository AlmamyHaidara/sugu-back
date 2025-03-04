-- ======================
-- 10) LIGNECOMMAND
-- ======================
INSERT INTO "LigneCommand" ("prixId","commandeId","quantiter")
VALUES
  (1, 1, 2), -- commande #1, prixId #1 => 2 pièces
  (2, 1, 1), -- commande #1, prixId #2 => 1 pièce
  (5, 2, 3); -- commande #2, prixId #5 => 3 pièces
