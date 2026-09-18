Markdown
# Quick Poll — Sondages Express


## Prérequis
- **Node.js** 
- **npm**

## Installation et Lancement

### 1. Backend (Express & TypeScript)
```bash
cd backend
npm install
npm run dev
Le serveur backend démarre sur http://localhost:3001.
2. Frontend (React & Vite)
Dans un autre terminal :
Bash
cd frontend
npm install
npm run dev
L'application client démarre sur http://localhost:5173.
 Surface de l'API REST
TABLEAU : 
Méthode	Route	Description	Codes HTTP possibles
GET	/api/polls	Récupère tous les sondages (triés par plus récent).	200 (Succès)
POST	/api/polls	Crée un nouveau sondage.	201 (Créé), 400 (Données invalides)
GET	/api/polls/:id	Récupère le détail d'un sondage et ses statistiques.	200 (Succès), 404 (Introuvable)
POST	/api/polls/:id/votes	Enregistre un vote pour un choix.	200 (Succès), 400 (Invalide), 404 (Introuvable)
DELETE	/api/polls/:id	Supprime un sondage et ses votes associés.	204 (Supprimé), 404 (Introuvable)
