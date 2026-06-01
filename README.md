# Story AI Generator 📖

Un site où les visiteurs écrivent quelques mots et le site génère une histoire complète avec l'IA.

## 🚀 Tech Stack
- **Frontend**: React 18
- **Backend**: Node.js + Express
- **API**: OpenAI GPT-3.5

## 📋 Fonctionnalités
- ✨ Génération d'histoires basée sur des mots-clés
- 📱 Interface responsive et moderne
- 💾 Copier et télécharger les histoires
- 🎨 Design gradient élégant

## 🔧 Installation

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## ⚙️ Configuration

### 1. Clé API OpenAI
1. Obtenez une clé API sur [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Créez un fichier `.env` dans le dossier `backend`:

```env
OPENAI_API_KEY=sk-votre_clé_api
PORT=5000
```

### 2. Démarrer le projet

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

## 📖 Utilisation

1. Ouvrez http://localhost:3000
2. Entrez des mots-clés (ex: "dragon, forêt, trésor")
3. Cliquez sur "Générer une histoire"
4. L'IA crée une histoire basée sur vos mots
5. Copiez ou téléchargez l'histoire

## 📁 Structure du projet

```
story-generator/
├── backend/
│   ├── server.js          # Serveur Express
│   ├── package.json       # Dépendances Node
│   └── .env.example       # Template .env
├── frontend/
│   ├── src/
│   │   ├── App.js         # Composant principal
│   │   ├── components/
│   │   │   ├── StoryForm.js      # Formulaire d'entrée
│   │   │   └── StoryDisplay.js   # Affichage de l'histoire
│   │   └── index.js       # Entry point React
│   └── package.json       # Dépendances React
└── README.md
```

## 🔌 API Endpoints

### `POST /api/generate-story`
Génère une histoire basée sur des mots-clés.

**Request:**
```json
{
  "keywords": "dragon, château",
  "language": "fr"
}
```

**Response:**
```json
{
  "success": true,
  "story": "Il était une fois...",
  "keywords": "dragon, château"
}
```

## 📄 License
MIT

## 👤 Auteur
hugosusa
