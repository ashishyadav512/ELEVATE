import React, { createContext, useContext, useState } from 'react';
import { Product } from '@shared/schema';

type SearchContextType = {
  searchQuery: string;
  searchResults: Product[];
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  performSearch: (products: Product[]) => void;
  clearSearch: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = (products: Product[]) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const query = searchQuery.toLowerCase();
    
    const results = products.filter(product => {
      // Search product name
      if (product.name.toLowerCase().includes(query)) return true;
      
      // Search product description
      if (product.description?.toLowerCase().includes(query)) return true;
      
      // Search product short description
      if (product.shortDescription?.toLowerCase().includes(query)) return true;
      
      // Search product tags
      if (product.tags?.some(tag => tag.toLowerCase().includes(query))) return true;
      
      // Search in categoryId (could be expanded if you have category name in product)
      
      return false;
    });
    
    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        searchResults,
        isSearching,
        setSearchQuery,
        performSearch,
        clearSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};