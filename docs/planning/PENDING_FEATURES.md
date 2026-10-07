# Eduforce actionable Pending features

Verified: 2026-10-07 (Africa/Cairo).

Board: https://trello.com/b/gGPWiXJs/eduforce

24 existing Pending cards were rewritten and 9 focused features (F25–F33) were created. Pending now has 29 product features and 4 engineering/product enablers. Backlog has 11 deferred cards, reviewed without changes. These are planned work items; none is claimed implemented.

The existing repository declares Laravel ^13.17, PHP ^8.3, Inertia ^3.0, Vue ^3.5, TypeScript ^5.2, Tailwind ^4.1, Vite ^8.0 and Vite Plus 0.3.0. components.json confirms shadcn-vue; Reka UI is a dependency. Pest ^5.2 and Larastan/PHPStan/Pint are configured. These are declared version constraints, not a statement of production runtime versions. SQLite is the .env.example default; production DB, gateway, exchange-rate service, chat transport, video host and mail provider are not settled.

## Working order

Design and test each feature incrementally (F23/F24). Start with account permissions, instructor application/review, course basics/curriculum/publication/discovery. Resolve payment and pricing decisions before implementing paid access; then progress/exam/completion/certificates. Consultations reuse the same payment infrastructure. F11 is a shared payment component, not dependent on completed course and consultation checkout; avoid the old circular dependencies. Policy-dependent criteria remain blocked until their decisions are resolved. No sprint dates are committed.

## Policy corrections

The fourth completed video removes course refund eligibility; exactly three remains eligible within the agreed window. Enabled course exams require a pass in addition to completed videos. Full course-content access is confirmed; contractual lifetime/access-duration wording still needs confirmation. Gateway names in old material are evaluation candidates, not selected providers.

## Current verified Pending cards

## [F01] [Enabler] Define the Phase 1 release scope

**ID:** F01
**Type:** Enabler
**Actor:** Product owner
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Review a release candidate against the agreed Phase 1 boundaries.

## Implementation scope
- Document the course purchase-to-certificate and consultation request-to-refund journeys.
- Keep deferred capabilities in Backlog and list unresolved decisions separately.

## Acceptance criteria
- [ ] Release scope names Egypt/Saudi Arabia, EGP/SAR, English UI and sandbox payments.
- [ ] Every planned feature maps to a journey or an explicit engineering deliverable.
- [ ] No unresolved pricing or gateway policy is presented as approved.

## Decisions required before dependent implementation
- Implementation order and release dates are not set; this list is not a sprint commitment.


## Dependencies / sequencing
None

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/popeU7lF/32-f01-enabler-define-the-phase-1-release-scope)

## [F02] [Feature] Use learner and instructor capabilities from one account

**ID:** F02
**Type:** Feature
**Actor:** Signed-in user
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Use learning features, then access teaching tools after approval.

## Implementation scope
- Keep one user identity for purchases and instructor ownership.
- Gate instructor actions by approval and private records by ownership.

## Acceptance criteria
- [ ] An approved instructor retains their learner purchases and progress.
- [ ] An unapproved user cannot publish a course or offer a consultation.
- [ ] A user cannot read or modify another user's protected records.

## Decisions required before dependent implementation
- Registration, login, email verification, password recovery, and social login have not been specified.


## Dependencies / sequencing
None

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/XfV6ea3w/33-f02-feature-use-learner-and-instructor-capabilities-from-one-account)

## [F03] [Feature] Submit an instructor application and view its status

**ID:** F03
**Type:** Feature
**Actor:** Applicant
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Submit an application and return later to see its review status.

## Implementation scope
- Provide the application submission and applicant status view.
- Approval/rejection is implemented separately in F25.

## Acceptance criteria
- [ ] Submission records an application belonging to the applicant.
- [ ] The applicant can view their own review status.
- [ ] Submitting an application does not grant instructor permissions.

## Decisions required before dependent implementation
- Application fields, documents, rejection reasons, and reapplication rules are undecided.
- Organization meaning, registration, permissions, and nomination flow need clarification; a complete academy system is not assumed.


## Dependencies / sequencing
F02

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/VfedEHqT/34-f03-feature-submit-an-instructor-application-and-view-its-status)

## [F04] [Feature] Create and edit course basics and base price

**ID:** F04
**Type:** Feature
**Actor:** Approved instructor
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Create a course draft and edit its details before publication.

## Implementation scope
- Build the course basics editor and ownership checks.
- Save its EGP/SAR base price; currency conversion belongs to F07.
- Ordered video/file curriculum belongs to F26.

## Acceptance criteria
- [ ] An approved instructor can save and reopen their course draft.
- [ ] Another instructor cannot edit that draft.
- [ ] Saving basics does not publish the course or unlock it for buyers.

## Decisions required before dependent implementation
- Course fields, sections, free previews, and file size limits need decisions.
- Video hosting, upload methods, and protected playback links are undecided.
- Editing or deleting content from a purchased course needs a policy.


## Dependencies / sequencing
F03, F07

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/7hkYfN7b/35-f04-feature-create-and-edit-course-basics-and-base-price)

## [F05] [Feature] Publish an instructor's prepared course

**ID:** F05
**Type:** Feature
**Actor:** Approved instructor
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Publish an owned course when it is ready.

## Implementation scope
- Expose publication from the instructor course workflow.
- Make publication determine catalogue and purchase availability.

## Acceptance criteria
- [ ] Publishing an owned course makes it discoverable and available for checkout.
- [ ] Unapproved users and non-owners cannot publish it.
- [ ] Publication does not require a platform content-review queue.
- [ ] Draft courses cannot be purchased.

## Decisions required before dependent implementation
- Publication readiness, stopping sales, unpublishing, and Admin suspension powers need decisions.


## Dependencies / sequencing
F03, F04, F26

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/rb69qc27/36-f05-feature-publish-an-instructors-prepared-course)

## [F06] [Feature] Browse and search published courses

**ID:** F06
**Type:** Feature
**Actor:** Learner
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Find a published course in the catalogue.

## Implementation scope
- Render published courses and a search flow.
- Course details are handled by F27; taxonomy and filters remain open.

## Acceptance criteria
- [ ] Published courses can be found by browsing and the agreed search fields.
- [ ] Unpublished courses are excluded.
- [ ] Each result identifies the course, instructor, price and currency.
- [ ] An empty result produces an understandable empty state.

## Decisions required before dependent implementation
- Category taxonomy, category administration, and exact search filters are undecided.
- Browsing without login is a proposal that still needs confirmation.


## Dependencies / sequencing
F05, F07

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/24knad38/37-f06-feature-browse-and-search-published-courses)

## [F07] [Feature] Display automatically converted EGP/SAR prices

**ID:** F07
**Type:** Feature
**Actor:** Buyer and instructor
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Set a base price and view the equivalent price in the other supported currency.

## Implementation scope
- Use one base amount/currency for each paid course or consultation.
- Show converted display prices and the final checkout amount.

## Acceptance criteria
- [ ] A base-price change is reflected in the equivalent price.
- [ ] The other price is calculated rather than independently authored.
- [ ] Checkout shows amount and currency before confirmation.
- [ ] Historical charged amounts do not change when the rate changes.

## Decisions required before dependent implementation
- Exchange-rate provider, update frequency, rounding, and default currency by country need decisions.
- A displayed conversion does not establish gateway acceptance or instructor settlement in that currency.
- Conversion fees, gateway fees, and taxes are undecided.


## Dependencies / sequencing
Provider/rate policy decision

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/KjPIAv4O/38-f07-feature-display-automatically-converted-egp-sar-prices)

## [F08] [Feature] Start sandbox checkout through a country-eligible gateway

**ID:** F08
**Type:** Feature
**Actor:** Buyer
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Begin payment for an eligible country without collecting real money.

## Implementation scope
- Resolve a configured eligible gateway and create a sandbox payment session.
- Verify provider capabilities before treating an integration as ready.

