// src/components/MarketList/index.tsx

import React, { useState } from 'react';
import { Company, MarketListProps } from './types';
import { formatCurrency, formatPercentage, formatVolume } from '../../utils/formatters';
import { CompanyDetails } from '../CompanyDetails';

// Mapa de gradientes por setor
const sectorGradients: { [key: string]: string } = {
  'Tecnologia': 'from-blue-500 to-indigo-600',
  'Financeiro': 'from-green-500 to-emerald-600',
  'Varejo': 'from-purple-500 to-violet-600',
  'Energia': 'from-yellow-500 to-amber-600',
  'Saúde': 'from-teal-500 to-cyan-600',
  'Construção': 'from-gray-500 to-gray-600',
  'Alimentos': 'from-lime-500 to-green-600',
  'Mineração': 'from-orange-500 to-red-600',
  'Industrial': 'from-slate-500 to-slate-600',
  'Bebidas': 'from-pink-500 to-rose-600',
  'Petróleo e Gás': 'from-red-500 to-red-700',
  'Siderurgia': 'from-zinc-500 to-zinc-700',
  'Papel e Celulose': 'from-emerald-500 to-green-700',
  'Telecomunicações': 'from-violet-500 to-purple-700',
  'Transportes': 'from-blue-400 to-blue-600',
  'Cosméticos': 'from-pink-400 to-pink-600',
  'Locação de Veículos': 'from-cyan-500 to-blue-600',
  'Educação': 'from-indigo-400 to-blue-600'
};

// Função para obter o gradiente baseado no setor
const getGradientBySetor = (sector: string): string => {
  return sectorGradients[sector] || 'from-gray-500 to-gray-600';
};

export const MarketList: React.FC<MarketListProps> = ({
  companies = [],
  loading = false,
  error = null
}) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                  Preço
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                  Variação 24h
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                  Volume
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {companies.map((company) => (
                <tr 
                  key={company.id}
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  onClick={() => setSelectedCompany(company)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex px-3 py-1 rounded-lg bg-gradient-to-r ${getGradientBySetor(company.sector)}`}>
                      <span className="text-sm font-medium text-white">
                        {company.symbol}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {company.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {company.sector}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(company.currentPrice)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`text-sm font-medium ${
                      company.change.percentage > 0 
                        ? 'text-green-600' 
                        : company.change.percentage < 0 
                        ? 'text-red-600' 
                        : 'text-gray-900'
                    }`}>
                      {formatPercentage(company.change.percentage)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm text-gray-900">
                      {formatVolume(company.volume)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {companies.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma empresa encontrada</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded mx-6"></div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-600">
            {error}
          </div>
        )}
      </div>

      {selectedCompany && (
        <CompanyDetails
          company={selectedCompany}
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </>
  );
};