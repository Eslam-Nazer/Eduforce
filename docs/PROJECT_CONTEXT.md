# Eduforce â€” Project Context

Last updated: 2026-10-07 (Africa/Cairo).

## Purpose and maintenance

This is the durable handoff for new chats and sessions opened in the Eduforce project. Read it before work and update it after confirmed agreements or verified execution. Root `AGENTS.md` directs agents to this file.

Two identical copies are maintained: `.codex/PROJECT_CONTEXT.md` for agent continuity and `docs/PROJECT_CONTEXT.md` for shared project documentation. Read the `.codex` copy first. Update both after confirmed agreements or verified work and verify they match. If they diverge, reconcile their confirmed changes before proceeding; do not discard information blindly. No automatic background synchronization is installed.

User instructions override this record. Record uncertainty explicitly. This file does not activate background monitoring or preserve a running session. External state must be rechecked.

## Project goals

### Personal learning goals

- Develop backend skills using advanced, practical features such as payment gateways.
- Implement internal chat.
- Learn testing through meaningful application tests.
- Improve system design and database design thinking.

### Business goal

A learning marketplace for general skills and fields. Instructors offer courses and standalone consultations. Students discover and buy courses, learn, and request consultations. Classrooms are deferred.

## Confirmed initial scope

### Accounts and instructors

- One account can purchase/learn and apply to become an instructor.
- An instructor may apply independently or be nominated through an organization.
- Instructor applications require approval from the platform's general Admin, not an external academy/organization admin.
- Approved instructors decide when their courses are ready and publish them themselves.
- Administrative course review/approval is deferred.

### Courses and learning

- Initial content: videos, files, and quizzes/exams.
- Purchasing provides full course-content access; no sequential content unlocking initially.
- Track completed videos and show the completed count out of total videos.
- Mark a video completed when it ends or the student proceeds using Next; merely starting playback is insufficient.
- The course-level exam is optional, enabled by the instructor.
- Initial question types: true/false and multiple choice.
- Instructors set passing scores. Attempts are unlimited initially.
- Course completion requires all videos; if an exam is enabled, passing it is also required.
- Use a platform certificate template. Email the certificate and provide a download button in the course.
- UI planning has used lifetime access. No access expiry was specified in the original purchase requirement; reconfirm before implementing expiry or contractual wording.

### Consultations and chat

- Standalone consultation services can be free or paid.
- Student submits a request; student and instructor agree on the appointment.
- Paid consultation checkout happens after agreement on the appointment.
- Use an external live meeting tool, such as Zoom or Google Meet; no custom meeting engine or automatic slot booking initially.
- Course-linked/internal consultations are deferred.
- Direct studentâ€“instructor chat is text-only initially.
- Instructor can enable/disable student contact.

### Payments and refunds

- Initial countries: Egypt and Saudi Arabia.
- Initial currencies: EGP and SAR.
- Instructor chooses a base currency; display the other through automatic conversion.
- Future country support should depend on configured payment-gateway availability.
- No subscriptions initially.
- Platform commissions apply to courses and consultations; consultation commission is lower. Exact rates remain undecided.
- Instructor settlement is direct through the payment gateway; no wallet/withdrawal system in the initial design.
- Initial payments are test/sandbox payments only.
- Course refund eligibility: within 14 days from purchase and no more than 3 completed videos. Completing the fourth video removes eligibility.
- The user clarified the video cutoff as the fourth completed video; use the above rule despite earlier ambiguous wording.
- Consultation refunds: cancellation at least 24 hours before the agreed appointment.
- Do not invent VAT, gateway providers, compliance guarantees, exchange margins, or legal/regulatory explanations without confirmation.
- Gateway-specific settlement, currency conversion, and refund mechanics still need technical validation.

### Interface and technology preference

- English interface initially.
- Designs should closely follow shadcn-vue components for straightforward implementation.
- Develop the UI/UX picture before detailed database discussion.
- Verified repository stack (2026-10-07): composer.json declares PHP ^8.3, Laravel ^13.17, Inertia Laravel ^3.0 and Wayfinder. package.json declares Vue ^3.5, TypeScript ^5.2, Inertia Vue ^3.0, Tailwind ^4.1, Vite ^8.0 and Vite Plus 0.3.0. components.json confirms shadcn-vue; Reka UI is a dependency. Pest ^5.2, Larastan/PHPStan and Pint are configured. These are declared constraints, not verified production runtime versions.
- SQLite is the .env.example default; production database, payment gateway, exchange-rate provider, chat transport, video hosting and mail provider remain undecided.