## Acceptance criteria
- [ ] An eligible country can start sandbox checkout.
- [ ] An unsupported country receives clear payment unavailability.
- [ ] Success and failure can be exercised without real charges.
- [ ] Provider choice does not replace course or consultation business rules.

## Decisions required before dependent implementation
- Verify sandbox account availability and marketplace/split settlement support in both initial countries.


## Dependencies / sequencing
F07; provider capability validation

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/mWrGJGKZ/39-f08-feature-start-sandbox-checkout-through-a-country-eligible-gateway)

## [F09] [Feature] Calculate commission and instructor share for a paid service

**ID:** F09
**Type:** Feature
**Actor:** Platform and instructor
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Record the revenue allocation for a confirmed sandbox transaction.

## Implementation scope
- Calculate course/consultation commission using agreed rates.
- Record applied amounts without a wallet or withdrawal workflow.

## Acceptance criteria
- [ ] The transaction identifies its commission and instructor share.
- [ ] The consultation rate is lower than the course rate.
- [ ] Later rate changes do not alter existing transaction allocations.
- [ ] Settlement is sandbox-tested only after provider support is verified.

## Decisions required before dependent implementation
- Commission percentages, fee allocation, and taxes need decisions.
- Confirm instructor onboarding, settlement details, and settlement timing with the provider.
- Confirm refunds after instructor settlement and commission reversal; support must not be assumed.


## Dependencies / sequencing
F08; commission policy decision

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/iNpeD96V/40-f09-feature-calculate-commission-and-instructor-share-for-a-paid-service)

## [F10] [Feature] Purchase one course and gain full content access

**ID:** F10
**Type:** Feature
**Actor:** Learner
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Pay for a course and open its purchased content.

## Implementation scope
- Build course checkout, payment outcome and learner access activation.
- Trusted event handling is F11; purchased-course listing is F28.

## Acceptance criteria
- [ ] Confirmed successful payment grants the buyer access once.
- [ ] Failed, cancelled and unconfirmed payments do not grant access.
- [ ] The buyer can access every course video/file without sequential unlocking.
- [ ] No expiry duration or contractual lifetime promise is introduced without confirmation.

## Decisions required before dependent implementation
- Single-course checkout is the initial proposal; a multi-course cart is not assumed.
- Access after course removal or instructor account suspension needs a policy.


## Dependencies / sequencing
F05, F07, F08, F09, F11

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/IA7x7QYA/41-f10-feature-purchase-one-course-and-gain-full-content-access)

## [F11] [Feature] Process verified payment events without duplicate effects

**ID:** F11
**Type:** Feature
**Actor:** Platform
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Receive a payment notification or retry after a delayed provider response.

## Implementation scope
- Verify provider events and persist the resulting payment state.
- Make repeated events safe for course/consultation payments and refunds.

## Acceptance criteria
- [ ] A browser success redirect alone cannot unlock content.
- [ ] Forged notifications do not change payment or access state.
- [ ] Repeated success events create one purchase/access/commission effect.
- [ ] Delayed events update the existing payment rather than create another purchase.

## Decisions required before dependent implementation
- Signatures, provider statuses, and reconciliation behavior depend on the selected gateway.


## Dependencies / sequencing
F08 (shared component; do not wait for F10/F18)

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/nWAshpU3/42-f11-feature-process-verified-payment-events-without-duplicate-effects)

## [F12] [Feature] Complete videos and display learner progress

**ID:** F12
**Type:** Feature
**Actor:** Course purchaser
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Watch a video to its end or use Next, then view saved progress.

## Implementation scope
- Record distinct completed videos per learner/course.
- Display completed count out of total; course completion evaluation is F31.

## Acceptance criteria
- [ ] Playback end and Next each mark the current video completed.
- [ ] Merely starting playback does not mark completion.
- [ ] Repeating either event does not increment the count twice.
- [ ] Progress remains isolated per learner and survives reopening the course.

## Decisions required before dependent implementation
- Reopening completion, adding videos after purchase, and marking a video incomplete need policies.
- If previews are introduced, decide whether they count toward progress and refunds.


## Dependencies / sequencing
F10, F26

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/C042W4NA/43-f12-feature-complete-videos-and-display-learner-progress)

## [F13] [Feature] Submit a course exam and receive an automatic result

**ID:** F13
**Type:** Feature
**Actor:** Course purchaser
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Answer a configured course exam and submit an attempt.

## Implementation scope
- Mark true/false and multiple-choice answers using the configured exam.
- Exam authoring is F29; overall completion is F31.

## Acceptance criteria
- [ ] Submission produces a score and pass/fail result using the configured threshold.
- [ ] A learner can retry without an attempt limit.
- [ ] Attempts belong to the learner and the course.
- [ ] Unauthorized users cannot submit attempts or read private results.

## Decisions required before dependent implementation
- Passing threshold format, question marks, time limits, and answer disclosure need decisions.
- Single-answer versus multi-answer multiple-choice questions is undecided.
- Editing an attempted exam and choosing best versus latest attempt require policies.


## Dependencies / sequencing
F10, F29

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/zKBT4ARA/44-f13-feature-submit-a-course-exam-and-receive-an-automatic-result)

## [F14] [Feature] Download a certificate for a completed course

**ID:** F14
**Type:** Feature
**Actor:** Course learner
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Meet completion requirements and download the platform certificate.

## Implementation scope
- Create the certificate using the platform template when eligible.
- Email delivery is F30; completion evaluation is F31.

## Acceptance criteria
- [ ] An incomplete course does not provide an earned certificate.
- [ ] A completed course offers its learner a download button.
- [ ] Repeated completion events do not produce conflicting certificates.
- [ ] Another learner cannot download a private certificate through this flow.

## Decisions required before dependent implementation
- Template fields, file format, learner name, and verification link need confirmation.
- Certificate validity after a refund or content change needs a policy.


## Dependencies / sequencing
F31

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/7GVxf1I9/45-f14-feature-download-a-certificate-for-a-completed-course)

## [F15] [Feature] Request a course refund within the agreed eligibility limits

**ID:** F15
**Type:** Feature
**Actor:** Course purchaser
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Request a refund and see whether the purchase is eligible.

## Implementation scope
- Evaluate purchase age and completed-video count.
- Track sandbox refund outcome separately from eligibility.

## Acceptance criteria
- [ ] Within the 14-day window, 0–3 completed videos satisfy the video-count rule.
- [ ] Completing the fourth video removes eligibility; Next counts as completion.
- [ ] A purchase outside the agreed time window is ineligible.
- [ ] A failed refund is not presented as completed.
- [ ] Repeated requests/events cannot refund the payment twice.

## Decisions required before dependent implementation
- Decide whether 14 days means 336 elapsed hours or calendar days, and whether the boundary is inclusive.
- Decide automatic versus Admin-approved refunds and effects on messaging, certificates, and repurchases.
- Define commission reversal, gateway fee handling, and instructor settlement recovery.


## Dependencies / sequencing
F10, F11, F12

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/AegqfxsL/46-f15-feature-request-a-course-refund-within-the-agreed-eligibility-limits)

## [F16] [Feature] Create a standalone free or paid consultation offer

**ID:** F16
**Type:** Feature
**Actor:** Approved instructor
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Offer a consultation service that learners can request independently.

## Implementation scope
- Create/edit an owned consultation offer with free/paid pricing.
- Show it to learners without requiring a course purchase.

## Acceptance criteria
- [ ] The offer clearly identifies whether it is free or paid.
- [ ] A paid offer uses an EGP/SAR base price.
- [ ] An instructor cannot edit another instructor's offer.
- [ ] Requesting a free service does not require payment.

## Decisions required before dependent implementation
- Session duration, service description, discovery, and concurrent request limits need decisions.


## Dependencies / sequencing
F03, F07

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/eY2xPRdx/47-f16-feature-create-a-standalone-free-or-paid-consultation-offer)

## [F17] [Feature] Submit and track a standalone consultation request

**ID:** F17
**Type:** Feature
**Actor:** Learner and instructor
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Request an offered consultation and view it as its participant.

