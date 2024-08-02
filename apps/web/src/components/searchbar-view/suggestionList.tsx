import React from 'react';

interface SuggestionsListProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  onSuggestionClick,
}) => {
  return (
    <ul
      className={`absolute left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-md z-10 max-h-48 overflow-y-auto text-sm ${
        suggestions.length === 1 ? 'mt-20' : 'mt-56'
      }`}
    >
      {suggestions.map((suggestion) => (
        <li
          key={suggestion}
          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionsList;
