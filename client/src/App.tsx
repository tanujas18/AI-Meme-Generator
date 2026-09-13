import { useMemeGenerator } from './hooks/useMemeGenerator';
import { Header } from './components/Header';
import { EmptyState } from './components/EmptyState';
import { CategoryPicker } from './components/CategoryPicker';
import { Spinner } from './components/Spinner';
import { MemeGallery } from './components/MemeGallery';
import { CATEGORIES, type Category } from './types/meme';
import './index.css';

function App() {
  const { memes, activeCategory, loading, error, generate } = useMemeGenerator();

  const hasMemes = memes.length > 0;
  const activeLabel = CATEGORIES.find((c) => c.value === activeCategory)?.label;

  const handleCategorySelect = (category: Category) => {
    generate(category);
  };

  const handleShuffle = () => {
    if (activeCategory) generate(activeCategory);
  };

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <section className="pitch" aria-labelledby="pitch-title">
          <h2 id="pitch-title" className="pitch__title">
            Instant memes, zero effort
          </h2>
          <p className="pitch__text">Choose a vibe and get five ready-to-share memes in seconds.</p>
        </section>

        <CategoryPicker
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
          disabled={loading}
        />

        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}

        {loading && <Spinner label={`Cooking up ${activeLabel ?? ''} memes…`} />}

        {!loading && hasMemes && (
          <MemeGallery memes={memes} activeLabel={activeLabel} onShuffle={handleShuffle} />
        )}

        {!loading && !hasMemes && !error && <EmptyState />}
      </main>

      <footer className="app-footer">
        Captions by AI via OpenRouter · Images by memegen.link
      </footer>
    </div>
  );
}

export default App;
