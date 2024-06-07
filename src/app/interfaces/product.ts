/* eslint-disable @typescript-eslint/naming-convention */
export interface Product {
    id: number;
    productName: string;
    description: string;
    price:  number;
    image_url: string;
    quantity: number;
    currencyType: number;
    currencyTypeName: string;
}


export interface Currency {
    id: number;
    coinDenomination: number;
    currencyType: number;
    currencyTypeName: string;
    quantity: number;
}