## Implementation scope
- Create the learner request and expose it to the offering instructor.
- Appointment agreement and private meeting details belong to F32.

## Acceptance criteria
- [ ] The learner can request a service without buying a course.
- [ ] The instructor can view requests for their own services.
- [ ] The learner can track their own request status.
- [ ] Submission alone neither charges the learner nor confirms an appointment.

## Decisions required before dependent implementation
- Decide how users agree the time and when messaging is allowed without a course purchase.
- Request rejection, expiry, rescheduling, and confirming session completion need policies.
- Free consultation cancellation, no-shows, and instructor cancellation are undecided.


## Dependencies / sequencing
F16

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/2Joyaz3o/48-f17-feature-submit-and-track-a-standalone-consultation-request)

## [F18] [Feature] Pay for a consultation after agreeing its appointment

**ID:** F18
**Type:** Feature
**Actor:** Consultation requester
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Open checkout after both parties have agreed the appointment.

## Implementation scope
- Gate paid checkout by appointment agreement.
- Apply consultation allocation and trusted sandbox confirmation.

## Acceptance criteria
- [ ] A request without an agreed appointment cannot start paid checkout.
- [ ] A free consultation skips paid checkout.
- [ ] Successful and failed payment outcomes are visible to authorized participants.
- [ ] Duplicate provider events do not duplicate payment or commission effects.

## Decisions required before dependent implementation
- Payment deadline, temporary reservation, and prevention of appointment conflicts need decisions.
- Decide who supplies the meeting link and when the learner receives it.


## Dependencies / sequencing
F08, F09, F11, F32

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/vsumboIK/49-f18-feature-pay-for-a-consultation-after-agreeing-its-appointment)

## [F19] [Feature] Cancel a paid consultation using the 24-hour refund rule

**ID:** F19
**Type:** Feature
**Actor:** Consultation requester
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Cancel an agreed consultation and evaluate its refund eligibility.

## Implementation scope
- Compare cancellation time to the recorded appointment.
- Track cancellation and sandbox refund results.

## Acceptance criteria
- [ ] Cancellation at least 24 hours before the appointment qualifies.
- [ ] Cancellation less than 24 hours before does not qualify under this rule.
- [ ] Free/unpaid consultations produce no monetary refund.
- [ ] A successful refund updates the linked payment/request once.
- [ ] A failed refund remains identifiable for follow-up.

## Decisions required before dependent implementation
- Instructor cancellation, no-shows, meeting-link issues, and rescheduling need separate policies.
- Admin approval and commission/gateway fee handling are undecided.


## Dependencies / sequencing
F11, F18, F32

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/FdiIsHOO/50-f19-feature-cancel-a-paid-consultation-using-the-24-hour-refund-rule)

## [F20] [Feature] Read and send private one-to-one text messages

**ID:** F20
**Type:** Feature
**Actor:** Learner and instructor
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Open an authorized conversation and exchange text.

## Implementation scope
- Persist participant-only conversations and messages.
- Course contact initiation controls belong to F33.

## Acceptance criteria
- [ ] Only participants can read or send messages in the conversation.
- [ ] Submitted text appears in the participant conversation history.
- [ ] Attachments and group messages are not accepted.
- [ ] Unauthorized access to a conversation is rejected.

## Decisions required before dependent implementation
- Is the contact option instructor-wide or course-specific?
- Define behavior for existing conversations, refunds, blocking, and message retention.
- Define who can start a consultation conversation without purchasing a course.
- Real-time delivery, read receipts, and notifications are implementation details not yet agreed.


## Dependencies / sequencing
F02; conversation initiation policy

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/eV3aQWDX/51-f20-feature-read-and-send-private-one-to-one-text-messages)

## [F21] [Feature] Inspect sandbox payments and refund outcomes as platform Admin

**ID:** F21
**Type:** Feature
**Actor:** Platform Admin
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Investigate a transaction or refund from the administration workflow.

## Implementation scope
- Provide transaction/refund visibility with service and status context.
- Instructor review belongs to F25, avoiding duplicate implementation.

## Acceptance criteria
- [ ] Admin can inspect course/consultation payment and refund states.
- [ ] Learners and instructors cannot use platform Admin endpoints.
- [ ] Sensitive payment credentials are not exposed.
- [ ] The flow does not grant unrestricted access to private chat or introduce suspension powers.

## Decisions required before dependent implementation
- Account suspension, course suspension, refund authority, and access to private conversations need explicit decisions; unrestricted chat access is not assumed.


## Dependencies / sequencing
F11, F15, F19

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/y2eVaAY3/52-f21-feature-inspect-sandbox-payments-and-refund-outcomes-as-platform-admin)

## [F22] [Enabler] Apply English UI and explicit market/time-zone presentation

**ID:** F22
**Type:** Enabler
**Actor:** All users
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Read money amounts and appointment times in the initial release.

## Implementation scope
- Use English for core interface, certificates and required transactional emails.
- Make EGP/SAR and appointment time zones explicit across relevant flows.

## Acceptance criteria
- [ ] Core flows use English labels and messages.
- [ ] Money values include an unambiguous currency.
- [ ] Appointment views identify date, time and time zone.
- [ ] Initial market configuration covers Egypt and Saudi Arabia with sandbox payments.

## Decisions required before dependent implementation
- Content language is not restricted simply because the interface is English; decide the content-language policy.
- Buyer country detection and instructor settlement country need decisions.


## Dependencies / sequencing
Cross-cutting: apply during relevant features

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/0JKcikbu/53-f22-enabler-apply-english-ui-and-explicit-market-time-zone-presentation)

## [F23] [Enabler] Review domain states, DBML relationships and invariants

**ID:** F23
**Type:** Enabler
**Actor:** Developer
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Prepare a reviewed domain/data design for a feature before implementing it.

## Implementation scope
- Document ownership, relationships, transitions and business constraints in DBML/design notes.
- Review payment/access, progress/refund, exam/certificate and consultation scenarios.

## Acceptance criteria
- [ ] The design distinguishes payment from access and request from appointment.
- [ ] Ownership and privacy constraints are documented.
- [ ] Duplicate-event scenarios preserve one financial effect.
- [ ] Confirmed rules and unresolved policies are clearly separated.
- [ ] The design fits the existing Laravel/Inertia/Vue application.

## Decisions required before dependent implementation
- Video hosting, gateway selection, exchange-rate source, and chat design follow their requirement decisions.
- Microservices and a full academy system are not assumed prerequisites.


## Dependencies / sequencing
Incremental: design each domain before its implementation

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/uSiMqyUG/54-f23-enabler-review-domain-states-dbml-relationships-and-invariants)

## [F24] [Enabler] Verify feature rules with meaningful Pest tests

**ID:** F24
**Type:** Enabler
**Actor:** Developer
**Status:** Planned — Pending; no implementation claimed.

## User scenario / deliverable
Implement a feature and verify its business outcomes.

## Implementation scope
- Add focused tests alongside features rather than wait for all implementation to finish.
- Use Pest/Laravel tests and provider fakes or sandbox boundaries.

## Acceptance criteria
- [ ] Tests cover successful, unauthorized and relevant boundary cases.
- [ ] Video completion is deduplicated and the fourth completed video blocks refund eligibility.
- [ ] Payments/refunds/completion events cannot duplicate their effects.
- [ ] Consultation refund cases cover before, exactly at and after the 24-hour boundary.
- [ ] Tests never collect real money.

## Decisions required before dependent implementation
- Exact expected results depend on resolving policy questions in the relevant cards.


## Dependencies / sequencing
Incremental: verify each feature alongside implementation

**Stack:** Laravel 13, PHP 8.3+, Inertia 3, Vue 3/TypeScript, Tailwind 4, shadcn-vue/Reka UI; Pest.
**Reviewed:** 2026-10-07. Planned work, not completed implementation.

