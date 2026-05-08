import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { CountryCard } from './components/CountryCard';
import { SearchBar } from './components/SearchBar';
import { FilterControls } from './components/FilterControls';
import { fetchCountries } from './services/countriesApi';
import type { Country, SortOption } from './types/country';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSort, setSelectedSort] = useState<SortOption>('');

  // Fetch from NestJS backend when region or sort changes
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCountries(selectedRegion, selectedSort);
        setCountries(data);
      } catch (err) {
        setError('No se pudo conectar con el servidor. Asegúrate de que el backend está corriendo en http://localhost:3000');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [selectedRegion, selectedSort]);

  // Client-side search filter (real-time, by name)
  const filteredCountries = useMemo(() => {
    if (!search.trim()) return countries;
    const term = search.toLowerCase();
    return countries.filter((c) => c.name.toLowerCase().includes(term));
  }, [countries, search]);

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Country Explorer</h1>
        <p className="subtitle">
          Explora datos de {countries.length > 0 ? countries.length : '...'} naciones alrededor del mundo.
        </p>
      </header>

      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <FilterControls
          selectedRegion={selectedRegion}
          onRegionChange={(r) => { setSelectedRegion(r); setSearch(''); }}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
        />
      </div>

      {loading && (
        <div className="state-container">
          <div className="spinner" aria-label="Cargando..." />
          <p className="state-text">Cargando países...</p>
        </div>
      )}

      {error && !loading && (
        <div className="state-container error-state">
          <p className="state-text">⚠️ {error}</p>
        </div>
      )}

      {!loading && !error && filteredCountries.length === 0 && (
        <div className="state-container">
          <p className="state-text">No se encontraron países con ese nombre.</p>
        </div>
      )}

      {!loading && !error && filteredCountries.length > 0 && (
        <main className="countries-grid">
          {filteredCountries.map((country) => (
            <CountryCard
              key={country.name}
              name={country.name}
              capital={country.capital}
              region={country.region}
              population={country.population}
              flagUrl={country.flag}
            />
          ))}
        </main>
      )}
    </div>
  );
}

export default App;
