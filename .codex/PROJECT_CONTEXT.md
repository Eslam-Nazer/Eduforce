# Eduforce أ¢â‚¬â€‌ Project Context

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
- Direct studentأ¢â‚¬â€œinstructor chat is text-only initially.
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
- Reviewed all 35 source cards. Rewrote 24 Pending cards and created 9 focused splits (F25أ¢â‚¬â€œF33), yielding 33 Pending cards: 29 product features and 4 enablers (F01/F22/F23/F24). Backlog retains B01أ¢â‚¬â€œB11 unchanged. This is planning completion, not application implementation.
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

### Row 01 أ¢â‚¬â€‌ Course discovery and purchase

1. 01.01 أ¢â‚¬â€‌ Browse Courses
2. 01.02 أ¢â‚¬â€‌ Course Details
3. 01.03 أ¢â‚¬â€‌ Course Checkout
4. 01.04 أ¢â‚¬â€‌ Payment Success
5. 01.05 أ¢â‚¬â€‌ Payment Failed
6. 01.06 أ¢â‚¬â€‌ Payment Cancelled

### Row 02 أ¢â‚¬â€‌ Account access and settings

1. 02.01 أ¢â‚¬â€‌ Sign In
2. 02.02 أ¢â‚¬â€‌ Sign Up
3. 02.03 أ¢â‚¬â€‌ Password Recovery
4. 02.04 أ¢â‚¬â€‌ Account Settings

### Row 03 أ¢â‚¬â€‌ Learning and completion

1. 03.01 أ¢â‚¬â€‌ My Courses
2. 03.02 أ¢â‚¬â€‌ Course Player
3. 03.03 أ¢â‚¬â€‌ Course Exam
4. 03.04 أ¢â‚¬â€‌ Exam Results
5. 03.05 أ¢â‚¬â€‌ Course Certificate

### Row 04 أ¢â‚¬â€‌ Consultation booking

1. 04.01 أ¢â‚¬â€‌ Instructor Profile
2. 04.02 أ¢â‚¬â€‌ Consultation Service Details
3. 04.03 أ¢â‚¬â€‌ Consultation Request
4. 04.04 أ¢â‚¬â€‌ Consultation Request Tracking
5. 04.05 أ¢â‚¬â€‌ Consultation Checkout

### Row 05 أ¢â‚¬â€‌ Student messages and purchases

1. 05.01 أ¢â‚¬â€‌ Messages
2. 05.02 أ¢â‚¬â€‌ Purchase History
3. 05.03 أ¢â‚¬â€‌ Refund Request

### Row 06 أ¢â‚¬â€‌ Instructor application and course publishing

1. 06.01 أ¢â‚¬â€‌ Instructor Application
2. 06.02 أ¢â‚¬â€‌ Instructor Dashboard
3. 06.03 أ¢â‚¬â€‌ Instructor Courses
4. 06.04 أ¢â‚¬â€‌ Course Basics
5. 06.05 أ¢â‚¬â€‌ Course Curriculum
6. 06.06 أ¢â‚¬â€‌ Course Exam Settings
7. 06.07 أ¢â‚¬â€‌ Course Preview and Publish

### Row 07 أ¢â‚¬â€‌ Instructor consultations and earnings

1. 07.01 أ¢â‚¬â€‌ Instructor Consultation Services
2. 07.02 أ¢â‚¬â€‌ Instructor Consultation Requests
3. 07.03 أ¢â‚¬â€‌ Instructor Earnings

### Row 08 أ¢â‚¬â€‌ Platform administration

1. 08.01 أ¢â‚¬â€‌ Admin Dashboard
2. 08.02 أ¢â‚¬â€‌ Instructor Applications
3. 08.03 أ¢â‚¬â€‌ User Management
4. 08.04 أ¢â‚¬â€‌ Payments and Refunds
5. 08.05 أ¢â‚¬â€‌ Commission Settings
6. 08.06 أ¢â‚¬â€‌ Countries and Payment Gateways

Keep the design assets board separate, above the journeys. At completion report actual arranged/renamed count, missing screens, overlap verification, and a screenshot. This ordering is the latest handoff proposal based on agreed journeys, not proof of completed canvas arrangement.

## Communication and approval preferences

- On 2026-10-09 the user reaffirmed: consult them before making new decisions, including Git organization. The user approved splitting the pending work into separate commits for dependencies/configuration, shadcn-vue, Checkout, Auth, Account Settings, Eloquent strict mode and documentation. Do not independently choose future grouping or implementation approaches.