[Trello card](https://trello.com/c/L34kOx77/55-f24-enabler-verify-feature-rules-with-meaningful-pest-tests)

## [F25] [Feature] Review and approve or reject instructor applications

**ID:** F25
**Type:** Feature
**Actor:** Platform Admin
**Status:** Planned — Pending.

## User scenario
Review a submitted application and decide whether the applicant may teach.

## Implementation scope
- View submitted applications and record the platform review outcome.
- Grant instructor capabilities on approval while keeping the account's learner capabilities.

## Acceptance criteria
- [ ] Only platform Admin can approve or reject.
- [ ] Approval enables teaching capabilities; rejection does not.
- [ ] Organization nomination cannot bypass approval.
- [ ] The applicant can see the recorded outcome.

## Dependencies
F03, F02

## Decisions required before dependent implementation
Application fields, evidence, rejection reasons, reapplication and organization nomination flow remain unresolved.

**Stack:** Existing Laravel/Inertia/Vue TypeScript application; shadcn-vue components and meaningful Pest coverage.
**Reviewed:** 2026-10-07. Split from the previous broader Pending cards.

[Trello card](https://trello.com/c/4lVK3IA1/67-f25-feature-review-and-approve-or-reject-instructor-applications)

## [F26] [Feature] Manage ordered course videos and downloadable files

**ID:** F26
**Type:** Feature
**Actor:** Approved instructor
**Status:** Planned — Pending.

## User scenario
Build the owned draft course's curriculum.

## Implementation scope
- Add and order videos; associate downloadable course files.
- Use that order for learner Next navigation.

## Acceptance criteria
- [ ] The instructor can save and reopen an ordered curriculum.
- [ ] A non-owner cannot change the curriculum.
- [ ] Purchased learners can access videos/files without sequential unlocking.
- [ ] Assignments and live teaching are excluded.

## Dependencies
F04

## Decisions required before dependent implementation
Video host/upload/protected links, file limits, sections and changes after purchase require decisions.

**Stack:** Existing Laravel/Inertia/Vue TypeScript application; shadcn-vue components and meaningful Pest coverage.
**Reviewed:** 2026-10-07. Split from the previous broader Pending cards.

[Trello card](https://trello.com/c/RjsuU65s/68-f26-feature-manage-ordered-course-videos-and-downloadable-files)

## [F27] [Feature] View course details before checkout

**ID:** F27
**Type:** Feature
**Actor:** Learner
**Status:** Planned — Pending.

## User scenario
Open a discovered course and assess it before purchase.

## Implementation scope
- Show agreed course information, instructor and current price/currency.
- Link the published course to its checkout flow.

## Acceptance criteria
- [ ] The detail view identifies the selected course and instructor.
- [ ] Price and currency are visible before checkout.
- [ ] Course details do not grant paid content access.
- [ ] An unavailable draft cannot be offered for purchase.

## Dependencies
F05, F06, F07

## Decisions required before dependent implementation
Exact metadata, public access before login and free previews remain unresolved.

**Stack:** Existing Laravel/Inertia/Vue TypeScript application; shadcn-vue components and meaningful Pest coverage.
**Reviewed:** 2026-10-07. Split from the previous broader Pending cards.

[Trello card](https://trello.com/c/0vsAXjPU/69-f27-feature-view-course-details-before-checkout)

## [F28] [Feature] Open purchased courses from My Courses

**ID:** F28
**Type:** Feature
**Actor:** Course purchaser
**Status:** Planned — Pending.

## User scenario
Return to a successfully purchased course.

## Implementation scope
- List the learner's accessible purchased courses.
- Open the course player and show saved video completion count.

## Acceptance criteria
- [ ] A confirmed purchase appears for its buyer.
- [ ] Failed/unconfirmed payment does not create access.
- [ ] The learner can revisit purchased content and saved progress.
- [ ] Another learner's purchases are not visible.

## Dependencies
F10, F12

## Decisions required before dependent implementation
Access after refund/removal/suspension, and access-duration wording need their applicable policies.

**Stack:** Existing Laravel/Inertia/Vue TypeScript application; shadcn-vue components and meaningful Pest coverage.
**Reviewed:** 2026-10-07. Split from the previous broader Pending cards.

[Trello card](https://trello.com/c/NcBKT9d7/70-f28-feature-open-purchased-courses-from-my-courses)

## [F29] [Feature] Configure a course exam and its passing threshold

**ID:** F29
**Type:** Feature
**Actor:** Approved instructor
**Status:** Planned — Pending.

## User scenario
Prepare the owned course's exam before learners attempt it.

## Implementation scope
- Enable the course-level exam and configure true/false or multiple-choice questions.
- Set the instructor's passing threshold; learner submission is F13.

## Acceptance criteria
- [ ] Only the owner can configure the course exam.
- [ ] Initial questions use only the agreed types.
- [ ] The saved passing threshold is used by automatic marking.
- [ ] When the exam is enabled, passing it is required in addition to all videos for completion.

## Dependencies
F04

## Decisions required before dependent implementation
Threshold format, marks/weighting, single/multiple correct answers, time limits, result disclosure and edits after attempts remain unresolved.

**Stack:** Existing Laravel/Inertia/Vue TypeScript application; shadcn-vue components and meaningful Pest coverage.
**Reviewed:** 2026-10-07. Split from the previous broader Pending cards.

[Trello card](https://trello.com/c/vrUSZp51/71-f29-feature-configure-a-course-exam-and-its-passing-threshold)

## [F30] [Feature] Email the earned course certificate

**ID:** F30
**Type:** Feature
**Actor:** Course learner
**Status:** Planned — Pending.

## User scenario
Receive the certificate after earning it.

## Implementation scope
- Trigger email delivery of the earned platform certificate.
- Keep download available when email delivery fails.

## Acceptance criteria
- [ ] Only eligible completion triggers an earned certificate email.
- [ ] The emailed certificate corresponds to the learner's earned course certificate.
- [ ] Email failure does not prevent download.
- [ ] Repeated completion events do not create conflicting certificates.

## Dependencies
F14, F31

## Decisions required before dependent implementation
Certificate format/fields, email delivery provider, resend policy and certificate validity after refunds remain unresolved.

**Stack:** Existing Laravel/Inertia/Vue TypeScript application; shadcn-vue components and meaningful Pest coverage.
**Reviewed:** 2026-10-07. Split from the previous broader Pending cards.

[Trello card](https://trello.com/c/ml0iiyQm/72-f30-feature-email-the-earned-course-certificate)

## [F31] [Feature] Evaluate course completion from videos and an enabled exam

**ID:** F31
**Type:** Feature
**Actor:** Course learner
**Status:** Planned — Pending.

## User scenario
Complete the final required learning activity and see the course completion result.

## Implementation scope
- Evaluate completion after changes to video progress or exam results.
- Expose completion eligibility to certificate issuance.

## Acceptance criteria
- [ ] Without an enabled exam, all videos completed is sufficient.
- [ ] With an enabled exam, all videos and a passing exam result are required.
- [ ] Starting videos or failing the enabled exam cannot qualify the course.
- [ ] Repeated qualifying events produce one consistent completion result.

## Dependencies
F12, F13, F29

## Decisions required before dependent implementation
Best/latest attempt handling, course changes after purchase and reversal of completion remain unresolved.

**Stack:** Existing Laravel/Inertia/Vue TypeScript application; shadcn-vue components and meaningful Pest coverage.
**Reviewed:** 2026-10-07. Split from the previous broader Pending cards.

[Trello card](https://trello.com/c/sHNBm2QU/73-f31-feature-evaluate-course-completion-from-videos-and-an-enabled-exam)

## [F32] [Feature] Agree a consultation appointment and view private meeting details

**ID:** F32
**Type:** Feature
**Actor:** Consultation participants
**Status:** Planned — Pending.

## User scenario
Agree a date/time after a request and return to its appointment details.

## Implementation scope
- Record the agreed appointment with clear date, time and time zone.
- Use an external meeting link; enable paid checkout only after agreement.

## Acceptance criteria
- [ ] Both participants can view the recorded agreed appointment.
- [ ] A third party cannot read private meeting details.
- [ ] Request submission alone does not count as agreement.
- [ ] No automatic slot-booking or custom meeting engine is required.

## Dependencies
F17

## Decisions required before dependent implementation
Agreement interaction, permission to communicate, rescheduling, link supplier/release timing, no-shows and completion confirmation require decisions.

**Stack:** Existing Laravel/Inertia/Vue TypeScript application; shadcn-vue components and meaningful Pest coverage.
**Reviewed:** 2026-10-07. Split from the previous broader Pending cards.

[Trello card](https://trello.com/c/Qm8YO3zp/74-f32-feature-agree-a-consultation-appointment-and-view-private-meeting-details)

## [F33] [Feature] Control whether course purchasers can initiate instructor contact

**ID:** F33
**Type:** Feature
**Actor:** Instructor and course purchaser
**Status:** Planned — Pending.

## User scenario
Enable or disable course-related contact and enforce that choice.

## Implementation scope
- Expose the instructor contact setting at the scope agreed before implementation.
- Check purchase and enabled contact before creating course-related conversations.

## Acceptance criteria
- [ ] An eligible purchaser can initiate contact when enabled.
- [ ] A disabled contact setting blocks new course-related initiation.
- [ ] The instructor alone controls their own setting.
- [ ] The setting does not grant access to someone else's private conversation.

## Dependencies
F02, F10, F20

## Decisions required before dependent implementation
Instructor-wide versus course-specific scope, existing conversations, refunds, blocking and consultation contact permissions must be decided.

**Stack:** Existing Laravel/Inertia/Vue TypeScript application; shadcn-vue components and meaningful Pest coverage.
**Reviewed:** 2026-10-07. Split from the previous broader Pending cards.

[Trello card](https://trello.com/c/0vuSmluF/75-f33-feature-control-whether-course-purchasers-can-initiate-instructor-contact)


# Historical source snapshot before this rewrite

The text below preserves the source requirements and open questions for traceability. It is historical, not the current work breakdown. Current project decisions take precedence over stale wording, particularly the refund cutoff, enabled exam completion rule, lifetime access wording and provider selection. Some requirements have moved to new cards; old card dependencies are not the current sequencing.

### [B01] [Classrooms] Private classrooms and instructor-managed learning

List: Backlog

**Feature:** B01
**Area:** Classrooms
**Audience:** Instructors, Student
**Scope:** Future development — Backlog
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Introduce instructor-managed private classrooms in a later phase.

## Business rules
- Original idea: an instructor creates a classroom, adds learners, and runs a complete teaching process.
- All classroom features are outside Phase 1.
- Activities, course relationships, and pricing are not decided.

## Future development scope
- Define classroom lifecycle and participant roles.
- Choose content, attendance, grades, announcements, exams, and assignment scope.
- Decide standalone versus course-linked classrooms.
- Decide free versus paid access and any subscription duration.

## Open decisions
- Listed activities are discussion options, not all approved requirements.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [B02] [Classrooms] Classroom invitations and student enrolment

List: Backlog

**Feature:** B02
**Area:** Classrooms
**Audience:** Instructors, Student
**Scope:** Future development — Backlog
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Add learner invitations and classroom enrolment when classrooms are introduced.

## Business rules
- Instructors want to add learners to their classrooms.
- Possible methods: existing account, email invitation, or join code; none is selected.
- Classroom enrolment is not implemented in Phase 1.

## Future development scope
- Choose enrolment methods and invitation validity.
- Define learner acceptance and prevent inappropriate addition.
- Define removal, leaving, and subsequent access rights.

## Dependencies
- B01
- F02

## Open decisions
- Decide whether classroom invitation grants access to a paid course.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [B03] [Assignments] Assignments, submissions and instructor feedback

List: Backlog

**Feature:** B03
**Area:** Assignments
**Audience:** Instructors, Student
**Scope:** Future development — Backlog
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Add assignments, submissions, marking, and feedback after Phase 1.

## Business rules
- Course assignments are deferred.
- Assignments may also apply to future classrooms.
- Phase 1 uses videos, files, and automatically marked exams.

## Future development scope
- Define assignment creation, submission, deadlines, and resubmission.
- Define files, grading, and instructor feedback.
- Decide effects on completion and certificates.

## Dependencies
- F04
- B01

## Open decisions
- Manual marking, attempt limits, and late submissions need policies.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [B04] [Live Teaching] Live teaching sessions and optional recordings

List: Backlog

**Feature:** B04
**Area:** Live Teaching
**Audience:** Instructors, Student
**Scope:** Future development — Backlog
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Add live teaching with optional saved recordings later.

## Business rules
- Live course teaching is deferred.
- When implemented, instructors may choose to save session recordings.
- This is separate from Phase 1 standalone consultations using external meeting links.

## Future development scope
- Define scheduling, attendance, and participant access.
- Define recording choice, publication, and retention.
- Decide whether a recording becomes a course video and contributes to progress.

## Dependencies
- F04
- B01

## Open decisions
- Recording source, participant consent, and hosting need decisions.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [B05] [Content Review] Course review and approval before publication

List: Backlog

**Feature:** B05
**Area:** Content Review
**Audience:** Admin, Instructors
**Scope:** Future development — Backlog
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Add an administrative review process before course publication.

## Business rules
- Approved instructors currently publish courses themselves.
- Pre-publication approval was part of the initial idea and is deferred.
- Existing instructor approval does not replace future content review.

## Future development scope
- Define submission, approval, rejection, and reviewer feedback.
- Decide whether edits to published courses require review.
- Define buyer access during review and preservation of the published version.

## Dependencies
- F05

## Open decisions
- Review standards, reviewer roles, and turnaround times are undecided.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [B06] [Course Support] Course-linked consultations and support entitlements

List: Backlog

**Feature:** B06
**Area:** Course Support
**Audience:** Instructors, Student
**Scope:** Future development — Backlog
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Develop course-linked consultation entitlements and richer support.

## Business rules
- Phase 1 consultations are standalone services.
- Consultations included with or linked to a course are deferred.
- Current course contact is an instructor toggle with no defined support package.

## Future development scope
- Define consultation entitlement, duration, and session count for buyers.
- Decide what is included in the course price versus separately purchased.
- Link entitlement to purchase, refund, and possibly completion.

## Dependencies
- F16
- F20

## Open decisions
- Limits, expiry, and included sessions are not yet approved rules.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [B07] [Messaging] Messaging attachments, groups and richer contact controls

List: Backlog

**Feature:** B07
**Area:** Messaging
**Audience:** Student, Instructors
**Scope:** Future development — Backlog
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Expand messaging beyond direct text chat.

## Business rules
- Phase 1 includes learner/instructor text messages only.
- Attachments and group chat are deferred.
- The contact option may be developed further later.

## Future development scope
- Explore file attachments, limits, and protection.
- Explore classroom group chat when classrooms launch.
- Define contact duration, request limits, blocking, or read receipts if needed.

## Dependencies
- F20
- B01

## Open decisions
- Extensions need prioritization; no attachment size or type is approved.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [B08] [Assessment] Advanced assessments and lesson-level quizzes

List: Backlog

**Feature:** B08
**Area:** Assessment
**Audience:** Instructors, Student
**Scope:** Future development — Backlog
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Expand assessments after the course-level first version.

## Business rules
- Current exams are true/false and multiple choice, at course level, with unlimited attempts.
- Assessment capabilities can be developed further later.

## Future development scope
- Explore lesson-level or section-level assessments.
- Explore additional question types, question banks, and varied attempts.
- Explore time limits, attempt limits, and manual marking where needed.
- Define each assessment's effect on completion and certificates.

## Dependencies
- F13

## Open decisions
- These are development directions, not commitments to every listed capability.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [B09] [Payments] Additional countries and payment gateway integrations

List: Backlog

**Feature:** B09
**Area:** Payments
**Audience:** Admin, Student, Instructors
**Scope:** Future development — Backlog
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Add countries and gateway integrations after the initial markets.

## Business rules
- A country may be added when a suitable gateway is configured.
- The current design supports flexibility; actual market expansion is deferred.
- Each market needs verified payment methods, currencies, settlement, and refunds.

## Future development scope
- Select a new market, configure its gateway, and test currencies and settlement.
- Add integrations without changing product rules.
- Extend conversion and pricing for the new market.

## Dependencies
- F07
- F08
- F09

## Open decisions
- No additional countries or providers are mandated.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [B10] [Production Payments] Production payments and real instructor payouts

List: Backlog

**Feature:** B10
**Area:** Production Payments
**Audience:** Admin, Instructors, Student
**Scope:** Future development — Backlog
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Move from sandbox payments to real collection and instructor settlement later.

## Business rules
- The first release is sandbox only.
- Real collection and payouts are deferred.
- Confirm the commission and instructor settlement model with the provider before live operation.

## Future development scope
- Confirm provider, countries, currencies, and account capabilities.
- Confirm instructor onboarding, settlement, and refunds after settlement.
- Set commission rates, fees, failure handling, and reconciliation.
- Verify current operating requirements for the chosen markets before launch.

## Dependencies
- F08
- F09
- F15
- F19

## Open decisions
- The PayTabs recommendation is not a contract or guarantee of support.
- Live launch requires a separate release decision; sandbox work must not activate real payment keys.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [B11] [Localization] Arabic and additional interface languages

List: Backlog

**Feature:** B11
**Area:** Localization
**Audience:** Student, Instructors, Admin
**Scope:** Future development — Backlog
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Consider additional interface languages after the English first version.

## Business rules
- English is the current interface scope.
- Arabic or other languages are potential future development, not Phase 1 requirements.

## Future development scope
- Decide Arabic priority and right-to-left support.
- Translate UI, emails, certificates, and transaction messages.
- Keep user interface language distinct from instructor content language.

## Dependencies
- F22

## Open decisions
- No second language has been confirmed; this card records a possible extension.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F01] [Product] Product scope and learning objectives

List: Pending

**Feature:** F01
**Area:** Product
**Audience:** Admin
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Define Eduforce's product vision and the boundaries of the first release.

## Business rules
- Initial audience: people learning general skills and subject areas.
- Phase 1 combines course sales, standalone consultations, and direct messaging.
- Personal learning goals: backend development, payment gateways, chat, realistic automated testing, system design, and database design.
- Initial markets: Egypt and Saudi Arabia; currencies: EGP and SAR; interface: English; payments: sandbox only.
- No instructor subscription fee. Platform revenue comes from course and consultation commissions; the consultation rate must be lower.
- Private classrooms, assignments, live teaching recordings, course publication review, and course-linked consultations are deferred.

## Acceptance criteria
- All Phase 1 features stay within these boundaries.
- Deferred features remain separate in Backlog.

## Open decisions
- Implementation order and release dates are not set; this list is not a sprint commitment.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F02] [Accounts] Accounts and combined learner/instructor roles

List: Pending

**Feature:** F02
**Area:** Accounts
**Audience:** Student, Instructors, Admin
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Allow one person to learn and teach using the same account.

## Business rules
- A user can buy courses as a learner and teach after instructor approval.
- The platform has its own general Admin; an external academy or organization is not that Admin.
- Learners access their own purchases, learning content, progress, exams, certificates, consultations, and conversations.
- Instructors manage their own courses, consultation offers, and incoming requests.

## Acceptance criteria
- One account supports both learner and instructor roles.
- Unapproved instructors cannot publish courses or offer instructor services.
- Users cannot access another user's private data or protected content.

## Open decisions
- Registration, login, email verification, password recovery, and social login have not been specified.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F03] [Onboarding] Instructor applications and platform approval

List: Pending

**Feature:** F03
**Area:** Onboarding
**Audience:** Instructors, Admin
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Require platform Admin approval before a user can teach.

## Business rules
- Users can submit an instructor application.
- A user may also be added or nominated through an organization they belong to; platform Admin approval is still required.
- External organizations cannot approve instructors on behalf of the platform.
- Instructor approval is separate from course publication; course content review is deferred.

## Acceptance criteria
- Admin can review, approve, or reject an application.
- Approval enables instructor capabilities while preserving learner capabilities.
- Organization nomination cannot bypass platform approval.

## Dependencies
- F02

## Open decisions
- Application fields, documents, rejection reasons, and reapplication rules are undecided.
- Organization meaning, registration, permissions, and nomination flow need clarification; a complete academy system is not assumed.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F04] [Courses] Course authoring with videos and files

List: Pending

**Feature:** F04
**Area:** Courses
**Audience:** Instructors, Student
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Enable approved instructors to build complete courses.

## Business rules
- Phase 1 content includes videos, downloadable files, and a course-level exam.
- Instructors prepare their courses before publication and choose EGP or SAR for the base price.
- Videos need an order for next-video navigation and progress tracking.
- Assignments, live teaching sessions, and their recordings are deferred.

## Acceptance criteria
- An instructor can prepare a course with ordered videos and files.
- Instructors can manage only their own courses.
- Learners can access content according to their purchase entitlement.

## Dependencies
- F03
- F07

## Open decisions
- Course fields, sections, free previews, and file size limits need decisions.
- Video hosting, upload methods, and protected playback links are undecided.
- Editing or deleting content from a purchased course needs a policy.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F05] [Courses] Instructor-controlled course publishing

List: Pending

**Feature:** F05
**Area:** Courses
**Audience:** Instructors
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Let approved instructors publish courses when they consider them ready.

## Business rules
- An approved instructor decides when a course is ready and publishes it.
- Phase 1 does not require Admin approval for each course.
- Instructor account approval remains mandatory.
- Content review and approval of subsequent edits are future work.

## Acceptance criteria
- Approved instructors can publish without a content approval queue.
- Published courses appear in discovery and search.
- Unpublished courses are not sold as available courses.

## Dependencies
- F03
- F04

## Open decisions
- Publication readiness, stopping sales, unpublishing, and Admin suspension powers need decisions.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F06] [Discovery] Course catalogue, categories and search

List: Pending

**Feature:** F06
**Area:** Discovery
**Audience:** Student, Instructors
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Help learners find courses in the skills and subjects they want to study.

## Business rules
- Learners browse courses and search relevant subject areas.
- Course details should show information needed to buy, including instructor and price.
- The initial catalogue interface is English.
- Ratings, reviews, and personalized recommendations are not agreed Phase 1 requirements.

## Acceptance criteria
- Published courses can be found through browsing and search.
- Learners can view course details before buying.
- Price and currency are clearly shown before checkout.

## Dependencies
- F05
- F07

## Open decisions
- Category taxonomy, category administration, and exact search filters are undecided.
- Browsing without login is a proposal that still needs confirmation.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F07] [Pricing] EGP/SAR pricing and automatic conversion

List: Pending

**Feature:** F07
**Area:** Pricing
**Audience:** Instructors, Student
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Support both initial markets using one instructor-defined base price.

## Business rules
- Instructors choose EGP or SAR as the base price currency.
- The other currency's price is converted automatically rather than entered manually.
- This applies to paid courses and consultations.
- Initial proposal: store the charged amount, currency, and exchange rate at payment time, and refund the original amount in its original currency.

## Acceptance criteria
- Changing the base price updates the converted price.
- The buyer sees the final amount and currency before confirming payment.
- Later rate changes do not alter historical transaction amounts.

## Open decisions
- Exchange-rate provider, update frequency, rounding, and default currency by country need decisions.
- A displayed conversion does not establish gateway acceptance or instructor settlement in that currency.
- Conversion fees, gateway fees, and taxes are undecided.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F08] [Payments] Sandbox payment gateway and country routing

List: Pending

**Feature:** F08
**Area:** Payments
**Audience:** Admin, Student, Instructors
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Integrate sandbox payments with a design that supports country-specific gateways.

## Business rules
- Start with Egypt and Saudi Arabia; add countries later when a suitable gateway is configured.
- Phase 1 uses sandbox payments only, with no real money collection.
- Start with one integration and add others as needed.
- PayTabs is the first candidate to evaluate; Paymob is an alternative. No final provider selection or activation is established.
- Evaluate supported currencies, refunds, platform commissions, instructor settlement, and sandbox capabilities.

## Acceptance criteria
- Successful and failed payments can be tested without charging real money.
- A country resolves to an eligible gateway; unsupported countries show clear unavailability.
- Adding a gateway does not require rewriting course or consultation rules.

## Dependencies
- F07
- F09

## Open decisions
- Verify sandbox account availability and marketplace/split settlement support in both initial countries.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F09] [Commissions] Platform commissions and direct instructor settlement

List: Pending

**Feature:** F09
**Area:** Commissions
**Audience:** Admin, Instructors
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Allocate transaction revenue between the platform and the instructor.

## Business rules
- The platform takes commissions on course and consultation sales.
- The consultation commission rate is lower than the course rate.
- There is no instructor subscription fee in Phase 1.
- Instructor proceeds should settle directly through the payment provider; direct does not imply immediate settlement.
- Proposed configuration: separate rates by service type, with the applied rate saved on each transaction.
- Settlement is simulated or tested in sandbox during Phase 1.

## Acceptance criteria
- Each paid service has an identifiable platform commission and instructor share.
- The consultation rate is lower than the course rate.
- Changing rates does not rewrite old transactions.
- No real payouts are sent during sandbox testing.

## Dependencies
- F08

## Open decisions
- Commission percentages, fee allocation, and taxes need decisions.
- Confirm instructor onboarding, settlement details, and settlement timing with the provider.
- Confirm refunds after instructor settlement and commission reversal; support must not be assumed.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F10] [Checkout] Course checkout and lifetime access

