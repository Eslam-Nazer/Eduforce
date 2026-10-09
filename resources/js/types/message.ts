export interface ConversationMessage {
    id: string;
    text: string;
    author: "instructor" | "student";
    time: string;
}

export interface Conversation {
    id: string;
    name: string;
    initials: string;
    headline: string;
    contactEnabled: boolean;
    subject: string;
    messages: ConversationMessage[];
}
