import './CountryCard.css';

interface CountryProps {
  name: string;
  capital: string;
  region: string;
  population: number;
  flagUrl: string;
}

function formatPopulation(pop: number): string {
  if (pop >= 1_000_000_000) return (pop / 1_000_000_000).toFixed(1) + 'B';
  if (pop >= 1_000_000)     return (pop / 1_000_000).toFixed(1) + 'M';
  if (pop >= 1_000)         return (pop / 1_000).toFixed(1) + 'K';
  return pop.toLocaleString();
}

export const CountryCard = ({
  name,
  capital,
  region,
  population,
  flagUrl,
}: CountryProps) => {
  return (
    <article className="country-card">
      {/* ── Image section ── */}
      <div className="card-image-wrapper">
        <img
          src={flagUrl}
          alt={`Bandera de ${name}`}
          className="country-flag"
          loading="lazy"
        />
        {/* Badge flag in corner */}
        <div className="flag-badge" aria-hidden="true">
          <img src={flagUrl} alt="" />
        </div>
      </div>

      {/* ── Content section ── */}
      <div className="card-content">
        <h3 className="country-name">{name}</h3>

        <dl className="country-details">
          <div className="detail-row">
            <dt className="detail-label">Capital</dt>
            <dd className="detail-value">{capital || 'N/A'}</dd>
          </div>
          <div className="detail-row">
            <dt className="detail-label">Región</dt>
            <dd className="detail-value">{region}</dd>
          </div>
          <div className="detail-row">
            <dt className="detail-label">Población</dt>
            <dd className="detail-value">{formatPopulation(population)}</dd>
          </div>
        </dl>

      </div>
    </article>
  );
};
