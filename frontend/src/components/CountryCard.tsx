import { MapPin, Users, Globe2 } from 'lucide-react';
import './CountryCard.css';

interface CountryProps {
  name: string;
  capital: string;
  region: string;
  population: number;
  flagUrl: string;
}

export const CountryCard = ({ 
  name, 
  capital, 
  region, 
  population, 
  flagUrl 
}: CountryProps) => {
  return (
    <div className="country-card">
      <div className="card-image-wrapper">
        <img src={flagUrl} alt={`Flag of ${name}`} className="country-flag" loading="lazy" />
        <div className="image-overlay"></div>
      </div>
      <div className="card-content">
        <h3 className="country-name" title={name}>{name}</h3>
        
        <div className="country-details">
          <div className="detail-item">
            <MapPin size={16} className="detail-icon" />
            <span>{capital || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <Globe2 size={16} className="detail-icon" />
            <span>{region}</span>
          </div>
          <div className="detail-item">
            <Users size={16} className="detail-icon" />
            <span>{population.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