- User prefers questions and implementation-choice approvals through the available interactive question prompt with selectable options, instead of plain chat questions requiring a typed response. Mandatory Codex approvals still use the system approval UI.

- Before implementation or changing the implementation approach, present the proposed choices and wait for the user to direct/approve them. Do not independently choose native controls instead of shadcn-vue, substitute one UI component for another, or decide which page sections to extract into components. First inspect installed components and explain missing ones and proposed component boundaries. A general implementation request does not authorize unconfirmed architectural/UI choices; do not treat silence as approval. Read-only inspection and maintaining this context remain authorized.

- Verification must be proportional to the task and conserve user time and credits without reducing quality. Run only checks directly relevant to the changed behavior; run each needed check once after the final edit. Repeat only after a new change, failure, or unresolved material concern. Avoid unrelated work, redundant browser checks, broad scans and rebuilding unchanged code. Prefer the smallest useful confirmation and report concrete blockers promptly.
- Communicate in clear Egyptian Arabic, concisely.
- User dislikes repeated permission questions. Continue within already authorized scope.
- User reaffirmed on 2026-10-07 that project documentation must be updated throughout work. Keep both context copies identical and update relevant docs after confirmed decisions or verified changes; do not record assumptions as agreements.
- User requires approval before new files or edits unless specifically authorized. Creation and ongoing maintenance of this reference and its root discovery instructions are authorized by the 2026-10-07 request.
- If the user requests Telegram follow-up for an active task, send questions there and wait for a matching reply.
- `telegram on` or `ط·ع¾ط·آ§ط·آ¨ط·آ¹ ط·آ¹ط¸â€‍ط¸â€° ط·ع¾ط¸â€‍ط·آ¬ط·آ±ط·آ§ط¸â€¦` enables Telegram follow-up for the current task until the user disables it or the task ends. Send questions, project approval requests, blockers, interruptions/stops, and completion reports to the agreed bot. Do useful independent work while waiting; never execute approval-dependent work without a verified reply. `telegram off` disables this routing.
- For mandatory Codex permission prompts, send a Telegram notice explaining that approval must be granted inside Codex, when network/tool access permits. Telegram cannot grant or bypass system approvals.
- Before ending an active turn, send the final outcome or blocker to Telegram when enabled. If the process is forcibly interrupted, the app closes, or tools/network fail, automatic notification is not guaranteed; no background service exists.
- Do not treat elapsed time or absence of a reply as approval.
- Mandatory system/tool approvals remain in Codex; do not bypass safeguards through Telegram.

### Telegram أ¢â‚¬â€‌ verified manual connection

- Bot: https://t.me/my_codex_1233_bot
- Preferred token storage: `.local-secrets/telegram-token.dpapi` inside this project, explicitly permitted in Git at the user's request. Other files in `.local-secrets` remain ignored. This is encrypted using Windows DPAPI for the current Windows user on this machine, not a portable plaintext token. The existing Windows user environment variable `EDUFORCE_TELEGRAM_BOT_TOKEN` remains a fallback and was not removed. Allowing Git to see the encrypted file does not make it usable on a different machine/account.
- Safe local loading in PowerShell: read the encrypted file with `Get-Content -LiteralPath`, pass it to `ConvertTo-SecureString`, then obtain its value through `[System.Net.NetworkCredential]::new('', $secureValue).Password` only inside the request process. Never emit the value or a token-bearing URL. Same Windows user/machine required; a new machine needs credential setup again.
- A token was exposed in an earlier screenshot. The user was told to revoke it and supplied a locally stored token; rotation itself was not independently verified.
- Sending messages from the bot succeeded, and the user confirmed delivery.
- Reading private messages through Telegram `getUpdates` succeeded.
- An active-task question/answer experiment succeeded: force-reply question, wait, and read the same user's reply to that exact bot message.
- A second experiment received `ط¸â€¦ط·آ®ط·ع¾ط·آµط·آ±` and sent the explanation accordingly.
- Prior scripts accepted only one discovered private chat and matched sender ID and `reply_to_message.message_id`. Revalidate recipient identity in a new session; do not send to an ambiguous chat.
- Do not consume unrelated updates or delete/set webhooks without justification and authorization.
- No persistent background receiver, automatic wake-up, registered Telegram plugin, or @-mention integration has been installed.
- `getUpdates` is a temporary discovery/polling mechanism, not durable storage of the recipient or conversation.
- Network access may require sandbox escalation. Do not expose a token-bearing URL in logs or errors.

