import React, { useState } from 'react';
import './StoryForm.css';

function StoryForm({ onGenerateStory, loading }) {
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keywords.trim()) {
      onGenerateStory(keywords);
    }
  };

  const exampleKeywords = [
    'Dragon, montagne, trésor',
    'Forêt enchantée, fée, magie',
    'Pirate, océan, île',
    'Robot, futur, aventure'
  ];

  const handleExample = (example) => {
    setKeywords(example);
  };

  return (
    <form className="story-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="keywords">Entrez vos mots-clés :</label>
        <textarea
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Exemple: dragon, forêt enchantée, trésor..."
          disabled={loading}
          className="input-keywords"
          rows="2"
        />
      </div>

      <div className="examples">
        <p>Exemples rapides :</p>
        <div className="example-buttons">
          {exampleKeywords.map((example, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleExample(example)}
              disabled={loading}
              className="btn-example"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !keywords.trim()}
        className="btn-generate"
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Génération en cours...
          </>
        ) : (
          '✨ Générer une histoire'
        )}
      </button>
    </form>
  );
}

export default StoryForm;
