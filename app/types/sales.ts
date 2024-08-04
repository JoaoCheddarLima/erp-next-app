export interface Item {
    id: string;
    supply: number;
    price: number;
    sold: number;
    state_type: ItemStateTypes;
}

export enum ItemTypes {
    CARNE = 'CARNE',
    MEDALHAO = 'MEDALHAO',
    LINGUICA = 'LINGUICA'
}

export interface Sale {
    id: string;
    items: Item[];
    total: number;
    person_name?: string;
    timestamp: number;
}

export interface Estoque {
    [ItemTypes.CARNE]: number;
    [ItemTypes.MEDALHAO]: number;
    [ItemTypes.LINGUICA]: number;
}

export enum ItemStateTypes {
    SOLD = 'SOLD',
    AVAILABLE = 'AVAILABLE',
    PREPARING = 'PREPARING',
    STOCKED = 'STOCKED',
    LOST = 'LOST'
}