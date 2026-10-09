import { sampleCourseTitle, sampleInstructor } from "./sample-course";
import type { InstructorProfile } from "@/types/instructor";

export const sampleInstructorProfile: InstructorProfile = {
    name: sampleInstructor,
    initials: "AM",
    headline: "Full-Stack Architect & Engineering Consultant",
    bio: "Ahmed focuses on practical application architecture, maintainable Node.js backends and React interfaces. His sample services cover technical reviews and individual career guidance.",
    languages: ["English", "Arabic"],
    stack: "Node.js, TypeScript, React",
    focus: "Application architecture & distributed backends",
    timeZone: "Africa/Cairo",
    contactEnabled: true,
    courses: [
        {
            id: 1,
            title: sampleCourseTitle,
            category: "Development",
            instructor: sampleInstructor,
            egp: 2400,
            sar: 290,
            image: "photo-1498050108023-c5249f4df085",
        },
    ],
    services: [
        {
            id: "architecture-review",
            title: "Architecture & Node.js Codebase Review",
            category: "Technical Advisory",
            description:
                "Discuss application boundaries, database access and backend performance with the instructor.",
            durationMinutes: 60,
            egp: 850,
            sar: 105,
            scope: [
                "Review module boundaries and database access patterns.",
                "Discuss performance bottlenecks and asynchronous error handling.",
                "Identify practical next steps for improving your application.",
            ],
            audience: "Developers and technical founders",
        },
        {
            id: "career-advisory",
            title: "Junior to Mid Engineering Career Advisory",
            category: "Career Guidance",
            description:
                "Explore your portfolio, current skills and a practical path for your next career step.",
            durationMinutes: 30,
            egp: 0,
            sar: 0,
            scope: [
                "Discuss your portfolio and project presentation.",
                "Identify gaps between your current skills and target role.",
                "Outline a practical learning roadmap.",
            ],
            audience: "Early-career engineers",
        },
    ],
};