## Deferred scope

- Classrooms and teacher-managed student groups, including adding students and classroom teaching workflows.
- Assignments/homework.
- Live teaching sessions and optional saved recordings.
- Course-linked consultations.
- Administrative course approval.
- More advanced assessment capabilities.
- Subscriptions.
- Initial UI prompts excluded reviews/ratings, wishlists, carts, artificial discounts, and unsupported statistics. Do not add them without discussing scope.

## Product and design references

### Trello

- Trello is the chosen planning tool. Do not create or maintain Jira/Atlassian records.
- The user deleted the Jira material manually.
- Initial-phase features belong in Pending; deferred features belong in Backlog with development reminders.
- Feature numbering should use `FNumber`, replacing `PNumber`.
- Card descriptions should be entirely English and contain no Jira references.
- Use useful tags/labels to identify feature areas quickly.
- Board: https://trello.com/b/gGPWiXJs/eduforce (verified through connected Trello tools on 2026-10-07).
- Reviewed all 35 source cards. Rewrote 24 Pending cards and created 9 focused splits (F25â€“F33), yielding 33 Pending cards: 29 product features and 4 enablers (F01/F22/F23/F24). Backlog retains B01â€“B11 unchanged. This is planning completion, not application implementation.
- Pending cards contain actors, scenarios, implementation scope, acceptance criteria, dependencies and unresolved decisions in English. Existing area/audience labels were retained and inherited by new cards.
- Details and historical source snapshot: docs/planning/PENDING_FEATURES.md. Policy-dependent work requires resolving the listed decisions first. F23/F24 apply incrementally; payment event handling F11 is shared, avoiding the previous checkout dependency cycle.

### Database

- User prefers DBML.
- Diagram: https://dbdiagram.io/d/Eduforce_db-6ac425c60f25a52d019a933c
- Existing reference: `docs/database/README.md`.
- User edits the diagram; assistant inspects and suggests on request.
- No diagram edits without authorization. No automatic monitoring.
- The link identifies a diagram, not necessarily a team workspace.

### Google Stitch

- Project: https://stitch.withgoogle.com/u/1/projects/1535417870037138769?pli=1
- Existing screens were generated progressively. Prior attempts to arrange them were incomplete and sometimes moved the wrong screens.
- The user was dissatisfied with the resulting layout and manually separated overlapping screens.
- Do not assume saved coordinates, tab IDs, iframe IDs, or names are current.
- Previous live inventory contained 39 screen nodes plus a design assets board; current inventory must be verified.
- Some purchase/account screens were renamed and repositioned; learning arrangement was partially attempted. No claim that all screens are arranged or overlap-free is valid.
- Some generated content adds unsupported business features or claims. Arrangement authorization is not authorization to redesign content; report issues separately.
- Recent attempts were blocked because the available Chrome extension instance differed from the exact instance permitted by the session's developer instructions. A new tab did not resolve that mismatch. Follow the current session's browser-selection rules; never switch to a prohibited instance.

## Requested screen arrangement

Inspect each screen at a readable zoom before classifying it. Move one screen at a time and verify the result. Arrange left to right within each journey. Alternative outcomes stay beside the main flow, not below it. Different journeys use separate rows. Leave generous gaps and account for the tallest screen in each row.

Preserve designs/content; do not generate, duplicate, delete, or redesign screens during an arrangement-only task. Rename with the following English titles. Report missing/unclear screens instead of creating replacements.

### Row 01 â€” Course discovery and purchase

1. 01.01 â€” Browse Courses
2. 01.02 â€” Course Details
3. 01.03 â€” Course Checkout
4. 01.04 â€” Payment Success
5. 01.05 â€” Payment Failed
6. 01.06 â€” Payment Cancelled

### Row 02 â€” Account access and settings

1. 02.01 â€” Sign In
2. 02.02 â€” Sign Up
3. 02.03 â€” Password Recovery
4. 02.04 â€” Account Settings

### Row 03 â€” Learning and completion

1. 03.01 â€” My Courses
2. 03.02 â€” Course Player
3. 03.03 â€” Course Exam
4. 03.04 â€” Exam Results
5. 03.05 â€” Course Certificate

