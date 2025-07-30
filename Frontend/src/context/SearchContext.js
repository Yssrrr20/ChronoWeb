// src/context/SearchContext.js
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(0); 

  // Fungsi untuk memicu pencarian, bisa dipanggil dari mana saja
  const initiateSearch = (query) => {
    setSearchQuery(query);
    setTriggerSearch(prev => prev + 1); 
  };

  const contextValue = {
    searchQuery,
    setSearchQuery, 
    triggerSearch, 
    initiateSearch, 
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}