List: Pending

**Feature:** F10
**Area:** Checkout
**Audience:** Student, Instructors
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Grant full, non-expiring course access after a confirmed purchase.

## Business rules
- Learners purchase complete courses through the payment gateway.
- A confirmed successful payment grants full access with no expiry in the current scope.
- Failed or unconfirmed payments do not unlock paid content.
- Progress, exam attempts, and certificates relate to the learner's course purchase.

## Acceptance criteria
- Confirmed payment activates access once.
- Failure or cancellation does not grant access.
- Purchased courses are available for the learner to revisit.
- Normal passage of time does not expire the entitlement.

## Dependencies
- F08
- F09

## Open decisions
- Single-course checkout is the initial proposal; a multi-course cart is not assumed.
- Access after course removal or instructor account suspension needs a policy.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F11] [Payments] Payment confirmation, duplicate events and recovery

List: Pending

**Feature:** F11
**Area:** Payments
**Audience:** Student, Instructors, Admin
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Keep purchases and financial effects correct when payment events repeat or arrive late.

## Business rules
- Confirm payments through trusted provider responses, not only a browser return page.
- Repeated success events must not duplicate a purchase, commission, or access entitlement.
- Apply reliable event handling to course purchases, consultation payments, and refunds.
- An order's payment state is independent of browser navigation.

