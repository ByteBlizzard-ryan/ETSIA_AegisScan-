INSERT INTO utilisateurs (
    id_utilisateur, 
    nom_utilisateur, 
    email, 
    mot_de_passe_hash, 
    type_compte, 
    est_actif, 
    consentement_analyse
) VALUES (
    gen_random_uuid(), -- Génère un ID unique automatiquement
    'GabyBryan', 
    'gaby@example.com', 
    'qwertyuiop1234', -- Rappel : ne mets pas le vrai mot de passe en clair !
    'utilisateur', 
    true, 
    true
);