### Row 04 â€” Consultation booking

1. 04.01 â€” Instructor Profile
2. 04.02 â€” Consultation Service Details
3. 04.03 â€” Consultation Request
4. 04.04 â€” Consultation Request Tracking
5. 04.05 â€” Consultation Checkout

### Row 05 â€” Student messages and purchases

1. 05.01 â€” Messages
2. 05.02 â€” Purchase History
3. 05.03 â€” Refund Request

### Row 06 â€” Instructor application and course publishing

1. 06.01 â€” Instructor Application
2. 06.02 â€” Instructor Dashboard
3. 06.03 â€” Instructor Courses
4. 06.04 â€” Course Basics
5. 06.05 â€” Course Curriculum
6. 06.06 â€” Course Exam Settings
7. 06.07 â€” Course Preview and Publish

### Row 07 â€” Instructor consultations and earnings

1. 07.01 â€” Instructor Consultation Services
2. 07.02 â€” Instructor Consultation Requests
3. 07.03 â€” Instructor Earnings

### Row 08 â€” Platform administration

1. 08.01 â€” Admin Dashboard
2. 08.02 â€” Instructor Applications
3. 08.03 â€” User Management
4. 08.04 â€” Payments and Refunds
5. 08.05 â€” Commission Settings
6. 08.06 â€” Countries and Payment Gateways

Keep the design assets board separate, above the journeys. At completion report actual arranged/renamed count, missing screens, overlap verification, and a screenshot. This ordering is the latest handoff proposal based on agreed journeys, not proof of completed canvas arrangement.

## Communication and approval preferences

- Before implementation or changing the implementation approach, present the proposed choices and wait for the user to direct/approve them. Do not independently choose native controls instead of shadcn-vue, substitute one UI component for another, or decide which page sections to extract into components. First inspect installed components and explain missing ones and proposed component boundaries. A general implementation request does not authorize unconfirmed architectural/UI choices; do not treat silence as approval. Read-only inspection and maintaining this context remain authorized.

- Communicate in clear Egyptian Arabic, concisely.
- User dislikes repeated permission questions. Continue within already authorized scope.
- User reaffirmed on 2026-10-07 that project documentation must be updated throughout work. Keep both context copies identical and update relevant docs after confirmed decisions or verified changes; do not record assumptions as agreements.
- User requires approval before new files or edits unless specifically authorized. Creation and ongoing maintenance of this reference and its root discovery instructions are authorized by the 2026-10-07 request.
- If the user requests Telegram follow-up for an active task, send questions there and wait for a matching reply.
- `telegram on` or `طھط§ط¨ط¹ ط¹ظ„ظ‰ طھظ„ط¬ط±ط§ظ…` enables Telegram follow-up for the current task until the user disables it or the task ends. Send questions, project approval requests, blockers, interruptions/stops, and completion reports to the agreed bot. Do useful independent work while waiting; never execute approval-dependent work without a verified reply. `telegram off` disables this routing.
- For mandatory Codex permission prompts, send a Telegram notice explaining that approval must be granted inside Codex, when network/tool access permits. Telegram cannot grant or bypass system approvals.
- Before ending an active turn, send the final outcome or blocker to Telegram when enabled. If the process is forcibly interrupted, the app closes, or tools/network fail, automatic notification is not guaranteed; no background service exists.
- Do not treat elapsed time or absence of a reply as approval.
- Mandatory system/tool approvals remain in Codex; do not bypass safeguards through Telegram.

### Telegram â€” verified manual connection