## Acceptance criteria
- Test success, failure, cancellation, and unresolved payments.
- Duplicate notifications do not duplicate financial or learning effects.
- Forged or untrusted notifications do not unlock services.
- Retries and delayed events cannot turn one purchase into two.

## Dependencies
- F08
- F10
- F18

## Open decisions
- Signatures, provider statuses, and reconciliation behavior depend on the selected gateway.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F12] [Learning] Course playback and completion tracking

List: Pending

**Feature:** F12
**Area:** Learning
**Audience:** Student, Instructors
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Track learner progress using completed videos.

## Business rules
- A video is completed when playback finishes.
- Choosing to move to the next video also marks the current video complete.
- Display completed videos as X out of the total.
- This is learner-controlled progress tracking, not proof that every second was watched.
- Course completion requires all videos, plus passing the exam if the instructor makes it mandatory.

## Acceptance criteria
- Finishing playback or choosing Next updates progress.
- Revisiting a completed video does not increase the completed count again.
- Progress is isolated per learner.
- The count supports completion, certificates, and refund eligibility.

## Dependencies
- F10

## Open decisions
- Reopening completion, adding videos after purchase, and marking a video incomplete need policies.
- If previews are introduced, decide whether they count toward progress and refunds.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F13] [Assessment] Course-level quizzes and automatic marking