### Slack أ¢â‚¬â€‌ earlier experiments

- Channel: https://myworkspace-em13687.slack.com/archives/C0C764ZMPH8
- Connected Slack send tool posts as the user's account, with a أ¢â‚¬إ“Sent using ChatGPTأ¢â‚¬â€Œ attribution; it is not a separate bot sender.
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

- 2026-10-09: Replaced the single local commit with seven approved commits on feature/checkout-account-screens: dependencies/configuration, shadcn-vue, Checkout, Auth, Account Settings, Eloquent strict mode and documentation. Verified the final Git tree exactly matched the original combined commit before this documentation update; no application changes were lost. Remote upload remains blocked by SSH authentication. Recorded the user's requirement to consult before new decisions.

- 2026-10-09: User requested feature/ instead of codex/ for the current branch. Renamed it to feature/checkout-account-screens locally. Remote upload remains blocked by the previously verified GitHub SSH authentication failure.

- 2026-10-09: User authorized organizing all pending changes on a separate branch and pushing them. Prepared branch feature/checkout-account-screens for the current checkout/account/settings UI, dependency/configuration changes and continuity docs. git diff --check passed. Current TypeScript check failed with widespread missing Vue/VueUse exports; build was not run. Remote fetch/push access is blocked by GitHub SSH Permission denied (publickey), including an explicit attempt with the existing key. Existing course routes are commented out in the current user working tree; preserved without changing implementation. No remote upload verified.

- 2026-10-07: User explicitly requested durable rules to reduce unnecessary work, repeated tests, time and credit usage while preserving quality. Added proportional-verification guidance to communication/work preferences in both context copies. Settings Tabs production build passed; /settings route was found with an empty component during final preview and restored to Settings/Index. Browser confirmed Profile alone is visible by default; choosing Regional & Billing displays it and hides Profile.

- 2026-10-07: User objected to excessive verification time and stale Settings preview still showing stacked sections. Keep verification proportional to the change, avoid repeated checks, and update the live preview promptly. Tabs formatting, scoped lint and TypeScript passed; production build remains running, so browser confirmation is still pending.

- 2026-10-07: User requested Account Settings show only the selected section instead of stacking all sections and scrolling. User approved installing shadcn Tabs. Installed Tabs and converted sidebar to triggers with Profile selected initially; force-mounted panels are explicitly hidden when inactive to preserve local form/avatar state. Formatting, scoped lint, TypeScript and production build passed; focused browser check verified only the selected panel is visible.

- 2026-10-07: User requested inspection and implementation of all 02 account screens with follow-up in Codex and Telegram. Telegram start/approval/progress notices delivered after verifying one private recipient; no IDs or credentials recorded. Live Stitch inspection covered Sign In, Sign Up, Password Recovery request/reset states, and Account Settings profile/regional/password/instructor sections. User approved Auth/Login, Register, ForgotPassword, ResetPassword and Settings/Index, shared AuthLayout/PasswordInput, separate Profile/Preferences/Password forms and installing shadcn Checkbox/Textarea/Progress. Implemented all five pages with local sample state only, shared AuthLayout/PasswordInput and separate account sections. Installed shadcn Checkbox/Textarea/Progress; added preview routes /login, /register, /forgot-password, /reset-password and /settings, and linked guest header actions to Auth pages. Auth cards share a 448px desktop maximum, 24px headings and 44px actions. Formatting, scoped lint, TypeScript, PHP route syntax and an initial production build passed. Browser verified visibility toggles, local submissions, mismatched passwords, recovery flow, regional currency synchronization and instructor Sheet; desktop 1440px/mobile 375px layouts had no horizontal overflow. Avatar now uses one shadcn upload Button and a hidden installed Input; image selection/display/removal verified locally. TypeScript and a subsequent production build passed. No Stitch designs changed. User also clarified implementation pages should be consistent across related states and external design editing is no longer required.

- 2026-10-07: User confirmed that if Stitch editing does not work, standardize implementation across Success, Failed and Cancelled directly. Rechecked all three pages: shared max-w-2xl container, 30px heading, 64px status circle/40px icon, 24px section spacing, 20px mobile/32px desktop card padding and 44px action heights. Removed conflicting duplicate line-height class from Failed metadata list; retained leading-5.

