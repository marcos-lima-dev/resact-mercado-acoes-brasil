// src/App.tsx

import React, { useEffect, useState } from 'react';
import { MarketList } from './components/MarketList';
import { marketAPI } from './services/api';
import { Company } from './components/MarketList/types';
import { Search, Filter, RefreshCw, Loader } from 'lucide-react';
import debounce from 'lodash/debounce';

const App = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await marketAPI.fetchCompanies();
      setCompanies(data);
      setFilteredCompanies(data);
      
    } catch (err) {
      setError('Erro ao carregar dados. Por favor, tente novamente.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Busca em tempo real com debounce
  const handleSearch = debounce((term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredCompanies(companies);
      return;
    }

    const filtered = companies.filter(company => {
      const searchableText = `${company.name} ${company.symbol} ${company.sector}`.toLowerCase();
      return searchableText.includes(term.toLowerCase());
    });
    setFilteredCompanies(filtered);
  }, 300);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                Mercado de Ações Brasil
              </h1>
              <button
                onClick={fetchData}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw size={18} />
                )}
                Atualizar
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Buscar por empresa ou código..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estado de Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Carregando empresas...</p>
          </div>
        )}

        {/* Estado de Erro */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Lista de Empresas */}
        {!loading && !error && (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {searchTerm && (
                <span className="text-blue-600">
                  Resultados para "{searchTerm}": {' '}
                </span>
              )}
              Exibindo {filteredCompanies.length} de {companies.length} empresas
            </div>

            <MarketList 
              companies={filteredCompanies}
              loading={loading}
              error={error}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;