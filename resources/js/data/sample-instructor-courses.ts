import { sampleModules, sampleCourseTitle } from "./sample-course";
import type { InstructorCourse } from "@/types/instructor-workspace";

export const sampleInstructorCourses: InstructorCourse[] = [
    {
        id: "full-stack",
        status: "Published",
        title: sampleCourseTitle,
        summary: "Build practical Node.js backends and React interfaces.",
        description:
            "Explore server architecture, user interfaces, security and cloud delivery through a structured curriculum.",
        category: "Development",
        prerequisites: "Basic JavaScript and HTML.",
        outcomes: [
            "Build modular APIs",
            "Create React interfaces",
            "Understand deployment fundamentals",
        ],
        coverName: "full-stack-cover.jpg",
        currency: "EGP",
        price: 2400,
        modules: sampleModules.map((module) => ({
            id: module.id,
            title: module.title,
            lessons: module.lessons
                .filter((lesson) => lesson.kind === "video")
                .map((lesson) => {
                    const [minutes, seconds] = lesson.duration
                        .split(":")
                        .map(Number);
                    return {
                        id: lesson.id,
                        title: lesson.title,
                        kind: "video",
                        fileName: `sample-${lesson.id}.mp4`,
                        durationSeconds: minutes * 60 + seconds,
                        summary: "",
                    };
                }),
        })),
        examEnabled: true,
        passingScore: 70,
        questions: [
            {
                id: "fs-q1",
                kind: "true-false",
                prompt: "Node.js supports asynchronous I/O.",
                options: [
                    { id: "true", text: "True" },
                    { id: "false", text: "False" },
                ],
                correctOptionId: "true",
            },
        ],
        updatedAt: "2026-10-09T09:00:00Z",
    },
    {
        id: "distributed-systems",
        status: "Draft",
        title: "Distributed Systems & Event-Driven Architecture with Kafka & Go",
        summary:
            "Explore event streaming and practical microservice boundaries.",
        description:
            "Learn event-driven architecture, Kafka fundamentals and producer patterns with practical examples.",
        category: "Development",
        prerequisites: "Working knowledge of APIs and a programming language.",
        outcomes: ["Understand Kafka partitions", "Build idempotent producers"],
        coverName: "distributed-systems-cover.jpg",
        currency: "EGP",
        price: 3200,
        modules: [
            {
                id: "events",
                title: "Event-Driven Fundamentals",
                lessons: [
                    {
                        id: "kafka-basics",
                        title: "Kafka Architecture & Partitions",
                        kind: "video",
                        fileName: "sample-kafka-architecture.mp4",
                        durationSeconds: 1100,
                        summary:
                            "Topics, partitions and broker responsibilities.",
                    },
                    {
                        id: "consumer-groups",
                        title: "Consumer Groups & Offsets",
                        kind: "video",
                        fileName: "sample-consumer-groups.mp4",
                        durationSeconds: 1365,
                        summary: "",
                    },
                    {
                        id: "cluster-resource",
                        title: "Local Cluster Configuration",
                        kind: "file",
                        fileName: "sample-docker-compose.yml",
                        durationSeconds: 0,
                        summary: "",
                    },
                ],
            },
            {
                id: "producers",
                title: "Producers in Go",
                lessons: [
                    {
                        id: "idempotence",
                        title: "Idempotent Producers",
                        kind: "video",
                        fileName: "sample-idempotent-producers.mp4",
                        durationSeconds: 850,
                        summary: "",
                    },
                ],
            },
        ],
        examEnabled: false,
        passingScore: 70,
        questions: [],
        updatedAt: "2026-10-09T10:00:00Z",
    },
];
