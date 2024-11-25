// src/components/MarketList/types.ts

// Tipo para variação de preço
export interface PriceChange {
    value: number;      // Variação em valor (ex: +1.50, -0.75)
    percentage: number; // Variação percentual (ex: +1.5%, -0.75%)
}

// Tipo para empresa/ativo
export interface Company {
    id: string;            // Identificador único
    name: string;          // Nome da empresa
    symbol: string;        // Código de negociação (ex: PETR4)
    sector: string;        // Setor de atuação
    currentPrice: number;  // Preço atual
    change: PriceChange;   // Variação do preço
    volume: number;        // Volume negociado
    marketCap: number;     // Valor de mercado
    lastUpdate: Date;      // Última atualização
}

// Tipo para ordenação
export type SortDirection = 'asc' | 'desc';
export type SortableFields = keyof Pick<Company, 'name' | 'symbol' | 'currentPrice' | 'volume' | 'marketCap'>;

// Interface para props do componente
export interface MarketListProps {
    companies?: Company[];                      // Array de empresas (opcional)
    onSort?: (field: SortableFields) => void;   // Callback de ordenação
    onSearch?: (term: string) => void;          // Callback de busca
    loading?: boolean;                          // Estado de carregamento
    error?: string;                             // Mensagem de erro
}

// Interface para filtros
export interface MarketFilters {
    sector?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}

// Interface para estado da paginação
export interface PaginationState {
    page: number;
    limit: number;
    total: number;
}

// Interface para estado do componente
export interface MarketListState {
    filters: MarketFilters;
    sort: {
        field: SortableFields;
        direction: SortDirection;
    };
    pagination: PaginationState;
}