List: Pending

**Feature:** F13
**Area:** Assessment
**Audience:** Instructors, Student
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Offer automatically marked course-level exams in the first release.

## Business rules
- Question types: true/false and multiple choice.
- Exams are course-level only in Phase 1, not lesson-level.
- Instructors configure marks; the passing threshold should be defined in exam settings.
- Learners have unlimited attempts initially.
- Instructors choose whether passing the exam is required for course completion.

## Acceptance criteria
- Answers are automatically marked and results use configured marks.
- Learners can retry without an attempt limit.
- Mandatory exams block completion until the learner passes and completes all videos.
- Without a mandatory exam, completing the videos is sufficient.

## Dependencies
- F04
- F12

## Open decisions
- Passing threshold format, question marks, time limits, and answer disclosure need decisions.
- Single-answer versus multi-answer multiple-choice questions is undecided.
- Editing an attempted exam and choosing best versus latest attempt require policies.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F14] [Certificates] Completion certificates, email and download

List: Pending

**Feature:** F14
**Area:** Certificates
**Audience:** Student, Admin
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Issue a certificate when the learner meets the course completion requirements.

## Business rules
- Certificates are in Phase 1 and use a platform-owned template.
- Send the certificate by email and provide a download button inside the course.
- Completion means all videos plus a passed exam when mandatory; otherwise all videos.
- A unique certificate identifier and verification link are proposed.

## Acceptance criteria
- No certificate is issued before completion requirements are met.
- Completed courses provide a downloadable certificate and trigger email delivery.
- Repeated completion events do not issue conflicting duplicate certificates.
- Email delivery failure does not block certificate download.

## Dependencies
- F12
- F13

## Open decisions
- Template fields, file format, learner name, and verification link need confirmation.
- Certificate validity after a refund or content change needs a policy.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F15] [Refunds] Course refund policy and access withdrawal

List: Pending

**Feature:** F15
**Area:** Refunds
**Audience:** Student, Admin, Instructors
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Allow course refunds within the agreed time and video-completion limits.

## Business rules
- Refund window: 14 days from the course purchase.
- Current interpretation of the example: 0–3 completed videos allow a request; completing the fourth removes eligibility.
- The phrase 'before completing 3' conflicts with that example; confirm the exact threshold before implementation.
- Eligibility uses recorded progress; selecting Next counts as completing a video.
- Proposal: refund the original amount in its original currency and update access after successful refund.

## Acceptance criteria
- Test 0, 2, 3, and 4 completed videos.
- Test before, exactly at, and after the 14-day boundary.
- A failed refund is not shown as completed.
- Repeated requests or events cannot refund the same payment twice.

## Dependencies
- F11
- F12
- F09

## Open decisions
- Confirm eligibility at exactly 3 completed videos.
- Decide whether 14 days means 336 elapsed hours or calendar days, and whether the boundary is inclusive.
- Decide automatic versus Admin-approved refunds and effects on messaging, certificates, and repurchases.
- Define commission reversal, gateway fee handling, and instructor settlement recovery.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F16] [Consultations] Standalone free and paid consultation offers

List: Pending

**Feature:** F16
**Area:** Consultations
**Audience:** Instructors, Student
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Let approved instructors offer standalone free or paid consultations.

## Business rules
- Instructors choose whether to offer a free or paid consultation service.
- A learner does not need to buy a course from that instructor first.
- Course-linked consultations are deferred.
- Paid offers use an EGP or SAR base price, automatic conversion, and a lower commission than courses.
- Meetings use an external Zoom, Google Meet, or similar link.

## Acceptance criteria
- The offer shows whether it is free or paid.
- Learners can request it without a course purchase.
- Free services do not require a payment.

## Dependencies
- F03
- F07

