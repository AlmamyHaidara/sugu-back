-- Création de la table si nécessaire (exemple)
-- CREATE TABLE "CategorieProduit" (
--     "id" SERIAL PRIMARY KEY,
--     "nom" VARCHAR(255) NOT NULL,
--     "description" TEXT
-- );

INSERT INTO "CategorieProduit" ("nom", "description") 
VALUES 
  ('Fruits', 'Produits issus des vergers, très variés et colorés.'),
  ('Légumes', 'Produits du potager, riches en vitamines.'),
  ('Boissons', 'Liquides en tout genre : jus, sodas, etc.'),
  ('Pâtisseries', 'Viennoiseries et gâteaux sucrés.'),
  ('Charcuterie', 'Viandes préparées, saucissons, jambons.'),
  ('Fromages', 'Produits laitiers affinés de différentes régions.'),
  ('Fruits de mer', 'Crustacés, mollusques et poissons.'),
  ('Épicerie', 'Condiments, conserves et articles d’épicerie sèche.'),
  ('Sauces', 'Assaisonnements liquides pour accompagner les plats.'),
  ('Produits bio', 'Aliments issus de l’agriculture biologique.'),
  ('Snacks', 'En-cas, chips et barres salées ou sucrées.'),
  ('Céréales', 'Blé, avoine, riz, maïs, etc.'),
  ('Produits surgelés', 'Articles conservés à très basse température.'),
  ('Confiseries', 'Bonbons, chocolats et autres sucreries.'),
  ('Plats cuisinés', 'Plats prêts à consommer, réchauffables.'),
  ('Biscuits', 'Biscuiteries sucrées ou salées.'),
  ('Végétarien', 'Produits adaptés à un régime sans viande.'),
  ('Vegan', 'Aliments sans aucun produit d’origine animale.'),
  ('Produits sans gluten', 'Aliments adaptés aux intolérances au gluten.'),
  ('Épices', 'Herbes aromatiques et assaisonnements variés.');
