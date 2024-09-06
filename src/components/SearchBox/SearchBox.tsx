import React, { useCallback } from 'react';
import './SearchBox.css';

interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const SearchBox: React.FC<SearchBoxProps> = React.memo(({ searchTerm, setSearchTerm, onSubmit, inputRef }) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  return (
    <form onSubmit={onSubmit} className="search-box">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search places..."
        ref={inputRef}
      />
      <span className="keyboard-shortcut">Ctrl + /</span>
    </form>
  );
});

export default SearchBox;