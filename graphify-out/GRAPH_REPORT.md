# Graph Report - Eduforce  (2026-10-19)

## Corpus Check
- 347 files · ~100,562 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: (none) 16, .example 1, .neon 1)

## Summary
- 1667 nodes · 3925 edges · 147 communities (99 shown, 48 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Vue Sidebar Navigation
- Buttons Cards and Badges
- Account Profile and Identity
- Authentication and Status Screens
- Reactive UI Primitives
- Marketplace Forms and Currency
- Pagination and Action Buttons
- Instructor Exam Editing
- Dialog Presentation Components
- Course Details and Checkout Outcomes
- Instructor Dashboard and Workspace
- Catalogue and Instructor Applications
- Consultation Request Tracking
- Product Decisions and Planning
- Frontend Build Toolchain
- Purchases and Applications
- Course Curriculum Editing
- Consultation Checkout Types
- Component Generator Configuration
- Toggle Selection Controls
- Appointment Forms and Labels
- Instructor and Consultation Types
- TypeScript Compiler Configuration
- Database Table Migrations
- Service Currency Editing
- Course Curriculum Types
- Consultation Request Creation
- Breadcrumbs and Separators
- Refund Request Eligibility
- Sidebar Provider State
- Instructor Request Management
- Frontend Runtime Dependencies
- Input Form Controls
- Lesson Player Completion
- Instructor Profile Preview
- Consultation Details and Footer
- Tab Navigation Controls
- Verification Email Mailable
- Certificate Score Presentation
- Course Checkout Screen
- User Model Verification
- Sheet Preview Consumers
- Enrolled Course Listing
- Student Messaging Preview
- Application Service Provider
- Composer Quality Commands
- Shared Styling Utilities
- Instructor Service Management
- PHP Development Dependencies
- Exam Results Sample Data
- Learning Exam Submission
- Account Settings Preferences
- Composer Project Metadata
- Card Styling Utilities
- Course Publication Preview
- Instructor Course Listing
- Inertia Request Middleware
- Registration Feature Tests
- Dropdown Menu Exports
- Sheet Component Exports
- Sheet Content Presentation
- Tooltip Component Exports
- Registration Controller and Service
- Laravel Application Bootstrap
- User Factory Generation
- Frontend Development Dependencies
- Account Password Form
- Sidebar Loading Skeletons
- Instructor Service Persistence
- Learning State and Types
- Home Controller Hierarchy
- Registration Request Validation
- Composer Plugin Configuration
- PHP Runtime Dependencies
- Pest Test Configuration
- Frontend Package Commands
- Reka Selection Primitives
- Confirmation Dialog Components
- Select Content Scrolling
- Table Cell Primitives
- Payment Planning Dependencies
- Checkbox Form Control
- Learning Purchase Persistence
- Purchase Types and Formatting
- PSR Autoload Configuration
- Database Seeder Execution
- Package Manager Constraints
- Optional Platform Dependencies
- Inertia Application Entry
- Confirmation Dialog Content
- Dropdown Checkbox Item
- Dropdown Menu Content
- Dropdown Radio Item
- Dropdown Submenu Content
- Radio Group Control
- Tooltip Content Presentation
- Ziggy Type Integration
- Accordion Item Control
- Badge Style Variants
- Dropdown Menu Control
- Dropdown Item Control
- Dropdown Label Presentation
- Dropdown Radio Group
- Dropdown Submenu Control
- Dropdown Submenu Trigger
- Select Form Control
- Select Item Control
- Select Scroll Down
- Select Scroll Up
- Laravel Package Discovery
- Alert Style Variants
- Aspect Ratio Container
- Sheet Description Presentation
- Sheet Title Presentation
- Dependency Override Configuration
- Workspace Vite Inertia Configuration
- Alert Title Presentation
- Confirmation Dialog Footer
- Avatar Component Presentation
- Card Container Presentation
- Card Content Presentation
- Card Header Presentation
- Card Title Presentation
- Select Label Presentation
- Table Container Presentation
- Table Body Presentation
- Table Caption Presentation
- Table Head Presentation
- Table Header Presentation
- Laravel Touch Icon
- SVG Favicon Asset
- Crawler Access Policy

## God Nodes (most connected - your core abstractions)
1. `vue` - 183 edges
2. `cn()` - 118 edges
3. `reka-ui` - 93 edges
4. `@lucide/vue` - 71 edges
5. `@vueuse/core` - 62 edges
6. `Currency` - 40 edges
7. `@inertiajs/vue3` - 36 edges
8. `compilerOptions` - 19 edges
9. `VerifiedUserMail` - 14 edges
10. `scripts` - 13 edges

## Surprising Connections (you probably didn't know these)
- `{closure#5}()` --references--> `VerifiedUserMail`  [EXTRACTED]
  tests/Feature/UserRegisterTest.php → app/Mail/VerifiedUserMail.php
- `{closure#10}()` --references_constant--> `VerifiedUserMail`  [EXTRACTED]
  tests/Feature/UserRegisterTest.php → app/Mail/VerifiedUserMail.php
- `{closure#4}()` --references_constant--> `VerifiedUserMail`  [EXTRACTED]
  tests/Feature/UserRegisterTest.php → app/Mail/VerifiedUserMail.php
- `Durable project continuity` --shares_data_with--> `Shared project continuity`  [EXTRACTED]
  .codex/PROJECT_CONTEXT.md → docs/PROJECT_CONTEXT.md
- `composer setup and composer ci:check` --conceptually_related_to--> `F24 Business-focused Pest testing`  [INFERRED]
  .github/workflows/tests.yml → docs/planning/PENDING_FEATURES.md

## Import Cycles
- 3-file cycle: `resources/js/components/ui/sidebar/SidebarMenuButton.vue -> resources/js/components/ui/sidebar/SidebarMenuButtonChild.vue -> resources/js/components/ui/sidebar/index.ts -> resources/js/components/ui/sidebar/SidebarMenuButton.vue`

## Hyperedges (group relationships)
- **Shared verified payment infrastructure** — docs_planning_pending_features_payment_events, docs_planning_pending_features_course_purchase, docs_planning_pending_features_consultation_payment [EXTRACTED 1.00]
- **Planned progress-to-certificate flow** — docs_planning_pending_features_progress, docs_planning_pending_features_completion, docs_planning_pending_features_certificate, docs_planning_pending_features_certificate_email [EXTRACTED 1.00]

## Communities (147 total, 48 thin omitted)

### Community 0 - "Vue Sidebar Navigation"
Cohesion: 0.05
Nodes (31): vue, messages, props, SidebarMenuButtonVariants, SidebarProps, props, props, props (+23 more)

### Community 1 - "Buttons Cards and Badges"
Cohesion: 0.09
Nodes (27): appointment, props, emit, free, price, props, emit, emit (+19 more)

### Community 2 - "Account Profile and Identity"
Cohesion: 0.05
Nodes (25): avatar, avatarInput, emit, error, initials, profile, removeAvatar(), selectAvatar() (+17 more)

### Community 3 - "Authentication and Status Screens"
Cohesion: 0.08
Nodes (24): @lucide/vue, format(), emit, emit, failed, props, email, sent (+16 more)

### Community 4 - "Reactive UI Primitives"
Cohesion: 0.04
Nodes (33): @vueuse/core, delegatedProps, props, delegatedProps, props, delegatedProps, props, delegatedProps (+25 more)

### Community 5 - "Marketplace Forms and Currency"
Cohesion: 0.08
Nodes (28): emit, preferences, country, currency, context, emit, errors, preferredTime (+20 more)

### Community 6 - "Pagination and Action Buttons"
Cohesion: 0.06
Nodes (28): delegatedProps, props, delegatedProps, props, Props, ButtonVariants, delegatedProps, emits (+20 more)

### Community 7 - "Instructor Exam Editing"
Cohesion: 0.08
Nodes (28): emit, fileName, kind, minutes, props, ready, seconds, submit() (+20 more)

### Community 8 - "Dialog Presentation Components"
Cohesion: 0.06
Nodes (22): emits, forwarded, props, props, delegatedProps, emits, forwarded, props (+14 more)

### Community 9 - "Course Details and Checkout Outcomes"
Cohesion: 0.09
Nodes (16): currency, previewOpen, previewTitle, copied, copyMessage, currency, previewOpen, previewTitle (+8 more)

### Community 10 - "Instructor Dashboard and Workspace"
Cohesion: 0.09
Nodes (18): useInstructorWorkspace(), createCourse(), deleteDraft(), publish(), save(), validSavedCourse(), { course, notice, save }, navigate() (+10 more)

### Community 11 - "Catalogue and Instructor Applications"
Cohesion: 0.07
Nodes (16): affiliation, bio, emit, expertise, headline, profile, ready, categories (+8 more)

### Community 12 - "Consultation Request Tracking"
Cohesion: 0.08
Nodes (25): appointment, closed(), currency, currentStep, filter, filters, free, instructor (+17 more)

### Community 13 - "Product Decisions and Planning"
Cohesion: 0.09
Nodes (23): Durable project continuity, Weekly grouped GitHub Actions updates, GitHub Actions CI, composer setup and composer ci:check, Unresolved payment integration decisions, Proposed backend implementation sequence, Eduforce DBML diagram, F23 Domain states and DBML invariants (+15 more)

### Community 14 - "Frontend Build Toolchain"
Cohesion: 0.10
Nodes (22): private, $schema, type, concurrently, fontaine, @inertiajs/vite, @laravel/multiplex, laravel-vite-plugin (+14 more)

### Community 15 - "Purchases and Applications"
Cohesion: 0.10
Nodes (12): currency, open, state, title, currency, filter, now, receipt (+4 more)

### Community 16 - "Course Curriculum Editing"
Cohesion: 0.09
Nodes (11): confirmOpen, { course, notice, save }, editing, editorKey, editorOpen, lessons, moduleId, pendingRemoval (+3 more)

### Community 17 - "Consultation Checkout Types"
Cohesion: 0.10
Nodes (17): sampleConsultationRequests, chargeAmount, chargeCurrency, country, currency, eligible, { localRequests }, method (+9 more)

### Community 18 - "Component Generator Configuration"
Cohesion: 0.10
Nodes (20): aliases, components, composables, lib, ui, utils, font, iconLibrary (+12 more)

### Community 19 - "Toggle Selection Controls"
Cohesion: 0.12
Nodes (16): class-variance-authority, delegatedProps, emits, forwarded, props, ToggleGroupVariants, context, delegatedProps (+8 more)

### Community 20 - "Appointment Forms and Labels"
Cohesion: 0.13
Nodes (13): emit, message, preview(), emit, history, submit(), text, emit (+5 more)

### Community 21 - "Instructor and Consultation Types"
Cohesion: 0.17
Nodes (14): emit, localRequests, storageNotice, notice, services, sampleInstructorProfile, Course, ConsultationDiscussionMessage (+6 more)

### Community 22 - "TypeScript Compiler Configuration"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, jsxImportSource, lib (+12 more)

### Community 23 - "Database Table Migrations"
Cohesion: 0.16
Nodes (8): {closure#1}(), {closure#2}(), {closure#3}(), {closure#1}(), {closure#2}(), {closure#1}(), {closure#2}(), {closure#3}()

### Community 24 - "Service Currency Editing"
Cohesion: 0.13
Nodes (13): emit, method, answer, draft, duration, emit, error, pricing (+5 more)

### Community 25 - "Course Curriculum Types"
Cohesion: 0.13
Nodes (10): props, videoCount, emit, openModules, props, emits, forwarded, props (+2 more)

### Community 26 - "Consultation Request Creation"
Cohesion: 0.11
Nodes (17): load(), persist(), useConsultationPreview(), addMessage(), create(), { create }, currency, draft (+9 more)

### Community 27 - "Breadcrumbs and Separators"
Cohesion: 0.13
Nodes (9): props, props, props, props, props, props, props, delegatedProps (+1 more)

### Community 28 - "Refund Request Eligibility"
Cohesion: 0.12
Nodes (15): eligibility, refundEligibility(), canSave, currency, draft, draftTransaction, eligibility, now (+7 more)

### Community 29 - "Sidebar Provider State"
Cohesion: 0.15
Nodes (16): emits, isMobile, open, openMobile, props, setOpen(), setOpenMobile(), state (+8 more)

### Community 30 - "Instructor Request Management"
Cohesion: 0.13
Nodes (15): apply(), closed(), confirmOpen, currentStep, filter, message(), notice, pending (+7 more)

### Community 31 - "Frontend Runtime Dependencies"
Cohesion: 0.11
Nodes (18): dependencies, class-variance-authority, clsx, concurrently, @inertiajs/vite, @inertiajs/vue3, laravel-vite-plugin, @lucide/vue (+10 more)

### Community 32 - "Input Form Controls"
Cohesion: 0.12
Nodes (12): emit, props, search, visible, emit, checks, props, strength (+4 more)

### Community 33 - "Lesson Player Completion"
Cohesion: 0.12
Nodes (15): completeAndNext(), { completedIds, markCompleted, storageAvailable }, currentId, currentIndex, currentLesson, currentModule, message, messageNotice (+7 more)

### Community 34 - "Instructor Profile Preview"
Cohesion: 0.12
Nodes (13): currency, instructor, message, messageNotice, metadata, preview(), { publicServices }, sheetKind (+5 more)

### Community 35 - "Consultation Details and Footer"
Cohesion: 0.12
Nodes (12): emit, links, year, currency, exclusions, instructor, props, { publicServices } (+4 more)

### Community 36 - "Tab Navigation Controls"
Cohesion: 0.12
Nodes (11): delegatedProps, emits, forwarded, props, delegatedProps, props, delegatedProps, props (+3 more)

### Community 37 - "Verification Email Mailable"
Cohesion: 0.18
Nodes (3): VerifiedUserMail, {closure#10}(), {closure#4}()

### Community 38 - "Certificate Score Presentation"
Cohesion: 0.14
Nodes (12): scoreAttempt(), { attempts, completedIds, examPassed, scoreAttempt, storageAvailable }, certificateProps, currency, eligible, expanded, noticeOpen, noticeTitle (+4 more)

### Community 39 - "Course Checkout Screen"
Cohesion: 0.13
Nodes (9): buyer, chargeAmount, chargeCurrency, country, currency, method, order, previewOpen (+1 more)

### Community 41 - "Sheet Preview Consumers"
Cohesion: 0.20
Nodes (5): { isMobile, state, openMobile, setOpenMobile }, props, legalOpen, legalTitle, menuOpen

### Community 42 - "Enrolled Course Listing"
Cohesion: 0.16
Nodes (11): completedCount, { completedIds, examPassed }, courses, currency, filter, filters, isCompleted(), previewOpen (+3 more)

### Community 43 - "Student Messaging Preview"
Cohesion: 0.16
Nodes (9): sampleConversations, conversations, currency, selected, selectedId, sheetOpen, sheetTitle, Conversation (+1 more)

### Community 45 - "Composer Quality Commands"
Cohesion: 0.15
Nodes (13): scripts, ci:check, dev, lint, lint:check, post-autoload-dump, post-create-project-cmd, post-root-package-install (+5 more)

### Community 46 - "Shared Styling Utilities"
Cohesion: 0.15
Nodes (7): props, props, props, props, props, props, cn()

### Community 47 - "Instructor Service Management"
Cohesion: 0.15
Nodes (7): confirmOpen, deleting, editing, filter, { localRequests }, { services, notice, save, toggle, remove }, visible

### Community 48 - "PHP Development Dependencies"
Cohesion: 0.17
Nodes (12): require-dev, fakerphp/faker, larastan/larastan, laravel/boost, laravel/pail, laravel/pao, laravel/pint, laravel/sail (+4 more)

### Community 49 - "Exam Results Sample Data"
Cohesion: 0.20
Nodes (8): sampleCompletedIds, sampleCourseTitle, sampleInstructor, sampleModules, sampleVideoSource, attempt, { attempts, completedIds, examPassed, storageAvailable, scoreAttempt }, correctCount

### Community 50 - "Learning Exam Submission"
Cohesion: 0.17
Nodes (8): answeredCount, answers, confirmationOpen, currentAnswer, currentIndex, currentQuestion, notice, { submitAttempt, storageAvailable }

### Community 51 - "Account Settings Preferences"
Cohesion: 0.17
Nodes (7): preferences, previewOpen, previewTitle, profile, savedMessage, section, strength

### Community 52 - "Composer Project Metadata"
Cohesion: 0.18
Nodes (10): autoload-dev, psr-4, description, keywords, license, minimum-stability, name, Tests\\ (+2 more)

### Community 53 - "Card Styling Utilities"
Cohesion: 0.20
Nodes (5): clsx, tailwind-merge, props, props, props

### Community 54 - "Course Publication Preview"
Cohesion: 0.18
Nodes (7): checks, confirmOpen, { course, contactEnabled, notice, save, publish }, previewOpen, props, ready, videos

### Community 55 - "Instructor Course Listing"
Cohesion: 0.18
Nodes (7): confirmOpen, { courses, notice, createCourse, deleteDraft }, filter, removing, search, sort, visible

### Community 58 - "Dropdown Menu Exports"
Cohesion: 0.22
Nodes (5): props, delegatedProps, props, forwardedProps, props

### Community 59 - "Sheet Component Exports"
Cohesion: 0.22
Nodes (5): emits, forwarded, props, props, props

### Community 60 - "Sheet Content Presentation"
Cohesion: 0.22
Nodes (7): delegatedProps, emits, forwarded, props, SheetContentProps, delegatedProps, props

### Community 61 - "Tooltip Component Exports"
Cohesion: 0.22
Nodes (5): emits, forwarded, props, props, props

### Community 65 - "Frontend Development Dependencies"
Cohesion: 0.25
Nodes (8): devDependencies, fontaine, @laravel/vite-plugin-wayfinder, prettier, tw-animate-css, @types/node, vite-plus, vue-tsc

### Community 66 - "Account Password Form"
Cohesion: 0.29
Nodes (6): confirmation, current, emit, error, password, submit()

### Community 67 - "Sidebar Loading Skeletons"
Cohesion: 0.25
Nodes (4): props, width, props, SkeletonProps

### Community 68 - "Instructor Service Persistence"
Cohesion: 0.39
Nodes (8): useInstructorServices(), persist(), remove(), save(), toggle(), valid(), confirmDelete(), submit()

### Community 69 - "Learning State and Types"
Cohesion: 0.39
Nodes (5): videoIds, sampleExam, CourseExam, ExamAttempt, ExamOption

### Community 70 - "Home Controller Hierarchy"
Cohesion: 0.29
Nodes (3): Controller, HomeController, UserAuthController

### Community 72 - "Composer Plugin Configuration"
Cohesion: 0.29
Nodes (7): pestphp/pest-plugin, php-http/discovery, config, allow-plugins, optimize-autoloader, preferred-install, sort-packages

### Community 73 - "PHP Runtime Dependencies"
Cohesion: 0.29
Nodes (7): require, inertiajs/inertia-laravel, laravel/framework, laravel/tinker, laravel/wayfinder, php, tightenco/ziggy

### Community 76 - "Frontend Package Commands"
Cohesion: 0.29
Nodes (7): scripts, build, build:ssr, check, check:fix, dev, types:check

### Community 77 - "Reka Selection Primitives"
Cohesion: 0.29
Nodes (4): reka-ui, props, props, props

### Community 78 - "Confirmation Dialog Components"
Cohesion: 0.29
Nodes (4): emits, forwarded, props, props

### Community 79 - "Select Content Scrolling"
Cohesion: 0.29
Nodes (4): delegatedProps, emits, forwarded, props

### Community 80 - "Table Cell Primitives"
Cohesion: 0.29
Nodes (4): props, delegatedProps, props, props

### Community 81 - "Payment Planning Dependencies"
Cohesion: 0.33
Nodes (6): F18 Pay after appointment agreement, F10 Purchase course and gain full access, 11 deferred Backlog capabilities, F11 Verified idempotent payment events, 33 planned Pending features, Trello planning board

### Community 82 - "Checkbox Form Control"
Cohesion: 0.33
Nodes (4): delegatedProps, emits, forwarded, props

### Community 83 - "Learning Purchase Persistence"
Cohesion: 0.47
Nodes (6): useLearningPreview(), markCompleted(), persist(), submitAttempt(), usePurchasePreview(), submit()

### Community 84 - "Purchase Types and Formatting"
Cohesion: 0.47
Nodes (4): formatPurchaseAmount(), PurchaseBase, PurchaseTransaction, RefundEligibility

### Community 85 - "PSR Autoload Configuration"
Cohesion: 0.40
Nodes (5): autoload, psr-4, App\\, Database\\Factories\\, Database\\Seeders\\

### Community 89 - "Package Manager Constraints"
Cohesion: 0.40
Nodes (5): devEngines, packageManager, name, onFail, version

### Community 90 - "Optional Platform Dependencies"
Cohesion: 0.40
Nodes (5): optionalDependencies, @laravel/multiplex, lightningcss-linux-x64-gnu, @rollup/rollup-linux-x64-gnu, @tailwindcss/oxide-linux-x64-gnu

### Community 92 - "Confirmation Dialog Content"
Cohesion: 0.40
Nodes (4): delegatedProps, emits, forwarded, props

### Community 93 - "Dropdown Checkbox Item"
Cohesion: 0.40
Nodes (4): delegatedProps, emits, forwarded, props

### Community 94 - "Dropdown Menu Content"
Cohesion: 0.40
Nodes (4): delegatedProps, emits, forwarded, props

### Community 95 - "Dropdown Radio Item"
Cohesion: 0.40
Nodes (4): delegatedProps, emits, forwarded, props

### Community 96 - "Dropdown Submenu Content"
Cohesion: 0.40
Nodes (4): delegatedProps, emits, forwarded, props

### Community 97 - "Radio Group Control"
Cohesion: 0.40
Nodes (4): delegatedProps, emits, forwarded, props

### Community 98 - "Tooltip Content Presentation"
Cohesion: 0.40
Nodes (4): delegatedProps, emits, forwarded, props

### Community 100 - "Ziggy Type Integration"
Cohesion: 0.50
Nodes (3): ziggy-js, ComponentCustomProperties, vue

### Community 101 - "Accordion Item Control"
Cohesion: 0.50
Nodes (3): delegatedProps, forwardedProps, props

### Community 102 - "Badge Style Variants"
Cohesion: 0.50
Nodes (3): delegatedProps, props, BadgeVariants

### Community 103 - "Dropdown Menu Control"
Cohesion: 0.50
Nodes (3): emits, forwarded, props

### Community 104 - "Dropdown Item Control"
Cohesion: 0.50
Nodes (3): delegatedProps, forwardedProps, props

### Community 105 - "Dropdown Label Presentation"
Cohesion: 0.50
Nodes (3): delegatedProps, forwardedProps, props

### Community 106 - "Dropdown Radio Group"
Cohesion: 0.50
Nodes (3): emits, forwarded, props

### Community 107 - "Dropdown Submenu Control"
Cohesion: 0.50
Nodes (3): emits, forwarded, props

### Community 108 - "Dropdown Submenu Trigger"
Cohesion: 0.50
Nodes (3): delegatedProps, forwardedProps, props

### Community 109 - "Select Form Control"
Cohesion: 0.50
Nodes (3): emits, forwarded, props

### Community 110 - "Select Item Control"
Cohesion: 0.50
Nodes (3): delegatedProps, forwardedProps, props

### Community 111 - "Select Scroll Down"
Cohesion: 0.50
Nodes (3): delegatedProps, forwardedProps, props

### Community 112 - "Select Scroll Up"
Cohesion: 0.50
Nodes (3): delegatedProps, forwardedProps, props

### Community 113 - "Laravel Package Discovery"
Cohesion: 0.67
Nodes (3): extra, laravel, dont-discover

## Knowledge Gaps
- **31 isolated node(s):** `concurrently`, `tailwindcss`, `typescript`, `vite`, `@types/node` (+26 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1001 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **48 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vue` connect `Vue Sidebar Navigation` to `Buttons Cards and Badges`, `Account Profile and Identity`, `Authentication and Status Screens`, `Reactive UI Primitives`, `Marketplace Forms and Currency`, `Pagination and Action Buttons`, `Instructor Exam Editing`, `Dialog Presentation Components`, `Course Details and Checkout Outcomes`, `Instructor Dashboard and Workspace`, `Catalogue and Instructor Applications`, `Consultation Request Tracking`, `Frontend Build Toolchain`, `Purchases and Applications`, `Course Curriculum Editing`, `Consultation Checkout Types`, `Toggle Selection Controls`, `Appointment Forms and Labels`, `Instructor and Consultation Types`, `Service Currency Editing`, `Course Curriculum Types`, `Consultation Request Creation`, `Breadcrumbs and Separators`, `Refund Request Eligibility`, `Sidebar Provider State`, `Instructor Request Management`, `Input Form Controls`, `Lesson Player Completion`, `Instructor Profile Preview`, `Consultation Details and Footer`, `Tab Navigation Controls`, `Certificate Score Presentation`, `Course Checkout Screen`, `Sheet Preview Consumers`, `Enrolled Course Listing`, `Student Messaging Preview`, `Shared Styling Utilities`, `Instructor Service Management`, `Exam Results Sample Data`, `Learning Exam Submission`, `Account Settings Preferences`, `Card Styling Utilities`, `Course Publication Preview`, `Instructor Course Listing`, `Dropdown Menu Exports`, `Sheet Content Presentation`, `Account Password Form`, `Sidebar Loading Skeletons`, `Learning State and Types`, `Select Content Scrolling`, `Table Cell Primitives`, `Checkbox Form Control`, `Purchase Types and Formatting`, `Confirmation Dialog Content`, `Dropdown Checkbox Item`, `Dropdown Menu Content`, `Dropdown Radio Item`, `Dropdown Submenu Content`, `Radio Group Control`, `Tooltip Content Presentation`, `Accordion Item Control`, `Badge Style Variants`, `Dropdown Item Control`, `Dropdown Label Presentation`, `Dropdown Submenu Trigger`, `Select Item Control`, `Select Scroll Down`, `Select Scroll Up`, `Alert Style Variants`, `Sheet Description Presentation`, `Sheet Title Presentation`, `Alert Title Presentation`, `Confirmation Dialog Footer`, `Avatar Component Presentation`, `Card Container Presentation`, `Card Content Presentation`, `Card Header Presentation`, `Card Title Presentation`, `Select Label Presentation`, `Table Container Presentation`, `Table Body Presentation`, `Table Caption Presentation`, `Table Head Presentation`, `Table Header Presentation`?**
  _High betweenness centrality (0.274) - this node is a cross-community bridge._
- **What connects `concurrently`, `tailwindcss`, `typescript` to the rest of the system?**
  _31 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Vue Sidebar Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.05143191116306254 - nodes in this community are weakly interconnected._
- **Why does `reka-ui` connect `Reka Selection Primitives` to `Vue Sidebar Navigation`, `Buttons Cards and Badges`, `Account Profile and Identity`, `Select Label Presentation`, `Reactive UI Primitives`, `Pagination and Action Buttons`, `Dialog Presentation Components`, `Frontend Build Toolchain`, `Toggle Selection Controls`, `Course Curriculum Types`, `Breadcrumbs and Separators`, `Sidebar Provider State`, `Tab Navigation Controls`, `Dropdown Menu Exports`, `Sheet Component Exports`, `Sheet Content Presentation`, `Tooltip Component Exports`, `Confirmation Dialog Components`, `Select Content Scrolling`, `Checkbox Form Control`, `Confirmation Dialog Content`, `Dropdown Checkbox Item`, `Dropdown Menu Content`, `Dropdown Radio Item`, `Dropdown Submenu Content`, `Radio Group Control`, `Tooltip Content Presentation`, `Accordion Item Control`, `Badge Style Variants`, `Dropdown Menu Control`, `Dropdown Item Control`, `Dropdown Label Presentation`, `Dropdown Radio Group`, `Dropdown Submenu Control`, `Dropdown Submenu Trigger`, `Select Form Control`, `Select Item Control`, `Select Scroll Down`, `Select Scroll Up`, `Aspect Ratio Container`, `Sheet Description Presentation`, `Sheet Title Presentation`, `Avatar Component Presentation`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Should `Buttons Cards and Badges` be split into smaller, more focused modules?**
  _Cohesion score 0.08709273182957393 - nodes in this community are weakly interconnected._
- **Why does `@lucide/vue` connect `Authentication and Status Screens` to `Vue Sidebar Navigation`, `Buttons Cards and Badges`, `Account Profile and Identity`, `Reactive UI Primitives`, `Marketplace Forms and Currency`, `Pagination and Action Buttons`, `Dialog Presentation Components`, `Course Details and Checkout Outcomes`, `Catalogue and Instructor Applications`, `Consultation Request Tracking`, `Frontend Build Toolchain`, `Consultation Checkout Types`, `Appointment Forms and Labels`, `Service Currency Editing`, `Course Curriculum Types`, `Breadcrumbs and Separators`, `Refund Request Eligibility`, `Input Form Controls`, `Lesson Player Completion`, `Instructor Profile Preview`, `Consultation Details and Footer`, `Certificate Score Presentation`, `Course Checkout Screen`, `Sheet Preview Consumers`, `Enrolled Course Listing`, `Exam Results Sample Data`, `Learning Exam Submission`, `Account Settings Preferences`, `Sheet Content Presentation`, `Account Password Form`, `Checkbox Form Control`, `Dropdown Checkbox Item`, `Dropdown Radio Item`, `Dropdown Submenu Trigger`, `Select Item Control`, `Select Scroll Down`, `Select Scroll Up`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `Account Profile and Identity` be split into smaller, more focused modules?**
  _Cohesion score 0.050980392156862744 - nodes in this community are weakly interconnected._
## Extraction limitations

Token cost: unavailable. Agent tooling did not expose usage; zero values above are placeholders, not measured zero cost.

Health warning: 835 dangling-endpoint edges, 2 self-loops, and 293 same-endpoint edges collapsed in the undirected graph. Graph relationships may be incomplete; external and unresolved references are not verified definitions. 54 code files yielded no symbols. SVG favicon was inspected as source only.

graphify-out/ was written into the working tree and currently appears in git status. You may ignore it or share selected outputs: https://docs.graphify.com/guides/team-workflows
