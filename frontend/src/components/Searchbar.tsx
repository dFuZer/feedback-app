import { useState } from "react";
import searchIcon from "../assets/icons/search.svg";
import "../css/Searchbar.css";

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    query:string;
    setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Rechercher...", onSearch, query, setQuery }) => {
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="search-input">
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} />
            <button type="submit" aria-label="Rechercher des feedbacks">
                <img src={searchIcon} alt="Rechercher" />
            </button>
        </form>
    );
};

export default SearchBar;