## Open decisions
- Session duration, service description, discovery, and concurrent request limits need decisions.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F17] [Consultations] Consultation requests and agreed appointment

List: Pending

**Feature:** F17
**Area:** Consultations
**Audience:** Student, Instructors
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Manage consultation requests and agreed appointments without automated slot booking.

## Business rules
- Learners send a request and agree a date and time with the instructor.
- Phase 1 does not use preconfigured bookable appointment slots.
- Record the confirmed appointment in the system to enforce the 24-hour cancellation rule.
- The meeting uses an external link.
- A request/acceptance/appointment/payment/session/cancellation lifecycle is proposed; exact state names are undecided.

## Acceptance criteria
- Learners can submit requests and instructors can review them.
- Both parties see the agreed appointment and its time zone.
- Paid consultation checkout starts only after the appointment is agreed.
- Only authorized participants can access the meeting link.

## Dependencies
- F16
- F20

## Open decisions
- Decide how users agree the time and when messaging is allowed without a course purchase.
- Request rejection, expiry, rescheduling, and confirming session completion need policies.
- Free consultation cancellation, no-shows, and instructor cancellation are undecided.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F18] [Consultation Payments] Consultation payment after appointment agreement

List: Pending

**Feature:** F18
**Area:** Consultation Payments
**Audience:** Student, Instructors
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Charge for paid consultations after both parties agree an appointment.

## Business rules
- Submitting a request alone does not charge the learner.
- Payment starts after the appointment has been agreed.
- Free consultations do not enter paid checkout.
- Apply the consultation commission and instructor settlement model in sandbox.
- The meeting remains external; in-app calling is not included.

## Acceptance criteria
- A new request does not trigger collection.
- Checkout is available only after an appointment is set.
- Payment success or failure is visible without duplicate collection.
- Free consultations do not require payment details.

## Dependencies
- F08
- F09
- F17
- F11

## Open decisions
- Payment deadline, temporary reservation, and prevention of appointment conflicts need decisions.
- Decide who supplies the meeting link and when the learner receives it.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F19] [Consultation Refunds] Consultation cancellation and refunds

List: Pending

**Feature:** F19
**Area:** Consultation Refunds
**Audience:** Student, Instructors, Admin
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Apply paid consultation refund eligibility based on the confirmed appointment.

## Business rules
- A learner is eligible for a refund when cancelling at least 24 hours before the appointment.
- Compare actual time against the recorded appointment while respecting Egypt/Saudi time zones.
- Within the final 24 hours, the learner's cancellation does not qualify under the current rule.
- Refund the linked original payment; Phase 1 processing is sandbox only.

## Acceptance criteria
- Test cancellation more than 24 hours before, exactly 24 hours before, and less than 24 hours before.
- No money is refunded for free or unpaid consultations.
- Successful refund updates the payment and request once.
- Failed refunds remain visible for follow-up.

## Dependencies
- F17
- F18
- F11

## Open decisions
- Instructor cancellation, no-shows, meeting-link issues, and rescheduling need separate policies.
- Admin approval and commission/gateway fee handling are undecided.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F20] [Messaging] Direct text messaging and course contact toggle

List: Pending

**Feature:** F20
**Area:** Messaging
**Audience:** Student, Instructors
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Provide direct text-only communication between learners and instructors.

## Business rules
- Phase 1 chat is one-to-one between a learner and an instructor, using text only.
- No attachments, classrooms, or group chats are included.
- A course purchaser may contact the instructor when the instructor enables the contact option.
- No time allowance, messaging quota, or support package has been agreed.
- Standalone consultation requests need their own permission to communicate and agree an appointment.

## Acceptance criteria
- Only conversation participants can read or send messages.
- A purchaser can initiate course-related contact when enabled.
- Disabling contact prevents unauthorized initiation according to the final policy.
- Attachments are not accepted in Phase 1.

## Dependencies
- F02
- F10
- F17

## Open decisions
- Is the contact option instructor-wide or course-specific?
- Define behavior for existing conversations, refunds, blocking, and message retention.
- Define who can start a consultation conversation without purchasing a course.
- Real-time delivery, read receipts, and notifications are implementation details not yet agreed.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F21] [Administration] Platform administration and operational visibility

List: Pending

**Feature:** F21
**Area:** Administration
**Audience:** Admin
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Support instructor approval and visibility into core platform operations.

## Business rules
- The Admin belongs to the platform, not an external academy.
- Admin decides instructor approval.
- Operational visibility is needed to investigate purchases, refunds, and commissions in sandbox.
- Managing commission rates and country/gateway settings is proposed.
- Mandatory pre-publication course review is not included in Phase 1.

## Acceptance criteria
- Admin can approve or reject instructor applications.
- Admin can inspect relevant transaction states without exposing sensitive payment data.
- Admin permissions are distinct from instructor and learner permissions.

## Dependencies
- F03
- F08
- F09
- F15
- F19

## Open decisions
- Account suspension, course suspension, refund authority, and access to private conversations need explicit decisions; unrestricted chat access is not assumed.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F22] [Localization] English interface and Egypt/Saudi launch configuration

List: Pending

**Feature:** F22
**Area:** Localization
**Audience:** Student, Instructors, Admin
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Apply the initial language and market settings consistently.

## Business rules
- The first interface is English only.
- Initial markets are Egypt and Saudi Arabia, with EGP and SAR.
- Appointments clearly show the appropriate time zone.
- Checkout, certificates, necessary email messages, and request states follow the initial language and market settings.
- Additional countries and interface languages are future work.

## Acceptance criteria
- Core UI, certificates, and necessary transactional emails are English.
- Currency, appointment time, and time zone are unambiguous.
- The first release does not include live payment collection.

## Open decisions
- Content language is not restricted simply because the interface is English; decide the content-language policy.
- Buyer country detection and instructor settlement country need decisions.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F23] [Architecture] System and database design with business invariants

List: Pending

**Feature:** F23
**Area:** Architecture
**Audience:** Admin
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Design a coherent system and database from the business requirements before implementation.

## Business rules
- One account supports learner and instructor roles; instructor approval is distinct from publication.
- Separate courses, purchases, access entitlements, progress, exams, and certificates.
- Separate consultation offers, requests, appointments, payments, and cancellations.
- Financial records preserve transaction amount, currency, and commission at the time of payment.
- Keep gateway integrations separate from product rules to support future countries.
- Conversations are private to participants; repeated events cannot duplicate financial effects.

## Acceptance criteria
- Document relationships, states, permissions, and essential invariants.
- Review the design against purchase, refund, completion, and cancellation scenarios.
- Distinguish settled rules from open decisions before creating the schema.

## Dependencies
- F01–F22

## Open decisions
- Video hosting, gateway selection, exchange-rate source, and chat design follow their requirement decisions.
- Microservices and a full academy system are not assumed prerequisites.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

### [F24] [Testing] Business-focused automated testing

List: Pending

**Feature:** F24
**Area:** Testing
**Audience:** Admin
**Scope:** Phase 1 — Pending
**Planning source:** Eduforce product discussions, October 5–6, 2026.

## Goal
Learn testing by verifying real business rules and failure scenarios.

## Business rules
- Cover account permissions, instructor approval, and course publication.
- Cover sandbox checkout and duplicate, late, or untrusted payment events.
- Cover commissions, conversion, and historical transaction pricing.
- Cover video progress, unlimited exam attempts, conditional completion, and certificates.
- Cover course refunds at the video-count and 14-day boundaries.
- Cover consultation payment after agreement, 24-hour cancellation, and conversation privacy.

## Acceptance criteria
- Test successful, failed, and boundary cases.
- Repeated events cannot duplicate purchases, refunds, or certificates.
- Tests do not charge real money.
- Unauthorized access scenarios are rejected.

## Dependencies
- F02–F23

## Open decisions
- Exact expected results depend on resolving policy questions in the relevant cards.

## Planning note
This card describes planned work, not an implemented feature. Proposals and open decisions must be resolved before they become binding business rules.

