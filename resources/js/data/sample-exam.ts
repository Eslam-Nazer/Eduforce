import type { CourseExam } from '@/types/exam';

// Answer keys are public sample data for this frontend preview only.
export const sampleExam: CourseExam = {
    passingScore: 70,
    questions: [
        {
            id: 'q1',
            type: 'true-false',
            prompt: 'Middleware can inspect an incoming request before a route handler runs.',
            options: [
                { id: 'true', label: 'True' },
                { id: 'false', label: 'False' },
            ],
            correctOptionId: 'true',
            explanation:
                'Middleware can inspect or transform a request before passing it to the next handler.',
        },
        {
            id: 'q2',
            type: 'single-choice',
            prompt: 'Which HTTP method is normally used to retrieve a resource?',
            options: [
                { id: 'get', label: 'GET' },
                { id: 'post', label: 'POST' },
                { id: 'delete', label: 'DELETE' },
                { id: 'patch', label: 'PATCH' },
            ],
            correctOptionId: 'get',
            explanation:
                'GET requests retrieve a representation of a resource.',
        },
        {
            id: 'q3',
            type: 'single-choice',
            prompt: 'Which React hook provides local component state?',
            options: [
                { id: 'effect', label: 'useEffect' },
                { id: 'state', label: 'useState' },
                { id: 'ref', label: 'useRef' },
                { id: 'memo', label: 'useMemo' },
            ],
            correctOptionId: 'state',
            explanation:
                'useState supplies a state value and a setter that schedules an update.',
        },
        {
            id: 'q4',
            type: 'true-false',
            prompt: 'Starting a database transaction means every statement will succeed automatically.',
            options: [
                { id: 'true', label: 'True' },
                { id: 'false', label: 'False' },
            ],
            correctOptionId: 'false',
            explanation:
                'Statements can still fail. A transaction groups changes that can be committed or rolled back.',
        },
        {
            id: 'q5',
            type: 'single-choice',
            prompt: 'What is the purpose of validating request data?',
            options: [
                {
                    id: 'validate',
                    label: 'Check that incoming values match expected rules',
                },
                { id: 'encrypt', label: 'Encrypt every database table' },
                { id: 'deploy', label: 'Deploy the application automatically' },
                { id: 'style', label: 'Style the user interface' },
            ],
            correctOptionId: 'validate',
            explanation:
                'Validation checks input types, required fields and other rules before processing.',
        },
        {
            id: 'q6',
            type: 'true-false',
            prompt: 'Client-side form validation should be accompanied by server-side validation.',
            options: [
                { id: 'true', label: 'True' },
                { id: 'false', label: 'False' },
            ],
            correctOptionId: 'true',
            explanation:
                'Clients can bypass browser checks, so the server must validate input too.',
        },
        {
            id: 'q7',
            type: 'single-choice',
            prompt: 'What does a database index commonly help with?',
            options: [
                {
                    id: 'lookup',
                    label: 'Finding matching rows more efficiently',
                },
                { id: 'backup', label: 'Replacing all database backups' },
                { id: 'encrypt', label: 'Encrypting all query results' },
                { id: 'remove', label: 'Removing the need for constraints' },
            ],
            correctOptionId: 'lookup',
            explanation:
                'An appropriate index can speed up lookups, with additional storage and write costs.',
        },
        {
            id: 'q8',
            type: 'single-choice',
            prompt: 'What is a container image?',
            options: [
                {
                    id: 'package',
                    label: 'A packaged filesystem and configuration used to create containers',
                },
                { id: 'photo', label: 'A screenshot of the application' },
                { id: 'query', label: 'A database query result' },
                { id: 'secret', label: 'A user password' },
            ],
            correctOptionId: 'package',
            explanation:
                'A container image provides the application filesystem and configuration for a container.',
        },
        {
            id: 'q9',
            type: 'true-false',
            prompt: 'A failed HTTP request can be represented by an error status code.',
            options: [
                { id: 'true', label: 'True' },
                { id: 'false', label: 'False' },
            ],
            correctOptionId: 'true',
            explanation:
                'HTTP error responses use status codes to communicate failure categories.',
        },
        {
            id: 'q10',
            type: 'single-choice',
            prompt: 'Why should automated tests be run before releasing a change?',
            options: [
                {
                    id: 'confidence',
                    label: 'To check expected behavior and detect regressions',
                },
                {
                    id: 'guarantee',
                    label: 'To guarantee no bugs can ever exist',
                },
                { id: 'replace', label: 'To replace every code review' },
                {
                    id: 'speed',
                    label: 'To automatically speed up all database queries',
                },
            ],
            correctOptionId: 'confidence',
            explanation:
                'Tests provide evidence about expected behavior and help detect regressions; they do not prove an application has no bugs.',
        },
    ],
};
