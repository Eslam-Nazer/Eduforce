import type { Conversation } from "@/types/message";

export const sampleConversations: Conversation[] = [
    {
        id: "ahmed",
        name: "Ahmed Mansour",
        initials: "AM",
        headline: "Engineering Consultant",
        contactEnabled: true,
        subject: "Architecture & Node.js Codebase Review",
        messages: [
            {
                id: "a1",
                author: "student",
                text: "Hello Ahmed. I would like to discuss the module boundaries in my application.",
                time: "10:15",
            },
            {
                id: "a2",
                author: "instructor",
                text: "Hello Kareem. Which part of the application would you like to focus on?",
                time: "10:20",
            },
            {
                id: "a3",
                author: "student",
                text: "The API and database access layer. I have also created a consultation request.",
                time: "10:24",
            },
        ],
    },
    {
        id: "mona",
        name: "Mona Adel",
        initials: "MA",
        headline: "Design Instructor",
        contactEnabled: false,
        subject: "Portfolio questions",
        messages: [
            {
                id: "m1",
                author: "student",
                text: "Hello Mona. I have a question about presenting my portfolio.",
                time: "Yesterday",
            },
        ],
    },
];
