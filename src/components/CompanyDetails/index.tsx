// src/components/CompanyDetails/index.tsx

import React from 'react';
import { Company } from '../MarketList/types';
import { formatCurrency, formatPercentage, formatVolume } from '../../utils/formatters';
import { X, TrendingUp, DollarSign, Users, Clock, Building, BarChart, Activity } from 'lucide-react';

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

const getGradientBySetor = (sector: string): string => {
  return sectorGradients[sector] || 'from-gray-500 to-gray-600';
};

interface CompanyDetailsProps {
  company: Company;
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyDetails: React.FC<CompanyDetailsProps> = ({
  company,
  isOpen,
  onClose
}) => {
  if (!isOpen || !company) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full md:rounded-xl md:shadow-xl md:w-full md:max-w-3xl mx-auto md:mx-4 relative overflow-hidden h-full md:h-auto">
        {/* Header Fixo */}
        <div className={`sticky top-0 p-4 md:p-6 bg-gradient-to-r ${getGradientBySetor(company.sector)} text-white`}>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">{company.name}</h2>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-white/20">
                  {company.symbol}
                </span>
                <span className="text-sm text-white/80">{company.sector}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Conteúdo Scrollável */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-120px)] md:max-h-[600px]">
          {/* Cards de Indicadores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <DollarSign className="h-5 w-5" />
                <span className="font-medium">Preço Atual</span>
              </div>
              <div className="text-lg md:text-xl font-bold text-gray-900">
                {formatCurrency(company.currentPrice)}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Activity className="h-5 w-5" />
                <span className="font-medium">Variação 24h</span>
              </div>
              <div className={`text-lg md:text-xl font-bold ${
                company.change.percentage > 0 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {formatPercentage(company.change.percentage)}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <BarChart className="h-5 w-5" />
                <span className="font-medium">Volume</span>
              </div>
              <div className="text-lg md:text-xl font-bold text-gray-900">
                {formatVolume(company.volume)}
              </div>
            </div>
          </div>

          {/* Informações Detalhadas */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Market Cap</h3>
                <p className="text-gray-900">{formatCurrency(company.marketCap)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Última Atualização</h3>
                <p className="text-gray-900">
                  {new Intl.DateTimeFormat('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                  }).format(company.lastUpdate)}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Estatísticas do Dia</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Preço de Abertura</p>
                  <p className="text-gray-900">{formatCurrency(company.currentPrice - company.change.value)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Variação em R$</p>
                  <p className={`${company.change.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(Math.abs(company.change.value))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Fixo */}
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 mt-auto">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="w-full md:w-auto px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};