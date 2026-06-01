const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialiser OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running ✅' });
});

// Route pour générer une histoire
app.post('/api/generate-story', async (req, res) => {
  try {
    const { keywords, language = 'fr' } = req.body;

    if (!keywords || keywords.trim() === '') {
      return res.status(400).json({ error: 'Les mots-clés sont requis' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'Clé API OpenAI non configurée',
        details: 'Veuillez ajouter OPENAI_API_KEY dans le fichier .env'
      });
    }

    const prompt = language === 'fr'
      ? `Écris une histoire courte et captivante (300-400 mots) basée sur ces mots-clés: ${keywords}. La histoire doit être originale, engageante, créative et adaptée à tous les âges.`
      : `Write a short and captivating story (300-400 words) based on these keywords: ${keywords}. The story should be original, engaging, creative and suitable for all ages.`;

    const message = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: language === 'fr' 
            ? 'Tu es un écrivain créatif et imaginatif. Tu génères des histoires uniques, engageantes et bien structurées.'
            : 'You are a creative and imaginative writer. You generate unique, engaging and well-structured stories.'
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    const story = message.choices[0].message.content;

    res.json({
      success: true,
      story,
      keywords,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erreur OpenAI:', error.message);
    
    if (error.status === 401) {
      return res.status(401).json({
        error: 'Clé API OpenAI invalide',
        details: 'Veuillez vérifier votre clé API dans le fichier .env'
      });
    }
    
    if (error.status === 429) {
      return res.status(429).json({
        error: 'Trop de requêtes',
        details: 'Veuillez attendre avant de réessayer'
      });
    }

    res.status(500).json({
      error: 'Erreur lors de la génération de l\'histoire',
      details: error.message,
    });
  }
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend lancé sur http://localhost:${PORT}`);
  console.log(`📝 Route disponible: POST /api/generate-story`);
  console.log(`🏥 Health check: GET /api/health`);
});
