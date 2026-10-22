# Eduforce — Backend Implementation Roadmap

Date: 2026-10-09.

This proposed implementation sequence follows feature dependencies. It is not a record of completed work or a final database design. Current screens use previews and sample data.

Start with accounts and instructor permissions, then course creation.

## Proposed implementation order

| # | Area | Scope |
|---|---|---|
| 1 | Accounts | Registration, sign-in, password recovery, account settings |
| 2 | Permissions | Learner and instructor capabilities in one account, Admin permissions, authorization using Policies |
| 3 | Instructor applications | Submission, platform Admin review, approval or rejection, activation of instructor permissions |
| 4 | Course creation | Details and pricing, modules and ordered lessons, file uploads, drafts, publishing by approved instructors |
| 5 | Catalogue | Published courses, search and filters, course details, instructor profiles |
| 6 | Consultation services | Free or paid services, pricing and duration, editing and visibility; independent of course purchases or publishing |
| 7 | Requests and conversations | Consultation requests, text messages, appointment proposals and mutual agreement, cancellation and rejection |
| 8 | Payments and purchases | Sandbox gateway, transaction records, idempotent gateway notifications, course access after confirmed payment; consultation payment after mutual appointment agreement |
| 9 | Learning | Purchaser-only content access, completed videos, progress calculation |
| 10 | Exams and certificates | Questions, attempts and grading, course completion requirements, certificate issuance, download and email delivery |
| 11 | Refunds | Enforce course and consultation policies, record requests and refund outcomes |
| 12 | Administration and earnings | User management, transactions and refunds, commissions, instructor reports |

## Workflow for each area

1. Review the business rules and agree on the data design.
2. Create migrations, models, relationships, and required constraints.
3. Add validation using Form Requests and authorization using Policies.
4. Implement controllers and connect the Inertia screens, gradually replacing preview data with server data.
5. Test core behavior and sensitive cases such as access restrictions and duplicate payment notifications.

Use an Action for operations involving multiple steps or a shared business rule, such as confirming payment and granting access. Avoid repositories or extra layers solely to wrap Eloquent.

## Confirmed rules to preserve

- The platform Admin approves instructors. Approved instructors publish their own courses; administrative course review is deferred.
- Purchasing a course unlocks all its content, without progressive lesson unlocking.
- A video is completed when it ends or the learner proceeds using Next, not when playback starts.
- Course completion requires every video and passing the exam if enabled.
- Exams are optional. Initial question types are multiple choice and true/false; instructors set passing scores, and attempts are unlimited.
- Consultations are independent of courses. Free consultations skip payment; paid consultations are paid after appointment agreement.
- Meetings use an external tool such as Zoom or Google Meet, without a custom meeting engine or automatic slot booking.
- Course refunds are available within 14 days of purchase with no more than 3 completed videos. Completing the fourth video removes eligibility.
- Paid consultation refunds require cancellation at least 24 hours before the agreed appointment.
- Initial support covers Egypt and Saudi Arabia, EGP and SAR, and Sandbox payments only.
- Subscriptions, wallets, and withdrawal requests are outside the initial scope.

## Decisions required before payment integration

- Choose a payment gateway and verify support for Egypt, Saudi Arabia, and the required currencies.
- Set course and consultation commission rates. Consultation commission is lower, but rates remain undecided.
- Choose an exchange-rate source and define conversion and collection mechanics.
- Verify direct settlement to instructors and the gateway's payment splitting and refund mechanics.

The production database, video hosting, chat transport, and email provider remain open decisions to resolve before integrating each area. Preview prices, currency conversions, and payment states are not final business rules.

