# Instructions de Test - Extension AegisScan

## Problème à Résoudre
L'utilisateur signale que lorsqu'il clique sur un lien dans le navigateur, il reçoit le message "session expirée" même s'il est connecté dans l'application Tauri.

## Améliorations Apportées

### 1. Amélioration de la Validation des Tokens
- Ajout d'une marge de sécurité de 60 secondes pour l'expiration des tokens
- Meilleure gestion des tokens invalides ou expirés
- Logs détaillés pour le debugging

### 2. Amélioration de la Synchronisation
- Système de confirmation pour la synchronisation des tokens
- Gestion des échecs de synchronisation avec messages d'erreur détaillés
- Timeout de 5 secondes pour éviter les blocages

### 3. Interface Utilisateur Améliorée
- Boutons de synchronisation et détection avec feedback visuel
- Bouton de debug pour vérifier le statut du token local
- Messages d'état plus informatifs

## Comment Tester

### 1. Prérequis
- Backend en cours d'exécution sur http://localhost:3000
- Frontend en cours d'exécution sur http://localhost:5174
- Extension AegisScan installée dans le navigateur

### 2. Installation de l'Extension
1. Ouvrir Chrome/Edge
2. Aller dans les Extensions (chrome://extensions/)
3. Activer le "Mode développeur"
4. Cliquer sur "Charger l'extension non empaquetée"
5. Sélectionner le dossier `aegisscan-non-blocking`

### 3. Test de Base
1. Ouvrir http://localhost:5174 dans le navigateur
2. Se connecter à l'application
3. Vérifier que l'indicateur d'extension montre "Protection automatique active"
4. Si non, cliquer sur "Détecter" puis "Synchroniser"

### 4. Test de Synchronisation
1. Cliquer sur le bouton "Debug" pour vérifier le token local
2. Cliquer sur "Synchroniser" et vérifier les logs dans la console
3. Ouvrir la console du navigateur (F12) pour voir les logs détaillés

### 5. Test de l'Extension
1. Ouvrir http://localhost:5174/test-extension.html
2. Cliquer sur "Vérifier Extension" pour confirmer que l'extension est détectée
3. Cliquer sur "Test Synchronisation Token" pour tester la communication
4. Tester les liens fournis sur la page

### 6. Test Réel
1. Aller sur n'importe quel site web
2. Cliquer sur un lien externe
3. Vérifier que l'extension analyse le lien sans erreur "session expirée"

## Debugging

### Console du Navigateur
Ouvrir F12 et chercher les messages commençant par:
- `[AegisScan Extension]` - Messages de l'extension
- `[AegisScan]` - Messages du background script
- `[AuthService]` - Messages du service d'authentification

### Messages Attendus
- ✅ Extension détectée
- ✅ Token synchronisé avec succès
- ✅ Lien analysé sans erreur

### Messages d'Erreur Courants
- ❌ Extension non prête pour sync token
- ❌ Token expiré ou invalide
- ❌ Échec de synchronisation

## Solutions aux Problèmes Courants

### Extension Non Détectée
1. Vérifier que l'extension est bien installée et activée
2. Actualiser la page web
3. Cliquer sur "Détecter" dans le dashboard

### Token Non Synchronisé
1. Vérifier que le token local est valide (bouton Debug)
2. Se reconnecter si le token est expiré
3. Cliquer sur "Synchroniser" manuellement

### Session Expirée sur les Liens
1. Vérifier les logs de la console pour identifier le problème exact
2. S'assurer que la synchronisation a bien eu lieu
3. Tester avec la page de test d'abord

## Fichiers Modifiés
- `aegisscan-non-blocking/background.js` - Amélioration validation tokens
- `aegisscan-non-blocking/content.js` - Meilleure gestion des messages
- `frontend/src/services/extensionSync.ts` - Système de confirmation
- `frontend/src/services/authService.ts` - Logs détaillés
- `frontend/src/pages/Dashboard.tsx` - Interface améliorée
- `frontend/public/test-extension.html` - Page de test (nouveau)