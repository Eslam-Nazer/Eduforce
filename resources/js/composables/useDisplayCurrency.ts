import { inject, provide, ref, type InjectionKey, type Ref } from 'vue';
import type { Currency } from '@/types/course';

const currencyKey: InjectionKey<Ref<Currency>> = Symbol('display-currency');

export function provideDisplayCurrency() {
    const currency = ref<Currency>('EGP');
    provide(currencyKey, currency);
    return currency;
}

export function useDisplayCurrency() {
    return inject(currencyKey, () => ref<Currency>('EGP'), true);
}
