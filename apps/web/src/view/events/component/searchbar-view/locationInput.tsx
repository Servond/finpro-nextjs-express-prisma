import React from 'react';
import { MapPin, X } from 'lucide-react';

interface LocationInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ value, onChange, onClear, onKeyDown }) => {
  return (
    <div className="relative flex flex-grow">
      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-600" />
      <input
        name="location"
        className="flex-grow bg-red-100 text-black rounded-full lg:rounded-r-none lg:rounded-l-none border-r-2 md:rounded-l-none md:rounded-r-none border-white outline-none text-sm pl-12 py-3 placeholder-slate-600"
        placeholder="Search by location"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {value && (
        <button
          type="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-600"
          onClick={onClear}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default LocationInput;
