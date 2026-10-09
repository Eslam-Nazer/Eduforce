import type { Currency } from './course';

export type BillingCountry = 'EG' | 'SA';
export type CheckoutPaymentMethod = 'hosted';

export interface CheckoutOrder {
    title: string;
    instructor: string;
    image: string;
    prices: Record<Currency, number>;
}

export interface CheckoutBuyer {
    name: string;
    email: string;
    initials: string;
}