Ongoing decision reference: [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md).
| #   | الجزء                | المطلوب                                                                                                                                             |
| --- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | الحسابات             | تسجيل، دخول، استعادة كلمة المرور، إعدادات الحساب                                                                                                    |
| 2   | الصلاحيات            | طالب ومدرّس بنفس الحساب، وصلاحيات Admin؛ حماية العمليات باستخدام Policies                                                                           |
| 3   | طلب المدرّس          | تقديم الطلب، مراجعة أدمن المنصة، قبول أو رفض، تفعيل صلاحيات التدريس                                                                                 |
| 4   | بناء الكورس          | البيانات والسعر، الوحدات والدروس وترتيبها، رفع الملفات، مسودة ونشر بواسطة المدرّس المعتمد                                                           |
| 5   | الكتالوج             | عرض الكورسات المنشورة، البحث والفلاتر، تفاصيل الكورس والمدرّس                                                                                       |
| 6   | خدمات الاستشارات     | خدمة مجانية أو مدفوعة، السعر والمدة، التعديل والظهور؛ مستقلة عن شراء أو نشر كورس                                                                    |
| 7   | الطلبات والمحادثات   | طلب استشارة، رسائل نصية، اقتراح موعد وموافقة الطرفين، إلغاء ورفض                                                                                    |
| 8   | الدفع والمشتريات     | بوابة Sandbox، تسجيل العملية، معالجة إشعارات البوابة دون تكرار الأثر، منح الوصول للكورس بعد تأكيد الدفع؛ دفع الاستشارة بعد اتفاق الطرفين على الموعد |
| 9   | التعلّم              | حماية المحتوى للمشتري، تسجيل الفيديوهات المكتملة، حساب التقدّم                                                                                      |
| 10  | الامتحانات والشهادات | الأسئلة والمحاولات والتصحيح، شروط إكمال الكورس، إصدار وتحميل وإرسال الشهادة                                                                         |
| 11  | الاسترداد            | تطبيق سياسة الكورس والاستشارة، تسجيل الطلب ونتيجة رد المبلغ                                                                                         |
| 12  | الإدارة والأرباح     | إدارة المستخدمين، المعاملات والاسترداد، العمولات وتقارير المدرّس                                                                                    |

## طريقة العمل لكل جزء

1. راجع قواعد الجزء واتفق على تصميم بياناته.
2. أنشئ Migration وModel والعلاقات والقيود المطلوبة.
3. أضف Validation باستخدام Form Requests والصلاحيات باستخدام Policies.
4. نفّذ Controller واربطه بشاشات Inertia، واستبدل بيانات المعاينة تدريجيًا ببيانات السيرفر.
5. أضف اختبارًا للسلوك الأساسي، وللحالات الحساسة مثل منع الوصول وتكرار إشعار الدفع.

استخدم Action عندما تتضمن العملية خطوات متعددة أو قاعدة مشتركة، مثل تأكيد الدفع ومنح الوصول. لا تضف Repository أو طبقات إضافية لمجرد تغليف Eloquent.

## قواعد مؤكدة يجب الحفاظ عليها

- اعتماد المدرّس من أدمن المنصة. المدرّس المعتمد ينشر كورساته بنفسه؛ مراجعة الأدمن للكورسات مؤجلة.
- شراء الكورس يفتح محتواه بالكامل، دون فتح تدريجي للدروس.
- اكتمال الفيديو يكون عند نهايته أو الانتقال باستخدام Next، وليس عند بدء التشغيل.
- اكتمال الكورس يتطلب إكمال جميع الفيديوهات، واجتياز الامتحان إذا كان مفعّلًا.
- الامتحان اختياري، والأسئلة في البداية اختيار من متعدد وصح/خطأ؛ درجة النجاح يحددها المدرّس والمحاولات غير محدودة.
- الاستشارات مستقلة عن الكورسات. المجانية تتجاوز الدفع، والمدفوعة تُدفع بعد الاتفاق على الموعد.
- الاجتماع عبر أداة خارجية مثل Zoom أو Google Meet، دون محرك اجتماعات أو حجز مواعيد تلقائي.
- استرداد الكورس: خلال 14 يومًا من الشراء، وبحد أقصى 3 فيديوهات مكتملة. إكمال الفيديو الرابع يلغي الأهلية.
- استرداد الاستشارة المدفوعة: الإلغاء قبل الموعد المتفق عليه بـ24 ساعة على الأقل.
- البداية بمصر والسعودية، وعملتي EGP وSAR، ومدفوعات Sandbox فقط.
- لا اشتراكات أو محفظة أو طلبات سحب في النطاق الأولي.

## قرارات مطلوبة قبل تكامل الدفع

- اختيار بوابة الدفع والتحقق من دعم مصر والسعودية والعملات المطلوبة.
- تحديد نسب عمولة الكورسات والاستشارات؛ عمولة الاستشارة أقل، لكن النسب لم تُحسم.
- اختيار مصدر أسعار الصرف وتحديد آلية التحويل والتحصيل.
- التحقق من إمكانية التسوية المباشرة للمدرّس، وآلية تقسيم المدفوعات والاسترداد لدى البوابة.

قاعدة بيانات الإنتاج، استضافة الفيديو، نقل الرسائل ومزوّد البريد ما زالت قرارات مفتوحة تُحسم قبل تكامل كل جزء. لا تعتبر الأسعار والتحويلات وحالات الدفع التجريبية في الواجهة قواعد نهائية.

المرجع المستمر للقرارات: [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md).
