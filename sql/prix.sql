-- ======================
-- 7) PRIX
-- ======================
INSERT INTO "Prix" ("prix","quantiter","produitId","boutiqueId")
VALUES
  (49.99,  100, 1, 1), -- Produit #1 dans Boutique #1
  (19.99,   50, 2, 1), -- Produit #2 dans Boutique #1
  (79.90,  200, 3, 2), -- Produit #3 dans Boutique #2
  (999.00,  10, 4, 2), -- Produit #4 dans Boutique #2
  (25.00,   80, 5, 3), -- Produit #5 dans Boutique #3
  (65.00,   30, 1, 3); -- Produit #1 (Chaussures sport) aussi dispo dans Boutique #3
