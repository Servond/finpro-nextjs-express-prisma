import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onClear }) => {
  return (
    <div className="relative flex flex-grow mb-2 md:mb-0">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-600" />
      <input
        name="searchQuery"
        className="flex-grow bg-red-100 text-black rounded-full border-r-2 lg:rounded-r-none lg:rounded-l-full md:rounded-r-none md:rounded-l-full border-white outline-none text-sm pl-12 py-3 placeholder-slate-600"
        placeholder="Search your events"
        value={value}
        onChange={onChange}
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

export default SearchInput;
