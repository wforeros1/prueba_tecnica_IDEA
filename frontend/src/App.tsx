import './App.css';
import { CountryCard } from './components/CountryCard';

// Temporary mock data for testing the UI aesthetics
const mockCountries = [
  {
    name: "Colombia",
    capital: "Bogotá",
    region: "Americas",
    population: 50882884,
    flagUrl: "https://flagcdn.com/w320/co.png"
  },
  {
    name: "Japan",
    capital: "Tokyo",
    region: "Asia",
    population: 125836026,
    flagUrl: "https://flagcdn.com/w320/jp.png"
  },
  {
    name: "Germany",
    capital: "Berlin",
    region: "Europe",
    population: 83240525,
    flagUrl: "https://flagcdn.com/w320/de.png"
  },
  {
    name: "New Zealand",
    capital: "Wellington",
    region: "Oceania",
    population: 5084300,
    flagUrl: "https://flagcdn.com/w320/nz.png"
  },
  {
    name: "Senegal",
    capital: "Dakar",
    region: "Africa",
    population: 16743930,
    flagUrl: "https://flagcdn.com/w320/sn.png"
  },
  {
    name: "Canada",
    capital: "Ottawa",
    region: "Americas",
    population: 38005238,
    flagUrl: "https://flagcdn.com/w320/ca.png"
  }
];

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Country Explorer</h1>
        <p className="subtitle">Discover facts about nations across the globe.</p>
      </header>

      <div className="controls">
        <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem' }}>
          Filters and Search UI will be placed here in the next block
        </div>
      </div>

      <main className="countries-grid">
        {mockCountries.map((country, index) => (
          <CountryCard
            key={index}
            name={country.name}
            capital={country.capital}
            region={country.region}
            population={country.population}
            flagUrl={country.flagUrl}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
