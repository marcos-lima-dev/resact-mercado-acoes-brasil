// src/services/api.ts

import { Company, MarketFilters } from '../components/MarketList/types';

const CACHE_KEY = 'market_data';
const CACHE_DURATION = 30000;

// Lista base de empresas reais brasileiras
const REAL_COMPANIES = [
    { name: 'Petrobras S.A.', symbol: 'PETR4', sector: 'Petróleo e Gás' },
    { name: 'Vale S.A.', symbol: 'VALE3', sector: 'Mineração' },
    { name: 'Itaú Unibanco S.A.', symbol: 'ITUB4', sector: 'Financeiro' },
    { name: 'Bradesco S.A.', symbol: 'BBDC4', sector: 'Financeiro' },
    { name: 'Ambev S.A.', symbol: 'ABEV3', sector: 'Bebidas' },
    { name: 'Magazine Luiza S.A.', symbol: 'MGLU3', sector: 'Varejo' },
    { name: 'Lojas Renner S.A.', symbol: 'LREN3', sector: 'Varejo' },
    { name: 'WEG S.A.', symbol: 'WEGE3', sector: 'Industrial' },
    { name: 'B3 S.A.', symbol: 'B3SA3', sector: 'Financeiro' },
    { name: 'JBS S.A.', symbol: 'JBSS3', sector: 'Alimentos' },
    { name: 'Localiza S.A.', symbol: 'RENT3', sector: 'Locação de Veículos' },
    { name: 'Natura S.A.', symbol: 'NTCO3', sector: 'Cosméticos' },
    { name: 'Gerdau S.A.', symbol: 'GGBR4', sector: 'Siderurgia' },
    { name: 'Suzano S.A.', symbol: 'SUZB3', sector: 'Papel e Celulose' },
    { name: 'Banco do Brasil S.A.', symbol: 'BBAS3', sector: 'Financeiro' }
];

// Componentes para gerar empresas fictícias
const COMPANY_NAMES = {
    prefixes: ['Nova', 'Brasil', 'Tech', 'Global', 'Nacional', 'Multi', 'Mega', 'Smart', 'Eco', 'Digital'],
    sectors: ['Tecnologia', 'Energia', 'Saúde', 'Construção', 'Logística', 'Alimentos', 'Finanças', 'Varejo', 'Educação', 'Telecom'],
    suffixes: ['S.A.', 'Holding', 'Corporation', 'Participações', 'Investimentos', 'Group', 'Technologies', 'Solutions']
};

export class MarketAPI {
    private generateCompanyName(): { name: string; sector: string } {
        const prefix = COMPANY_NAMES.prefixes[Math.floor(Math.random() * COMPANY_NAMES.prefixes.length)];
        const sector = COMPANY_NAMES.sectors[Math.floor(Math.random() * COMPANY_NAMES.sectors.length)];
        const suffix = COMPANY_NAMES.suffixes[Math.floor(Math.random() * COMPANY_NAMES.suffixes.length)];
        
        return {
            name: `${prefix} ${sector} ${suffix}`,
            sector: sector
        };
    }

    private generateMockData(): Company[] {
        const companies: Company[] = [];

        // Adicionar empresas reais primeiro
        REAL_COMPANIES.forEach((baseCompany) => {
            const basePrice = 20 + Math.random() * 180;
            const variation = (Math.random() * 10) - 5;

            companies.push({
                id: baseCompany.symbol,
                symbol: baseCompany.symbol,
                name: baseCompany.name,
                sector: baseCompany.sector,
                currentPrice: Number(basePrice.toFixed(2)),
                change: {
                    value: Number(variation.toFixed(2)),
                    percentage: Number((variation / basePrice * 100).toFixed(2))
                },
                volume: Math.floor(1000000 + Math.random() * 9000000),
                marketCap: Math.floor(basePrice * (10000000 + Math.random() * 90000000)),
                lastUpdate: new Date()
            });
        });

        // Gerar empresas fictícias para completar 100
        for (let i = companies.length; i < 100; i++) {
            const companyInfo = this.generateCompanyName();
            const basePrice = 10 + Math.random() * 90;
            const variation = (Math.random() * 10) - 5;
            const symbol = `TICK${(i + 1).toString().padStart(3, '0')}`;

            companies.push({
                id: symbol,
                symbol: symbol,
                name: companyInfo.name,
                sector: companyInfo.sector,
                currentPrice: Number(basePrice.toFixed(2)),
                change: {
                    value: Number(variation.toFixed(2)),
                    percentage: Number((variation / basePrice * 100).toFixed(2))
                },
                volume: Math.floor(100000 + Math.random() * 9900000),
                marketCap: Math.floor(basePrice * (1000000 + Math.random() * 9000000)),
                lastUpdate: new Date()
            });
        }

        // Ordenar por volume de negociação
        companies.sort((a, b) => b.volume - a.volume);

        return companies;
    }

    async fetchCompanies(): Promise<Company[]> {
        try {
            const data = this.generateMockData();
            return data;
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            throw new Error('Falha ao carregar dados do mercado');
        }
    }
}

export const marketAPI = new MarketAPI();