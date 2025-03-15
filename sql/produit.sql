-- ======================
-- 6) PRODUIT
-- ======================
INSERT INTO "Produit" ("nom", "description", "img", "tags", "categorieId", "createdAt", "updatedAt")
VALUES 
  ('Chaussures de sport', 'Pour la course et le fitness', 'https://example.com/images/shoes1.png', '{"sport","course"}'::text[], 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('T-shirt coton bio', 'T-shirt confortable 100% coton bio', 'https://example.com/images/tshirt1.png', '{"coton","bio"}'::text[], 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Sac à dos randonnée', 'Grand sac à dos idéal pour la marche en montagne', 'https://example.com/images/backpack1.png', '{"randonnée","plein-air"}'::text[], 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('Smartphone X100', 'Téléphone avec écran 6.5 pouces, Android', 'https://example.com/images/phone1.png', '{"smartphone","android"}'::text[], 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
          ('Casque Bluetooth', 'Casque sans fil, réduction de bruit active', 'https://example.com/images/headphones1.png', '{"audio","bluetooth"}'::text[], 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            ('Tablette Graphique', 'Pour dessin et retouche photo', 'https://example.com/images/tablette1.png', '{"dessin","graphique"}'::text[], 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
              ('Lunettes de soleil', 'Protection UV 400, style aviateur', 'https://example.com/images/sunglasses1.png', '{"mode","soleil"}'::text[], 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                ('Sneakers urbains', 'Baskets confortables pour usage quotidien', 'https://example.com/images/sneakers1.png', '{"sneakers","street"}'::text[], 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                  ('Blouson cuir', 'Veste en cuir véritable, coupe motard', 'https://example.com/images/jacket1.png', '{"mode","cuir"}'::text[], 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                    ('Machine à café', 'Expresso automatique, 15 bars de pression', 'https://example.com/images/coffeemachine1.png', '{"cuisine","café"}'::text[], 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                      ('Montre connectée S2', 'Suivi d''activité, notifications, GPS intégré', 'https://example.com/images/watch1.png', '{"montre","sport"}'::text[], 11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                        ('Livre de cuisine', 'Recettes gourmandes pour débutants', 'https://example.com/images/book1.png', '{"cuisine","livre"}'::text[], 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                          ('Appareil photo Reflex', 'Boîtier APS-C 24MP, idéal pour la photo amateur', 'https://example.com/images/camera1.png', '{"photo","reflex"}'::text[], 13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                            ('Batterie externe 10000mAh', 'Recharge rapide, format compact', 'https://example.com/images/powerbank1.png', '{"batterie","portable"}'::text[], 14, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                              ('Chaise de bureau ergonomique', 'Support lombaire, hauteur réglable', 'https://example.com/images/officechair1.png', '{"bureau","confort"}'::text[], 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                ('Lampe LED de chevet', 'Design minimaliste, lumière chaude', 'https://example.com/images/lamp1.png', '{"lampe","led"}'::text[], 16, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                  ('Jeu de société familial', 'De 2 à 4 joueurs, dès 8 ans', 'https://example.com/images/boardgame1.png', '{"jeu","famille"}'::text[], 17, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                    ('Enceinte Bluetooth étanche', 'Idéal pour la piscine, autonomie 10h', 'https://example.com/images/speaker1.png', '{"musique","bluetooth"}'::text[], 18, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                      ('Casquette en coton', 'Casquette unisexe, taille ajustable', 'https://example.com/images/cap1.png', '{"mode","coton"}'::text[], 19, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                        ('Bracelet fitness', 'Suivi rythme cardiaque, podomètre, calories', 'https://example.com/images/bracelet1.png', '{"sport","fitness"}'::text[], 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)