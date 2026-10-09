import type { CourseModule } from '@/types/course';

export const sampleCourseTitle =
    'Full-Stack Web Development with Node.js & React';
export const sampleInstructor = 'Ahmed Mansour';
export const sampleVideoSource =
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
export const sampleCompletedIds = ['1.1', '1.2', '1.3'];

export const sampleModules: CourseModule[] = [
    {
        id: 'server',
        title: 'Server Architecture & Routing',
        duration: '1h 45m',
        resource: 'Starter Code: module-1-server-boilerplate.zip',
        lessons: [
            {
                id: '1.1',
                title: 'Runtime Internals & Event Loop Lifecycle',
                duration: '16:40',
                kind: 'video',
            },
            {
                id: '1.2',
                title: 'Modular Pipeline Design with Express Router',
                duration: '22:15',
                kind: 'video',
            },
            {
                id: '1.3',
                title: 'Deterministic Request Payload Validation',
                duration: '18:30',
                kind: 'video',
            },
            {
                id: '1.4',
                title: 'Centralized Asynchronous Error Handling Strategy',
                duration: '14:50',
                kind: 'video',
            },
            {
                id: '1.5',
                title: 'PostgreSQL Connection Pools & Schema Migrations',
                duration: '24:10',
                kind: 'video',
            },
            {
                id: '1.6',
                title: 'Repository Pattern & Query Builders',
                duration: '19:05',
                kind: 'video',
            },
        ],
    },
    {
        id: 'interfaces',
        title: 'User Interfaces & State Handling',
        duration: '2h 30m',
        resource: 'Source Kit: react-ui-component-library.zip',
        lessons: [
            {
                id: '2.1',
                title: 'Modern React Tooling & Vite Application Boundary',
                duration: '18:20',
                kind: 'video',
            },
            {
                id: '2.2',
                title: 'Compound Component Composition & Accessibility',
                duration: '21:40',
                kind: 'video',
            },
            {
                id: '2.3',
                title: 'Synchronizing Remote State with Custom Hooks',
                duration: '24:00',
                kind: 'video',
            },
            {
                id: '2.4',
                title: 'Optimistic UI Updates & Cache Invalidation',
                duration: '19:15',
                kind: 'video',
            },
            {
                id: '2.5',
                title: 'Complex Form Controls & Validation Lifecycles',
                duration: '20:30',
                kind: 'video',
            },
            {
                id: '2.6',
                title: 'Dynamic Routing & Code-Splitting Bundles',
                duration: '15:55',
                kind: 'video',
            },
            {
                id: '2.7',
                title: 'High-Performance Rendering & Memoization Limits',
                duration: '17:10',
                kind: 'video',
            },
            {
                id: '2.8',
                title: 'End-to-End Client Test Flows with Playwright',
                duration: '13:10',
                kind: 'video',
            },
        ],
    },
    {
        id: 'security',
        title: 'Security, Tokens & Cloud Delivery',
        duration: '2h 45m',
        resource: 'Deployment Manifests: docker-compose-production.yml',
        lessons: [
            {
                id: '3.1',
                title: 'JWT Architecture: Access vs Refresh Token Rotation',
                duration: '23:45',
                kind: 'video',
            },
            {
                id: '3.2',
                title: 'Hardening Express: Helmet, CORS, and Rate Limits',
                duration: '19:10',
                kind: 'video',
            },
            {
                id: '3.3',
                title: 'Protecting Against CSRF, XSS and Injection Vectors',
                duration: '21:00',
                kind: 'video',
            },
            {
                id: '3.4',
                title: 'Multi-Stage Dockerfile Optimization',
                duration: '22:30',
                kind: 'video',
            },
            {
                id: '3.5',
                title: 'Local Orchestration with Docker Compose',
                duration: '18:40',
                kind: 'video',
            },
            {
                id: '3.6',
                title: 'Structured Logging & Process Management (PM2)',
                duration: '16:50',
                kind: 'video',
            },
            {
                id: '3.7',
                title: 'CI/CD Pipeline Automation with GitHub Actions',
                duration: '22:00',
                kind: 'video',
            },
            {
                id: '3.8',
                title: 'Provisioning Cloud Compute & Reverse Proxies',
                duration: '21:05',
                kind: 'video',
            },
        ],
    },
    {
        id: 'assessment',
        title: 'Assessment & Practical Synthesis',
        duration: '1h 00m',
        resource: 'Course Summary.pdf',
        lessons: [
            {
                id: '4.1',
                title: 'Architecture Retrospective & Optimization Walkthrough',
                duration: '30:00',
                kind: 'video',
            },
            {
                id: '4.2',
                title: 'Comprehensive Synthesis Exam (Online)',
                duration: '30:00',
                kind: 'exam',
            },
        ],
    },
];