- Bot: https://t.me/my_codex_1233_bot
- Preferred token storage: `.local-secrets/telegram-token.dpapi` inside this project, explicitly permitted in Git at the user's request. Other files in `.local-secrets` remain ignored. This is encrypted using Windows DPAPI for the current Windows user on this machine, not a portable plaintext token. The existing Windows user environment variable `EDUFORCE_TELEGRAM_BOT_TOKEN` remains a fallback and was not removed. Allowing Git to see the encrypted file does not make it usable on a different machine/account.
- Safe local loading in PowerShell: read the encrypted file with `Get-Content -LiteralPath`, pass it to `ConvertTo-SecureString`, then obtain its value through `[System.Net.NetworkCredential]::new('', $secureValue).Password` only inside the request process. Never emit the value or a token-bearing URL. Same Windows user/machine required; a new machine needs credential setup again.
- A token was exposed in an earlier screenshot. The user was told to revoke it and supplied a locally stored token; rotation itself was not independently verified.
- Sending messages from the bot succeeded, and the user confirmed delivery.
- Reading private messages through Telegram `getUpdates` succeeded.
- An active-task question/answer experiment succeeded: force-reply question, wait, and read the same user's reply to that exact bot message.
- A second experiment received `ظ…ط®طھطµط±` and sent the explanation accordingly.
- Prior scripts accepted only one discovered private chat and matched sender ID and `reply_to_message.message_id`. Revalidate recipient identity in a new session; do not send to an ambiguous chat.
- Do not consume unrelated updates or delete/set webhooks without justification and authorization.
- No persistent background receiver, automatic wake-up, registered Telegram plugin, or @-mention integration has been installed.
- `getUpdates` is a temporary discovery/polling mechanism, not durable storage of the recipient or conversation.
- Network access may require sandbox escalation. Do not expose a token-bearing URL in logs or errors.

### Slack â€” earlier experiments

- Channel: https://myworkspace-em13687.slack.com/archives/C0C764ZMPH8
- Connected Slack send tool posts as the user's account, with a â€œSent using ChatGPTâ€‌ attribution; it is not a separate bot sender.
- Do not use self-authored Slack test messages as reliable evidence of incoming notification delivery.
- Slack notifications were set to Every day, 12:00 AM through Midnight (24/7).
- Desktop/mobile notifications and Everything were already enabled.
- In-conversation received-message sound was changed from None to Ding.
- Slack reported Windows Focus Assist enabled. The assistant could not open a targetable Windows Settings window, so disabling it was not completed or verified.
- Telegram is the subsequently tested channel. Slack remains available when explicitly requested.

## Open work and unresolved decisions

- Finish or redo Stitch screen arrangement and naming using current live state.
- Review unsupported generated UI content separately with user approval.
- Detailed database design remains to be discussed; no final schema is recorded here.
- Exact commission rates and exchange-rate/gateway mechanics remain undecided.
- Durable Telegram integration/plugin and background reception remain unimplemented.
- No deployment, production payments, or complete application implementation was verified during the conversations summarized here.

## Change log

- 2026-10-07: User explicitly required consultation before implementation choices, including native versus shadcn-vue controls and extracting page sections into components. Present choices first and wait for user direction rather than choosing independently.

- 2026-10-07: Read-only inspection of live Stitch 01.02 Course Details for intended Courses/Show page. Verified shared header/footer, breadcrumb, category/title/summary/instructor hero, five-item metadata strip, two-column body (wide main content and right purchase panel), course image, four learning outcomes, prerequisites, description, four curriculum modules with locked lesson/resource rows, exam/certificate and instructor profile. Purchase panel shows 2400 EGP, Buy Course, inclusions, conditional refund card and payment note. Design states 24 video lessons but curriculum lists 6+8+8+1 videos and one exam (23 videos); 70% is sample course passing score. Lifetime wording and unsupported secured-gateway claim remain unresolved reference content, not new agreements. Intended reuse: MarketplaceHeader/Footer; use installed shadcn primitives, keep types under types. No Courses/Show files or routes created; inspection only.

- 2026-10-07: Extracted CourseCard.vue from Home.vue at user request. Typed course/currency props, local price formatting and view-details event carrying the selected course; Home.vue retains list filtering and preview ownership. Preserved shadcn card markup and styling.

- 2026-10-07: Reinspected live Stitch Browse Courses footer and extracted MarketplaceFooter.vue. Matched two-row structure, brand/tagline sizing, compact plain-text shadcn Button links, Separator and copyright/currency row; responsive stacking at narrow widths. Home.vue delegates preview events and component accepts browseHref for reuse. Visually verified current eduforce.test panel footer after reload.

- 2026-10-07: Extracted Home.vue header into resources/js/components/MarketplaceHeader.vue at user request. Currency uses required typed v-model:currency; browse/preview events delegate filtering and preview state to Home.vue. Preserved header markup and installed shadcn controls.

- 2026-10-07: At user request moved Home.vue Category, Currency and Course declarations to resources/js/types/course.ts, re-exported through types/index.ts and imported Course/Currency using import type. No runtime behavior changes.