- 2026-10-07: At user request inspected live Stitch 01.06 Payment Cancelled, updated that existing screen in place to the approved 672px container/30px heading scale and preserved amber identity. Implemented Checkout/Cancelled.vue with shared MarketplaceHeader/Footer and installed shadcn primitives, sample order/cancellation details, local billing support Sheet and working return-to-checkout/course links. Added /courses/course/checkout/cancelled route. Browser verified 672px width, 30px/36px heading, no desktop horizontal overflow and support/navigation interactions. PHP route syntax and TypeScript passed. Formatting, scoped lint, final TypeScript and production build passed. No backend/payment integration. Automatic browser approval review rejected marking the local preview tab as a deliverable; page implementation and inspection unaffected.

- 2026-10-07: User chose Failed scale for Success/Failed: 672px container and 30px heading, and required design edits before code. Submitted scoped Stitch edit for existing 01.04/01.05 only; Stitch reported two in-place updates, visible on canvas. Then aligned Success.vue and Failed.vue container/title, 40px status icons in 64px circles, course thumbnail/title, 20px amount, metadata line height and 16px inner-panel padding. Browser computed-style checks verified both main widths 672px and both heading sizes/line heights 30px/36px; desktop screenshots inspected. Formatting/lint attempts stalled without output and were stopped; automated verification of this styling revision is incomplete; no behavior/backend changes or new components. Total height remains content-dependent.

- 2026-10-07: Inspected live Stitch 01.05 Payment Failed at 100% and implemented authorized Checkout/Failed.vue using existing route /courses/course/checkout/failed. Shared header/footer and breadcrumb strip, centered red status hero, payment notice, course/2400 EGP sample amount, possible failure reasons, Try Again and Back to Course links, local support Sheet and sample reference. Omitted unsupported VAT, batch, provider, PCI and regulator claims. Formatter, TypeScript, scoped lint and production build passed (build includes Success.vue, resolving its earlier incomplete build check). Chrome verified checkout/course navigation and final red/narrow-card layout after refreshing stale Vite CSS by touching app.css timestamp only. No backend/payment calls or new dependencies; mobile audit unverified.

- 2026-10-07: User authorized Checkout/Success.vue. Implemented centered payment confirmation preview with shared header/footer and matching breadcrumb strip, reference copy with unavailable-clipboard fallback, course summary, fixed 2400 EGP sample payment, 23 video/resource/exam tiles, refund policy and local Sheet previews for learning/library/receipt/support. Added /checkout/success route. No backend/payment/email activation or tax/provider/security claims. Formatter and TypeScript completed; scoped lint passed after aliasing InfinityIcon. Production build remained pending without output during verification. Chrome rendered page and receipt Sheet open/close were verified; clipboard unavailable on local HTTP and fallback appeared. Full responsive audit and completed build verification remain outstanding.

- 2026-10-07: Read-only live inspection of Stitch 01.04 Payment Success at readable 100% zoom. Verified portal header/footer, Home/Checkout/Payment Status breadcrumbs, centered success hero/test confirmation/email notice, sample payment reference with Copy Ref, course thumbnail/title/instructor, access/payment method/date/total details, three entitlement tiles, Start Learning/My Courses/Print Tax Invoice actions, refund-policy and support notices. Reference adds unsupported cohort/mentorship, 84 videos versus implemented 23, 4K streaming, repository/verifiable credential claims, 14% VAT, Visa/Fawry branding, 24/7 support, encryption/instant-clearing/guarantee claims and USD. These are not agreements. Installed Card, Badge, Button, Breadcrumb, Separator, Alert and Tooltip cover the visible UI; no additional shadcn primitive needed for a basic frontend preview. No application or design content changed; implementation target and component boundaries remain unapproved.

- 2026-10-07: At user request matched Checkout breadcrumbs to Courses/Show: separate full-width bg-slate-100 strip immediately below header, same max-w-7xl container and px-5 py-4 sm:px-8 spacing. Retained Checkout navigation hierarchy. Scoped lint passed; browser visual verification not performed for this small styling change.

