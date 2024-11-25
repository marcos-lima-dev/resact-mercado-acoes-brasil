// src/utils/formatters.ts

/**
 * Formata porcentagens com sinal e 2 casas decimais
 */
export const formatPercentage = (value: number): string => {
    if (isNaN(value)) return '0,00%';
    
    const formattedValue = value.toFixed(2).replace('.', ',');
    const sign = value > 0 ? '+' : '';
    return `${sign}${formattedValue}%`;
};

/**
 * Formata valores monetários
 */
export const formatCurrency = (value: number): string => {
    if (isNaN(value)) return 'R$ 0,00';
    
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

/**
 * Formata volumes
 */
export const formatVolume = (value: number): string => {
    if (isNaN(value)) return '0';
    
    return new Intl.NumberFormat('pt-BR', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1
    }).format(value);
};