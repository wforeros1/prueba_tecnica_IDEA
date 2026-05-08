import { REGIONS } from '../types/country';
import type { SortOption } from '../types/country';
import './FilterControls.css';

interface FilterControlsProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name_asc',  label: 'A → Z' },
  { value: 'name_desc', label: 'Z → A' },
  { value: 'pop_desc',  label: 'Mayor Población' },
  { value: 'pop_asc',   label: 'Menor Población' },
];

export const FilterControls = ({
  selectedRegion,
  onRegionChange,
  selectedSort,
  onSortChange,
}: FilterControlsProps) => {
  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label className="filter-label" htmlFor="region-select">Filtrar por región</label>
        <select
          id="region-select"
          className="filter-select"
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
        >
          <option value="">Todas las regiones</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <span className="filter-label">Ordenar por</span>
        <div className="sort-buttons" role="group" aria-label="Opciones de ordenamiento">
          {SORT_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              id={`sort-${value}`}
              className={`sort-btn ${selectedSort === value ? 'active' : ''}`}
              onClick={() => onSortChange(selectedSort === value ? '' : value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