- 2026-10-07: User approved the Checkout implementation proposal. Implemented Checkout/Index.vue using shared MarketplaceHeader/Footer and CheckoutBilling, CheckoutPayment and CheckoutOrderSummary. Checkout types live in types/checkout.ts; installed Alert/RadioGroup are used with other shadcn primitives. Sample Egypt/Saudi billing amounts and EGP/SAR display currency are local state; proceeding opens a Sheet preview only, without backend or provider calls. Both /checkout and the current /courses/course/checkout route render the page. TypeScript, scoped lint and production build passed after routes syntax was corrected. Chrome verification passed Saudi country selection (190 SAR), synchronized SAR display in header/summary and opening/closing payment preview; desktop layout inspected. In-app browser attachment failed; full mobile audit remains unverified. No gateway, FX, provider brands or compliance claims were introduced.

- 2026-10-07: Read-only live inspection of Stitch 01.03 Course Checkout for Checkout/Index.vue. Verified breadcrumb/title/sandbox banner, two-column billing-country and display-currency selects, payment-method card and proceed button, order summary (one course, instructor, lifetime/one-time badges, price/total/refund), purchaser identity and custom portal header/footer. Reference includes unsupported USD, Career Paths, payment brands and security/compliance/no-FX-markup claims; these are not agreements. Installed UI inventory lacks RadioGroup and Alert, suitable for payment choice and notices. Proposed shared header/footer and CheckoutBilling/CheckoutPayment/CheckoutOrderSummary with local payment preview and generic payment copy; interactive approval prompt sent, approval pending. No checkout implementation or payment action performed.

- 2026-10-07: At user request changed CourseCurriculum initial accordion state to open only the first module; remaining modules start collapsed. Multiple modules can still be opened manually.

- 2026-10-07: Implemented approved Courses/Show.vue composition with installed shadcn primitives, shared MarketplaceHeader/Footer, separate CourseCurriculum and CoursePurchaseCard, static four-module syllabus and local currency/preview interactions. Added CourseLesson/CourseModule types under types/course.ts. Derived 23 videos and total duration from lesson rows; exam uses sample 70% threshold. Used alternative Unsplash image and concise sample descriptions. Existing /courses/show route retained; no backend data/payment integration. Header browseHref now supports cross-page navigation. TypeScript, scoped lint and production build passed; live preview verified curriculum collapse, purchase preview open/close and SAR price. Panel-width layout inspected; full breakpoint audit pending. User clarified that additional questions remain welcome through selectable prompts, and authorized implementation.

- 2026-10-07: User approved Courses/Show composition: shared MarketplaceHeader/Footer, separate CourseCurriculum and CoursePurchaseCard, other content sections in Show.vue, local sample data with types under types and video count derived from lessons. User requested interactive selectable prompts for future questions. Implementation pending.

- 2026-10-07: User explicitly required consultation before implementation choices, including native versus shadcn-vue controls and extracting page sections into components. Present choices first and wait for user direction rather than choosing independently.

- 2026-10-07: Read-only inspection of live Stitch 01.02 Course Details for intended Courses/Show page. Verified shared header/footer, breadcrumb, category/title/summary/instructor hero, five-item metadata strip, two-column body (wide main content and right purchase panel), course image, four learning outcomes, prerequisites, description, four curriculum modules with locked lesson/resource rows, exam/certificate and instructor profile. Purchase panel shows 2400 EGP, Buy Course, inclusions, conditional refund card and payment note. Design states 24 video lessons but curriculum lists 6+8+8+1 videos and one exam (23 videos); 70% is sample course passing score. Lifetime wording and unsupported secured-gateway claim remain unresolved reference content, not new agreements. Intended reuse: MarketplaceHeader/Footer; use installed shadcn primitives, keep types under types. No Courses/Show files or routes created; inspection only.

- 2026-10-07: Extracted CourseCard.vue from Home.vue at user request. Typed course/currency props, local price formatting and view-details event carrying the selected course; Home.vue retains list filtering and preview ownership. Preserved shadcn card markup and styling.

- 2026-10-07: Reinspected live Stitch Browse Courses footer and extracted MarketplaceFooter.vue. Matched two-row structure, brand/tagline sizing, compact plain-text shadcn Button links, Separator and copyright/currency row; responsive stacking at narrow widths. Home.vue delegates preview events and component accepts browseHref for reuse. Visually verified current eduforce.test panel footer after reload.

- 2026-10-07: Extracted Home.vue header into resources/js/components/MarketplaceHeader.vue at user request. Currency uses required typed v-model:currency; browse/preview events delegate filtering and preview state to Home.vue. Preserved header markup and installed shadcn controls.

- 2026-10-07: At user request moved Home.vue Category, Currency and Course declarations to resources/js/types/course.ts, re-exported through types/index.ts and imported Course/Currency using import type. No runtime behavior changes.

