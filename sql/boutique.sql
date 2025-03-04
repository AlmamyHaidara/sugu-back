-- ======================
-- 3) BOUTIQUE
-- ======================
-- Suppose qu"on associe :
--   Boutique #1 => userId=2 (Jane Smith), countryId=1 (France)
--   Boutique #2 => userId=2 (Jane Smith), countryId=2 (US)
--   Boutique #3 => userId=3 (Charlie Brown), countryId=NULL (pas de pays)

INSERT INTO "Boutique" ("nom","categorie","location","img","description","phone","userId","countryId","updatedAt")
VALUES 
  ('La Mode Paris', 'DETAILLANT', 'NATIONAL', 'https://example.com/boutique1.png', 'Boutique de vêtements', '0601231234', 2, 1, NOW()),
    ('Global Shop', 'GROSSISTE', 'INTERNATIONAL', 'https://example.com/boutique2.png', 'Grossiste en électroménager', '0605675678', 2, 2, NOW()),
      ('Super Sport', 'DETAILLANT', 'NATIONAL', 'https://example.com/boutique3.png', 'Articles de sport divers', '0611111111', 3, NULL, NOW())