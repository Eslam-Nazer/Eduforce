export type Category = 'Development' | 'Design' | 'Business' | 'Marketing';

export type Currency = 'EGP' | 'SAR';

export interface Course {
    id: number;
    title: string;
    category: Category;
    instructor: string;
    egp: number;
    sar: number;
    image: string;
}
