import {
  ItemStateTypes,
  ItemTypes,
} from './sales';

export interface ConfirmedSalePostRequest {
    amount: number;
    person_name?: string;
}

export interface ConfirmedAdminstrationItemEditPostRequest {
    supply: number;
    id: ItemTypes;
    price: number;
}

export interface ConfirmedChurrasqueiraItemEditPostRequest {
    supply: number;
    id: ItemTypes;
}

export interface ConfirmedChurrasqueiraItemAssarPostRequest {
    id: ItemTypes;
    amount: number;
}

export interface ConfirmedChurrasqueiraItemProntificarPostRequest {
    id: ItemTypes;
    amount: number;
}

export interface ConfirmedChurrasqueiraItemRemoverDoEstoquePostRequest {
    id: ItemTypes;
    amount: number;
}

export interface ConfirmedChurrasqueiraItemPerdidoRequest {
    id: ItemTypes;
    lost_at_step: ItemStateTypes
    amount: number;
}

export interface ConfirmedChurrasqueiraSoldItemPostRequest {
    id: ItemTypes;
    sold_at_step: ItemStateTypes;
    amount: number;
}


export interface DevedorChange {
    amount: number;
    nome: string;
}

export interface DevedorCreate {
    amount: number;
    nome: string;
}

export interface Devedor {
    amount: number;
    nome: string;
}