- 2026-10-07: Replaced native Home.vue currency select with installed shadcn Select; category controls with ToggleGroup; catalogue cards with Card/CardContent/CardTitle and Badge; remaining action buttons with Button; pagination with Pagination primitives; native dialog with installed Sheet (Dialog is not installed). Kept semantic links/forms and local sample-data behavior. TypeScript, Home.vue lint and production build passed. Live eduforce.test checks verified SAR selection, Design filtering and Sheet open/close; inspected current panel layout and restored All/EGP. No backend changes or dependency installation.

- 2026-10-07: User supplied http://eduforce.test/ as the local preview URL. Opened successfully in the in-app browser and visually inspected the rendered Home catalogue at the current panel width. Verified Design filter returns two courses, Ahmed search returns two courses, SAR switches sample primary/secondary prices, and unmatched search shows empty state; Clear filters restores all eight. Restored EGP/All and kept preview open. This resolves the earlier local preview connection blocker for this URL; full desktop/mobile breakpoint audit has not been performed.

- 2026-10-07: Implemented Browse Courses in resources/js/pages/Home.vue with shadcn Button/Input, responsive eight-course grid, local search/category filters, illustrative EGP/SAR prices and currency selector, empty state, single-page pagination and footer. Pending navigation actions show an accessible native dialog. No backend integration. Course images use external Unsplash URLs rather than exact Stitch assets. Corrected NavUser.vue User import to type-only to unblock bundling. TypeScript, scoped Home.vue lint and production build passed. Browser preview attempts could not connect to local server, so visual/browser interaction verification remains incomplete. Global check encounters existing formatting issues; context files normalized to UTF-8 during this update.

- 2026-10-07: Reinspected the live Stitch screen 01.01 ï؟½ Browse Courses in Chrome. Verified header/navigation and EGP selector, Find your next skill hero, search, All/Development/Design/Business/Marketing filters, eight course cards in a four-column desktop grid (thumbnail/category/title/instructor/EGP price/approximate SAR/Lifetime/View Details), pagination and footer. User identified Home.vue as the intended frontend target with no backend integration. Implementation has not started; displayed course counts, prices and conversions are design sample data.

- 2026-10-07: Read-only Stitch component review: inspected the currently visible Browse Courses screen and rendered Course Details content. Suggested app-specific compositions (CourseCard, CourseSearch, CategoryFilter, PriceDisplay, MarketplaceHeader/Footer, CourseCurriculum and purchase summary) using shadcn-vue primitives. Official component catalogue checked. Local UI directory currently contains avatar, breadcrumb, button, dropdown-menu, input, separator, sheet, sidebar, skeleton and tooltip; other catalogue primitives are available upstream but not installed locally. This is a scoped review, not an audit of all 39 screen designs or authorization to implement components. No Stitch designs or application code changed.

- 2026-10-07: At the user's request, reviewed Trello source cards, rewrote 24 Pending items and split 9 additional features (F25â€“F33). Re-read and verified all 33 Pending names/descriptions; retained 11 deferred Backlog items. Corrected the stale fourth-video refund ambiguity and enabled-exam completion wording, and kept lifetime wording/provider choices unresolved. Added docs/planning/PENDING_FEATURES.md with current cards and historical source text. Verified declared repository stack and reaffirmed continuous documentation updates. No application code, commit or deployment was performed.

- 2026-10-07: Added a dedicated `.codex/PROJECT_CONTEXT.md` copy at the user's request. Root AGENTS.md directs agents to read it and maintain both copies identically during work.
- 2026-10-07: At the user's request, allowed Git to see only `.local-secrets/telegram-token.dpapi`; other local secrets remain ignored. Updated continuity instructions. No commit or push was requested.
- 2026-10-07: Added task-scoped Telegram-on routing for questions, approvals, blockers/stops, and final reports, with mandatory Codex approvals and forced-interruption limitations preserved. Saved `.local-secrets/telegram-token.dpapi`; verified decryption matches the existing token without exposing it and verified Git ignores the file. No Telegram message was sent during this maintenance task.
- 2026-10-07: Created this project handoff and root AGENTS.md discovery instructions at the user's request. Consolidated confirmed business decisions, design arrangement plan, external links, communication experiments, and incomplete/blocked work. No external services were changed by creating this handoff.
