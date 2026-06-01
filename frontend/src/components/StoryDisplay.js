import React, { useState } from 'react';
import './StoryDisplay.css';

function StoryDisplay({ story, keywords }) {
  const [copyMessage, setCopyMessage] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(story);
    setCopyMessage('✅ Copié au presse-papiers!');
    setTimeout(() => setCopyMessage(''), 3000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([story], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `histoire_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="story-display">
      <div className="story-header">
        <h2>📚 Votre Histoire</h2>
        <p className="story-keywords">Mots-clés: <strong>{keywords}</strong></p>
      </div>

      <div className="story-content">
        {story}
      </div>

      <div className="story-actions">
        <button onClick={handleCopy} className="btn-action btn-copy">
          📋 Copier
        </button>
        <button onClick={handleDownload} className="btn-action btn-download">
          ⬇️ Télécharger
        </button>
      </div>

      {copyMessage && <div className="copy-message">{copyMessage}</div>}
    </div>
  );
}

export default StoryDisplay;
