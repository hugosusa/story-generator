import React, { useState, useEffect } from 'react';
import './App.css';
import StoryForm from './components/StoryForm';
import StoryDisplay from './components/StoryDisplay';

function App() {
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [keywords, setKeywords] = useState('');
  const [serverStatus, setServerStatus] = useState('checking');

  // Vérifier la connexion au serveur au démarrage
  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    try {
      const response = await fetch('/api/health');
      if (response.ok) {
        setServerStatus('ok');
      } else {
        setServerStatus('error');
      }
    } catch (err) {
      setServerStatus('error');
      console.warn('Serveur backend non accessible');
    }
  };

  const handleGenerateStory = async (inputKeywords) => {
    setLoading(true);
    setError('');
    setStory('');
    setKeywords(inputKeywords);

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keywords: inputKeywords,
          language: 'fr',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Une erreur est survenue');
        if (data.details) {
          console.error('Détails:', data.details);
        }
      } else {
        setStory(data.story);
      }
    } catch (err) {
      setError('Erreur de connexion au serveur backend. Vérifiez qu\'il est démarré sur le port 5000.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>📖 Story AI Generator</h1>
        <p>Écrivez quelques mots et laissez l\'IA créer une histoire</p>
        {serverStatus === 'error' && (
          <div className="server-warning">
            ⚠️ Serveur backend non accessible. Assurez-vous qu\'il est démarré.
          </div>
        )}
      </header>

      <main className="container">
        <StoryForm onGenerateStory={handleGenerateStory} loading={loading} />
        {error && <div className="error-message">{error}</div>}
        {story && <StoryDisplay story={story} keywords={keywords} />}
      </main>

      <footer className="footer">
        <p>Créé par <strong>hugosusa</strong> | Alimenté par OpenAI GPT-3.5</p>
      </footer>
    </div>
  );
}

export default App;
