-- ======================
-- 8) PANIER
-- ======================
INSERT INTO "Panier" ("count","utilisateurId","produitId","boutiqueId")
VALUES
  (2, 4, 2, 1),  -- Alice Evans (user #4) veut 2x Produit #2 dans Boutique #1
  (1, 2, 1, 3),  -- Jane Smith (user #2) veut 1x Produit #1 dans Boutique #3
  (3, 1, 5, 3);  -- John Doe (user #1) veut 3x Produit #5 dans Boutique #3