- 2026-10-07: Replaced native Home.vue currency select with installed shadcn Select; category controls with ToggleGroup; catalogue cards with Card/CardContent/CardTitle and Badge; remaining action buttons with Button; pagination with Pagination primitives; native dialog with installed Sheet (Dialog is not installed). Kept semantic links/forms and local sample-data behavior. TypeScript, Home.vue lint and production build passed. Live eduforce.test checks verified SAR selection, Design filtering and Sheet open/close; inspected current panel layout and restored All/EGP. No backend changes or dependency installation.

- 2026-10-07: User supplied http://eduforce.test/ as the local preview URL. Opened successfully in the in-app browser and visually inspected the rendered Home catalogue at the current panel width. Verified Design filter returns two courses, Ahmed search returns two courses, SAR switches sample primary/secondary prices, and unmatched search shows empty state; Clear filters restores all eight. Restored EGP/All and kept preview open. This resolves the earlier local preview connection blocker for this URL; full desktop/mobile breakpoint audit has not been performed.

- 2026-10-07: Implemented Browse Courses in resources/js/pages/Home.vue with shadcn Button/Input, responsive eight-course grid, local search/category filters, illustrative EGP/SAR prices and currency selector, empty state, single-page pagination and footer. Pending navigation actions show an accessible native dialog. No backend integration. Course images use external Unsplash URLs rather than exact Stitch assets. Corrected NavUser.vue User import to type-only to unblock bundling. TypeScript, scoped Home.vue lint and production build passed. Browser preview attempts could not connect to local server, so visual/browser interaction verification remains incomplete. Global check encounters existing formatting issues; context files normalized to UTF-8 during this update.

- 2026-10-07: Reinspected the live Stitch screen 01.01 أ¯طںآ½ Browse Courses in Chrome. Verified header/navigation and EGP selector, Find your next skill hero, search, All/Development/Design/Business/Marketing filters, eight course cards in a four-column desktop grid (thumbnail/category/title/instructor/EGP price/approximate SAR/Lifetime/View Details), pagination and footer. User identified Home.vue as the intended frontend target with no backend integration. Implementation has not started; displayed course counts, prices and conversions are design sample data.

- 2026-10-07: Read-only Stitch component review: inspected the currently visible Browse Courses screen and rendered Course Details content. Suggested app-specific compositions (CourseCard, CourseSearch, CategoryFilter, PriceDisplay, MarketplaceHeader/Footer, CourseCurriculum and purchase summary) using shadcn-vue primitives. Official component catalogue checked. Local UI directory currently contains avatar, breadcrumb, button, dropdown-menu, input, separator, sheet, sidebar, skeleton and tooltip; other catalogue primitives are available upstream but not installed locally. This is a scoped review, not an audit of all 39 screen designs or authorization to implement components. No Stitch designs or application code changed.

- 2026-10-07: At the user's request, reviewed Trello source cards, rewrote 24 Pending items and split 9 additional features (F25أ¢â‚¬â€œF33). Re-read and verified all 33 Pending names/descriptions; retained 11 deferred Backlog items. Corrected the stale fourth-video refund ambiguity and enabled-exam completion wording, and kept lifetime wording/provider choices unresolved. Added docs/planning/PENDING_FEATURES.md with current cards and historical source text. Verified declared repository stack and reaffirmed continuous documentation updates. No application code, commit or deployment was performed.

- 2026-10-07: Added a dedicated `.codex/PROJECT_CONTEXT.md` copy at the user's request. Root AGENTS.md directs agents to read it and maintain both copies identically during work.
- 2026-10-07: At the user's request, allowed Git to see only `.local-secrets/telegram-token.dpapi`; other local secrets remain ignored. Updated continuity instructions. No commit or push was requested.
- 2026-10-07: Added task-scoped Telegram-on routing for questions, approvals, blockers/stops, and final reports, with mandatory Codex approvals and forced-interruption limitations preserved. Saved `.local-secrets/telegram-token.dpapi`; verified decryption matches the existing token without exposing it and verified Git ignores the file. No Telegram message was sent during this maintenance task.
- 2026-10-07: Created this project handoff and root AGENTS.md discovery instructions at the user's request. Consolidated confirmed business decisions, design arrangement plan, external links, communication experiments, and incomplete/blocked work. No external services were changed by creating this handoff.
