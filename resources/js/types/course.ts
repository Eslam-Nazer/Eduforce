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

export interface CourseLesson {
    id: string;
    title: string;
    duration: string;
    kind: 'video' | 'exam';
}

export interface CourseModule {
    id: string;
    title: string;
    duration: string;
    lessons: CourseLesson[];
    resource: string;
}
