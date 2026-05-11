# AegisScan - Extension de Protection des Liens

Extension navigateur qui analyse automatiquement tous les liens avant ouverture et bloque les liens malveillants détectés par l'API AegisScan.

---

## 🚀 Installation Rapide

### Étape 1 : Préparer les icônes
Les icônes sont nécessaires pour l'extension. Vous pouvez :

**Option A - Créer avec Python (recommandé) :**
```bash
cd link-guard
pip install Pillow
python create-icons.py
```

**Option B - Utiliser des icônes temporaires :**
Créez 3 fichiers PNG simples (16x16, 48x48, 128x128) dans le dossier `icons/` nommés `icon16.png`, `icon48.png`, `icon128.png`.

### Étape 2 : Installer l'extension

**Chrome :**
1. Ouvrez `chrome://extensions`
2. Activez **Mode développeur** (interrupteur en haut à droite)
3. Cliquez **Charger l'extension non empaquetée**
4. Sélectionnez le dossier `link-guard/`

**Edge :**
1. Ouvrez `edge://extensions`
2. Activez **Mode développeur** (barre latérale gauche)
3. Cliquez **Charger l'extension décompressée**
4. Sélectionnez le dossier `link-guard/`

### Étape 3 : Se connecter à AegisScan
1. Ouvrez votre application AegisScan (`http://localhost:1420`)
2. Connectez-vous à votre compte
3. L'extension se synchronisera automatiquement avec votre token

---

## 🎯 Comment ça fonctionne

### Liens Sûrs
- ✅ **Toast verte** apparaît en haut à droite : "Lien sûr"
- ⏱️ **Disparaît après 3 secondes**
- 🌐 **Navigation normale** vers le lien

### Liens Dangereux/Suspects
- 🚨 **Popup de blocage** avec détails de l'analyse
- 📊 **Informations détaillées** : niveau de risque, score, verdict
- 🛡️ **Bouton "Rester en sécurité"** : ferme la popup, lien non ouvert
- ⚠️ **Bouton "Ouvrir quand même"** : force l'ouverture malgré l'alerte

### Erreurs de Connexion
- ⚠️ **Toast orange** : "Erreur d'analyse - Session expirée"
- 🔄 **Navigation après 2 secondes** (fail-safe)

---

## 🔧 Configuration

L'extension utilise votre API AegisScan locale :
- **URL API** : `http://localhost:3000/analyse-lien/process`
- **Authentification** : Token JWT synchronisé depuis l'application web
- **Cache** : 5 minutes pour éviter les analyses répétées

---

## 📊 Statut dans l'Application

Dans votre dashboard AegisScan, vous verrez :
- 🟢 **"Protection automatique active"** si l'extension est détectée
- 🟠 **"Extension navigateur non détectée"** avec bouton d'installation

---

## 🔍 Test de l'Extension

1. **Vérifiez l'installation** : L'icône AegisScan doit apparaître dans la barre d'outils
2. **Cliquez sur l'icône** : La popup doit afficher "Protection active"
3. **Testez un lien sûr** : Cliquez sur https://www.google.com → toast verte
4. **Testez un lien suspect** : Créez un lien vers une URL suspecte → popup de blocage

---

## 🛠️ Dépannage

### L'extension ne fonctionne pas
- ✅ Vérifiez que l'application AegisScan fonctionne (`http://localhost:1420`)
- ✅ Connectez-vous dans l'application web
- ✅ Rechargez la page après installation de l'extension
- ✅ Vérifiez la console navigateur (F12) pour les erreurs

### Pas de toast/popup
- ✅ L'extension est-elle activée dans `chrome://extensions` ?
- ✅ Avez-vous cliqué sur un vrai lien `<a href="...">` ?
- ✅ Le lien n'est-il pas une ancre locale (`#section`) ?

### Token expiré
- ✅ Reconnectez-vous dans l'application AegisScan
- ✅ Le token se synchronise automatiquement

---

## 📁 Structure des Fichiers

```
link-guard/
├── manifest.json       ← Configuration de l'extension
├── background.js       ← Service Worker (API calls)
├── content.js          ← Intercepteur de clics
├── popup.html          ← Interface de l'extension
├── popup.js            ← Logique de la popup
├── icons/              ← Icônes PNG (16, 48, 128px)
├── create-icons.py     ← Générateur d'icônes
└── README.md           ← Ce fichier
```

---

## 🔒 Permissions Expliquées

| Permission | Utilisation |
|------------|-------------|
| `tabs` | Lire les URLs des onglets |
| `webNavigation` | Surveiller la navigation |
| `storage` | Stocker le token JWT |
| `<all_urls>` | Injecter le script sur tous les sites |

---

## 🚀 Prochaines Étapes

- [ ] **Publication** : Empaqueter pour Chrome Web Store
- [ ] **Statistiques** : Compteur de liens analysés/bloqués
- [ ] **Whitelist** : Domaines toujours autorisés
- [ ] **Notifications** : Alertes système pour menaces critiques
- [ ] **Historique** : Voir les analyses dans l'extension

---

**Note** : Cette extension fonctionne uniquement avec l'application AegisScan en cours d'exécution. Assurez-vous que votre serveur backend (`http://localhost:3000`) et votre application frontend (`http://localhost:1420`) sont démarrés.
