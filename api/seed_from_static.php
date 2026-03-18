<?php
/**
 * One-time seeding script to populate pages, page_sections, and example blog posts
 * from static content. Run manually from the browser or CLI, then remove or protect.
 *
 * IMPORTANT: This is a simple starter; adjust content arrays to match your real copy.
 */

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/db.php';

if (($config['app_env'] ?? 'production') !== 'development') {
    jsonResponse(['success' => false, 'error' => 'Seeding disabled in this environment'], 403);
}

try {
    $pdo->beginTransaction();

    // Ensure default pages exist
    $pages = [
        ['slug' => 'home', 'name' => 'Home'],
        ['slug' => 'about', 'name' => 'About Us'],
        ['slug' => 'services', 'name' => 'Services'],
        ['slug' => 'blog', 'name' => 'Blog'],
        ['slug' => 'contact', 'name' => 'Contact Us'],
    ];

    $pageIds = [];
    foreach ($pages as $p) {
        $stmt = $pdo->prepare('SELECT id FROM pages WHERE slug = :slug');
        $stmt->execute(['slug' => $p['slug']]);
        $id = $stmt->fetchColumn();
        if (!$id) {
            $insert = $pdo->prepare('INSERT INTO pages (slug, name, is_active, sort_order) VALUES (:slug, :name, 1, 0)');
            $insert->execute(['slug' => $p['slug'], 'name' => $p['name']]);
            $id = $pdo->lastInsertId();
        }
        $pageIds[$p['slug']] = (int)$id;
    }

    // ---------------------------------------------------------------------
    // CMS Sections (idempotent)
    // ---------------------------------------------------------------------
    $sections = [
        // Home
        [
            'page_slug' => 'home',
            'section_key' => 'home_hero',
            'lang' => 'en',
            'content_type' => 'json',
            'content' => [
                'brand' => 'AL MOTAHADI REHABILITATION CENTER',
                'headlineDark' => 'Restoring Movement.',
                'headlineAccent' => 'Improving Lives.',
                'description' => 'Your journey toward recovery begins here. A compassionate approach designed around you.',
                'whatsappLabel' => 'WhatsApp Us',
                'trustedLabel' => 'Trusted Healthcare',
                'trustedValue' => '500+ patients rehabilitated',
                'image' => '/hero-image.png',
                'imageAlt' => 'Compassionate rehabilitation care at AL MOTAHADI center',
            ],
            'meta_title' => 'Al Motahadi Rehabilitation Center',
            'meta_description' => 'Expert rehabilitation care in Oman.',
            'meta_keywords' => 'rehabilitation, physiotherapy, recovery, Oman',
        ],
        [
            'page_slug' => 'home',
            'section_key' => 'home_hero',
            'lang' => 'ar',
            'content_type' => 'json',
            'content' => [
                'brand' => 'مركز المتحدي للتأهيل',
                'headlineDark' => 'استعادة الحركة.',
                'headlineAccent' => 'تحسين الحياة.',
                'description' => 'رحلتك نحو التعافي تبدأ هنا. نهج إنساني مصمم ليخدمك.',
                'whatsappLabel' => 'تواصل معنا عبر واتساب',
                'trustedLabel' => 'رعاية موثوقة',
                'trustedValue' => '500+ مريض تم تأهيلهم',
                'image' => '/hero-image.png',
                'imageAlt' => 'رعاية تأهيلية رحيمة في مركز المتحدي',
            ],
            'meta_title' => 'مركز المتحدي للتأهيل',
            'meta_description' => 'خدمات تأهيل متخصصة في عمان.',
            'meta_keywords' => 'تأهيل, علاج طبيعي, تعافي, عمان',
        ],
        [
            'page_slug' => 'home',
            'section_key' => 'home_values',
            'lang' => 'en',
            'content_type' => 'json',
            'content' => [
                'label' => 'Our Approach',
                'titleDark' => 'Patient-first',
                'titleAccent' => 'care every step',
                'description' => 'We combine clinical expertise with compassionate support—so each recovery plan feels personal.',
                'imageMain' => '/about-main.png',
                'imageInset' => '/about-overlay.png',
                'features' => [
                    ['title' => 'Patient-centered', 'description' => 'Plans tailored to your needs and goals.'],
                    ['title' => 'Multidisciplinary', 'description' => 'A team approach for better outcomes.'],
                    ['title' => 'Trusted outcomes', 'description' => 'Evidence-based therapy with measurable progress.'],
                ],
            ],
        ],
        [
            'page_slug' => 'home',
            'section_key' => 'home_values',
            'lang' => 'ar',
            'content_type' => 'json',
            'content' => [
                'label' => 'منهجنا',
                'titleDark' => 'رعاية',
                'titleAccent' => 'تركز على المريض',
                'description' => 'نجمع بين الخبرة الطبية والدعم الإنساني—لتصبح خطة التعافي جزءًا من رحلتك.',
                'imageMain' => '/about-main.png',
                'imageInset' => '/about-overlay.png',
                'features' => [
                    ['title' => 'مركز على المريض', 'description' => 'خطط مصممة حسب احتياجاتك وأهدافك.'],
                    ['title' => 'فريق متعدد التخصصات', 'description' => 'عمل مشترك لتحقيق نتائج أفضل.'],
                    ['title' => 'ثقة بالنتائج', 'description' => 'علاج قائم على الدليل مع متابعة تقدم واضحة.'],
                ],
            ],
        ],
        [
            'page_slug' => 'home',
            'section_key' => 'home_services',
            'lang' => 'en',
            'content_type' => 'json',
            'content' => [
                'label' => 'Services',
                'title' => 'Rehabilitation programs that fit your life',
                'description' => 'Explore therapies designed to restore function, reduce pain, and rebuild strength.',
                'extra' => 'From physiotherapy to specialized rehabilitation—your progress matters.',
                'ctaLabel' => 'View all services',
                'items' => [
                    ['img' => '/service-left.png', 'title' => 'Physical Therapy', 'desc' => 'Mobility support and recovery plans.', 'alt' => 'Physical therapy'],
                    ['img' => '/service-middle.png', 'title' => 'Neurological Rehab', 'desc' => 'Support for brain and nerve recovery.', 'alt' => 'Neurological rehabilitation'],
                    ['img' => '/service-right.png', 'title' => 'Rehabilitation', 'desc' => 'Whole-person recovery and care.', 'alt' => 'Rehabilitation'],
                ],
            ],
        ],
        [
            'page_slug' => 'home',
            'section_key' => 'home_services',
            'lang' => 'ar',
            'content_type' => 'json',
            'content' => [
                'label' => 'الخدمات',
                'title' => 'برامج تأهيل تناسب حياتك',
                'description' => 'اكتشف علاجات مصممة لاستعادة الحركة وتقليل الألم وبناء القوة.',
                'extra' => 'من العلاج الطبيعي إلى التأهيل المتخصص—التقدم هدفنا.',
                'ctaLabel' => 'عرض جميع الخدمات',
                'items' => [
                    ['img' => '/service-left.png', 'title' => 'العلاج الطبيعي', 'desc' => 'دعم الحركة وخطط التعافي.', 'alt' => 'العلاج الطبيعي'],
                    ['img' => '/service-middle.png', 'title' => 'التأهيل العصبي', 'desc' => 'دعم تعافي الدماغ والأعصاب.', 'alt' => 'التأهيل العصبي'],
                    ['img' => '/service-right.png', 'title' => 'التأهيل', 'desc' => 'تعافٍ شامل ورعاية متكاملة.', 'alt' => 'التأهيل'],
                ],
            ],
        ],
        [
            'page_slug' => 'home',
            'section_key' => 'home_health_tools',
            'lang' => 'en',
            'content_type' => 'json',
            'content' => [
                'label' => 'Health Tools',
                'title' => 'Practical resources for your recovery journey',
                'description' => 'Learn, prepare, and take informed next steps with our trusted tools.',
                'ctaLabel' => 'Explore health tools',
            ],
        ],
        [
            'page_slug' => 'home',
            'section_key' => 'home_health_tools',
            'lang' => 'ar',
            'content_type' => 'json',
            'content' => [
                'label' => 'أدوات صحية',
                'title' => 'موارد عملية لرحلة تعافيك',
                'description' => 'تعلم واستعد واتخذ خطواتك بثقة باستخدام أدوات موثوقة.',
                'ctaLabel' => 'استعرض الأدوات الصحية',
            ],
        ],

        // About
        [
            'page_slug' => 'about',
            'section_key' => 'about_hero',
            'lang' => 'en',
            'content_type' => 'json',
            'content' => [
                'label' => 'About AL MOTAHADI',
                'title' => 'Care built around',
                'titleAccent' => 'your recovery',
                'description' => 'We deliver compassionate rehabilitation programs with modern clinical guidance.',
                'image' => '/rehab-about-hero.png',
                'imageAlt' => 'About AL MOTAHADI hero',
            ],
        ],
        [
            'page_slug' => 'about',
            'section_key' => 'about_hero',
            'lang' => 'ar',
            'content_type' => 'json',
            'content' => [
                'label' => 'عن مركز المتحدي',
                'title' => 'رعاية مصممة',
                'titleAccent' => 'للتعافي',
                'description' => 'نقدم برامج تأهيل إنسانية بإرشاد طبي حديث ودعم مستمر.',
                'image' => '/rehab-about-hero.png',
                'imageAlt' => 'صورة عن مركز المتحدي',
            ],
        ],
        [
            'page_slug' => 'about',
            'section_key' => 'about_intro',
            'lang' => 'en',
            'content_type' => 'json',
            'content' => [
                'heading' => 'Who we are',
                'body' => 'AL MOTAHADI Rehabilitation Center is committed to helping patients regain strength, confidence, and everyday independence.',
                'ctaLabel' => 'Learn more',
            ],
        ],
        [
            'page_slug' => 'about',
            'section_key' => 'about_intro',
            'lang' => 'ar',
            'content_type' => 'json',
            'content' => [
                'heading' => 'من نحن',
                'body' => 'مركز المتحدي للتأهيل ملتزم بمساعدة المرضى على استعادة القوة والثقة والقدرة على الحياة اليومية.',
                'ctaLabel' => 'اعرف المزيد',
            ],
        ],
        [
            'page_slug' => 'about',
            'section_key' => 'about_story',
            'lang' => 'en',
            'content_type' => 'json',
            'content' => [
                'label' => 'Our story',
                'heading' => 'Trusted care, built with purpose',
                'body' => 'We believe rehabilitation is more than therapy—it is support, education, and accountability throughout your journey.',
                'image' => '/almotahadi-opening-ceremony.png',
                'imageAlt' => 'Our story image',
            ],
        ],
        [
            'page_slug' => 'about',
            'section_key' => 'about_story',
            'lang' => 'ar',
            'content_type' => 'json',
            'content' => [
                'label' => 'قصتنا',
                'heading' => 'رعاية موثوقة بهدف واضح',
                'body' => 'نؤمن أن التأهيل أكثر من مجرد جلسات—بل هو دعم وتثقيف ومسؤولية طوال الرحلة.',
                'image' => '/almotahadi-opening-ceremony.png',
                'imageAlt' => 'صورة قصتنا',
            ],
        ],
        [
            'page_slug' => 'about',
            'section_key' => 'about_founder',
            'lang' => 'en',
            'content_type' => 'json',
            'content' => [
                'label' => 'Leadership',
                'heading' => 'Guided by clinical experience',
                'body1' => 'Our founder brings long-term clinical insight and a focus on patient outcomes.',
                'body2' => 'We train our team to deliver compassionate care with measurable progress.',
                'body3' => 'Every program is built around your goals and pace.',
                'image' => '/dr-mohammed-reda-al-yazidi.png',
                'imageAlt' => 'Founder image',
            ],
        ],
        [
            'page_slug' => 'about',
            'section_key' => 'about_founder',
            'lang' => 'ar',
            'content_type' => 'json',
            'content' => [
                'label' => 'القيادة',
                'heading' => 'خبـرة سريرية واهتمام بالنتائج',
                'body1' => 'يجمع مؤسسنا بين خبرة سريرية وتركيز على نتائج المرضى.',
                'body2' => 'نؤهل فريقنا لتقديم رعاية إنسانية مع متابعة تقدم واضحة.',
                'body3' => 'كل برنامج مبني على أهدافك وتدرجك.',
                'image' => '/dr-mohammed-reda-al-yazidi.png',
                'imageAlt' => 'صورة المؤسس',
            ],
        ],
        [
            'page_slug' => 'about',
            'section_key' => 'about_team',
            'lang' => 'en',
            'content_type' => 'json',
            'content' => [
                'label' => 'Medical Team',
                'heading' => 'Experts dedicated to your progress',
                'body1' => 'A multidisciplinary team with specialized rehabilitation expertise.',
                'body2' => 'Personalized assessment and follow-up throughout your program.',
                'body3' => 'Support that helps you stay confident and consistent.',
                'ctaLabel' => 'Meet the team',
                'image' => '/medical-team.png',
                'imageAlt' => 'Medical team image',
            ],
        ],
        [
            'page_slug' => 'about',
            'section_key' => 'about_team',
            'lang' => 'ar',
            'content_type' => 'json',
            'content' => [
                'label' => 'فريق طبي',
                'heading' => 'خبراء ملتزمون بتقدمك',
                'body1' => 'فريق متعدد التخصصات بخبرة في التأهيل.',
                'body2' => 'تقييم شخصي ومتابعة مستمرة خلال برنامجك.',
                'body3' => 'دعم يساعدك على الثبات والثقة.',
                'ctaLabel' => 'تعرف على الفريق',
                'image' => '/medical-team.png',
                'imageAlt' => 'صورة الفريق الطبي',
            ],
        ],
        [
            'page_slug' => 'about',
            'section_key' => 'about_responsibility',
            'lang' => 'en',
            'content_type' => 'json',
            'content' => [
                'label' => 'Giving Back',
                'heading' => 'Social responsibility with real impact',
                'body1' => 'Community initiatives support rehabilitation awareness and access.',
                'body2' => 'We partner with local programs that help more people benefit.',
                'ctaLabel' => 'Discover initiatives',
            ],
        ],
        [
            'page_slug' => 'about',
            'section_key' => 'about_responsibility',
            'lang' => 'ar',
            'content_type' => 'json',
            'content' => [
                'label' => 'المسؤولية',
                'heading' => 'عطاء مجتمعي بأثر حقيقي',
                'body1' => 'مبادرات مجتمعية لدعم الوعي بالتأهيل وتحسين الوصول.',
                'body2' => 'نشارك مع برامج محلية تساعد المزيد للاستفادة.',
                'ctaLabel' => 'اكتشف المبادرات',
            ],
        ],

        // Services page
        [
            'page_slug' => 'services',
            'section_key' => 'services_hero',
            'lang' => 'en',
            'content_type' => 'json',
            'content' => [
                'label' => 'Our Services',
                'title' => 'Rehabilitation that restores function',
                'description1' => 'Evidence-based therapies designed for real-life recovery.',
                'description2' => 'From assessment to follow-up—we stay with you.',
            ],
        ],
        [
            'page_slug' => 'services',
            'section_key' => 'services_hero',
            'lang' => 'ar',
            'content_type' => 'json',
            'content' => [
                'label' => 'خدماتنا',
                'title' => 'تأهيل يعيد الوظيفة',
                'description1' => 'علاجات قائمة على الدليل للتعافي الواقعي.',
                'description2' => 'من التقييم حتى المتابعة—نرافقك.',
            ],
        ],
        [
            'page_slug' => 'services',
            'section_key' => 'services_cards',
            'lang' => 'en',
            'content_type' => 'json',
            'content' => [
                'items' => [
                    ['id' => 1, 'image' => '/service-images/2.png', 'title' => 'Physical Therapy', 'description' => 'Mobility support and recovery plans.', 'alt' => 'Physical therapy'],
                    ['id' => 2, 'image' => '/service-images/1.png', 'title' => 'Neurological Rehab', 'description' => 'Support for brain and nerve recovery.', 'alt' => 'Neurological rehabilitation'],
                    ['id' => 3, 'image' => '/service-images/3.png', 'title' => 'Rehabilitation', 'description' => 'Whole-person recovery and care.', 'alt' => 'Rehabilitation'],
                ],
            ],
        ],
        [
            'page_slug' => 'services',
            'section_key' => 'services_cards',
            'lang' => 'ar',
            'content_type' => 'json',
            'content' => [
                'items' => [
                    ['id' => 1, 'image' => '/service-images/2.png', 'title' => 'العلاج الطبيعي', 'description' => 'دعم الحركة وخطط التعافي.', 'alt' => 'العلاج الطبيعي'],
                    ['id' => 2, 'image' => '/service-images/1.png', 'title' => 'التأهيل العصبي', 'description' => 'دعم تعافي الدماغ والأعصاب.', 'alt' => 'التأهيل العصبي'],
                    ['id' => 3, 'image' => '/service-images/3.png', 'title' => 'التأهيل', 'description' => 'تعافٍ شامل ورعاية متكاملة.', 'alt' => 'التأهيل'],
                ],
            ],
        ],

        // Contact page
        [
            'page_slug' => 'contact',
            'section_key' => 'contact_hero',
            'lang' => 'en',
            'content_type' => 'json',
            'content' => [
                'label' => 'Contact Us',
                'title' => 'We are here to help',
                'description' => 'Reach out to schedule an assessment or ask any question.',
            ],
        ],
        [
            'page_slug' => 'contact',
            'section_key' => 'contact_hero',
            'lang' => 'ar',
            'content_type' => 'json',
            'content' => [
                'label' => 'تواصل معنا',
                'title' => 'نحن هنا لمساعدتك',
                'description' => 'تواصل معنا لتحديد موعد تقييم أو لطرح أي سؤال.',
            ],
        ],
        [
            'page_slug' => 'contact',
            'section_key' => 'contact_reachout',
            'lang' => 'en',
            'content_type' => 'json',
            'content' => [
                'title' => 'Reach out',
                'phoneLabel' => 'Phone',
                'emailLabel' => 'Email',
                'addressLabel' => 'Address',
                'hoursLabel' => 'Working Hours',
            ],
        ],
        [
            'page_slug' => 'contact',
            'section_key' => 'contact_reachout',
            'lang' => 'ar',
            'content_type' => 'json',
            'content' => [
                'title' => 'تواصل معنا',
                'phoneLabel' => 'الهاتف',
                'emailLabel' => 'البريد الإلكتروني',
                'addressLabel' => 'العنوان',
                'hoursLabel' => 'ساعات العمل',
            ],
        ],
    ];

    $upsertSection = $pdo->prepare('
        INSERT INTO page_sections (page_id, section_key, lang, content_type, content, meta_title, meta_description, meta_keywords)
        VALUES (:page_id, :section_key, :lang, :content_type, :content, :meta_title, :meta_description, :meta_keywords)
        ON DUPLICATE KEY UPDATE
            content = VALUES(content),
            content_type = VALUES(content_type),
            meta_title = VALUES(meta_title),
            meta_description = VALUES(meta_description),
            meta_keywords = VALUES(meta_keywords),
            updated_at = CURRENT_TIMESTAMP
    ');

    foreach ($sections as $s) {
        if (!isset($pageIds[$s['page_slug']])) continue;

        $contentType = $s['content_type'] ?? 'text';
        $content = $contentType === 'json'
            ? json_encode($s['content'] ?? new stdClass(), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
            : ($s['content'] ?? '');

        $upsertSection->execute([
            'page_id' => $pageIds[$s['page_slug']],
            'section_key' => $s['section_key'],
            'lang' => $s['lang'],
            'content_type' => $contentType,
            'content' => $content,
            'meta_title' => $s['meta_title'] ?? null,
            'meta_description' => $s['meta_description'] ?? null,
            'meta_keywords' => $s['meta_keywords'] ?? null,
        ]);
    }

    // ---------------------------------------------------------------------
    // Blog Posts (idempotent)
    // ---------------------------------------------------------------------
    $blogPosts = [
        [
            'slug' => 'welcome-to-al-motahadi',
            'category' => 'news',
            'status' => 'published',
            'featured' => 1,
            'read_time' => 6,
            'published_at' => date('Y-m-d H:i:s'),
            'translations' => [
                'en' => [
                    'title' => 'Welcome to Al Motahadi',
                    'excerpt' => 'Discover rehabilitation programs built around your recovery goals.',
                    'body' => '<h2>Start your recovery journey</h2><p>Your rehabilitation plan should feel personal—clear goals, compassionate support, and evidence-based therapy.</p><h2>What we provide</h2><ul><li>Assessment and personalized care</li><li>Focused physiotherapy programs</li><li>Progress tracking you can trust</li></ul><p>Contact us to schedule an evaluation today.</p>',
                    'meta_title' => 'Welcome to Al Motahadi',
                    'meta_description' => 'Rehabilitation programs built around your recovery goals.',
                    'meta_keywords' => 'rehabilitation, physiotherapy, recovery, Oman',
                ],
                'ar' => [
                    'title' => 'مرحبًا بكم في مركز المتحدي',
                    'excerpt' => 'اكتشف برامج تأهيل مبنية على أهداف تعافيك.',
                    'body' => '<h2>ابدأ رحلة تعافيك</h2><p>خطة التأهيل يجب أن تكون شخصية—أهداف واضحة، دعم إنساني، وعلاج مبني على الدليل.</p><h2>ما نقدمه</h2><ul><li>تقييم ورعاية شخصية</li><li>برامج علاج طبيعي مركزة</li><li>متابعة تقدم موثوقة</li></ul><p>تواصل معنا لتحديد موعد تقييم اليوم.</p>',
                    'meta_title' => 'مرحبًا بكم في مركز المتحدي',
                    'meta_description' => 'برامج تأهيل مبنية على أهداف تعافيك.',
                    'meta_keywords' => 'تأهيل, علاج طبيعي, تعافي, عمان',
                ],
            ],
        ],
        [
            'slug' => 'how-rehab-helps-you-rebuild',
            'category' => 'wellness',
            'status' => 'published',
            'featured' => 0,
            'read_time' => 5,
            'published_at' => date('Y-m-d H:i:s', strtotime('-7 days')),
            'translations' => [
                'en' => [
                    'title' => 'How rehabilitation helps you rebuild',
                    'excerpt' => 'A practical guide to recovery, consistency, and progress tracking.',
                    'body' => '<h2>Recovery is a process</h2><p>Rehabilitation helps you rebuild strength and confidence through structured therapy and consistent follow-up.</p><h2>Consistency matters</h2><ul><li>Small steps add up</li><li>Technique improves over time</li><li>Support keeps you motivated</li></ul><p>Ask us about a program that fits your schedule.</p>',
                    'meta_title' => 'How rehabilitation helps you rebuild',
                    'meta_description' => 'A guide to consistency, technique, and progress tracking.',
                    'meta_keywords' => 'recovery, rehabilitation, physiotherapy, progress',
                ],
                'ar' => [
                    'title' => 'كيف يساعدك التأهيل على إعادة البناء',
                    'excerpt' => 'دليل عملي للتعافي والثبات ومتابعة التقدم.',
                    'body' => '<h2>التعافي رحلة</h2><p>يساعدك التأهيل على إعادة بناء القوة والثقة من خلال علاج منظم ومتابعة مستمرة.</p><h2>الثبات يصنع الفرق</h2><ul><li>خطوات صغيرة تتراكم</li><li>تحسن التقنية مع الوقت</li><li>الدعم يحافظ على الحافز</li></ul><p>اسألنا عن برنامج يناسب جدولك.</p>',
                    'meta_title' => 'كيف يساعدك التأهيل على إعادة البناء',
                    'meta_description' => 'دليل عملي للثبات ومتابعة التقدم.',
                    'meta_keywords' => 'تعافي, تأهيل, علاج طبيعي, تقدم',
                ],
            ],
        ],
        [
            'slug' => 'rehab-tips-for-better-mobility',
            'category' => 'tips',
            'status' => 'published',
            'featured' => 0,
            'read_time' => 4,
            'published_at' => date('Y-m-d H:i:s', strtotime('-14 days')),
            'translations' => [
                'en' => [
                    'title' => 'Rehab tips for better mobility',
                    'excerpt' => 'Simple habits that support mobility, comfort, and long-term progress.',
                    'body' => '<h2>Start with safe movement</h2><p>Focus on gentle range-of-motion and follow the plan provided by your clinician.</p><h2>Listen to your body</h2><blockquote>Progress should feel challenging, not painful.</blockquote><h2>Build your routine</h2><p>Short sessions consistently often outperform rare long workouts.</p>',
                    'meta_title' => 'Rehab tips for better mobility',
                    'meta_description' => 'Simple habits to support mobility and comfort.',
                    'meta_keywords' => 'mobility, rehab tips, recovery, physiotherapy',
                ],
                'ar' => [
                    'title' => 'نصائح للتأهيل لتحسين الحركة',
                    'excerpt' => 'عادات بسيطة تدعم الحركة والراحة والتقدم على المدى الطويل.',
                    'body' => '<h2>ابدأ بحركة آمنة</h2><p>ركز على نطاق حركة لطيف واتبع الخطة التي يضعها مختصك.</p><h2>استمع لجسمك</h2><blockquote>التقدم يكون صعبًا ولكن بدون ألم.</blockquote><h2>ابنِ روتينك</h2><p>الجلسات القصيرة المنتظمة غالبًا أفضل من التمارين الطويلة المتباعدة.</p>',
                    'meta_title' => 'نصائح للتأهيل لتحسين الحركة',
                    'meta_description' => 'عادات بسيطة لدعم الحركة والراحة.',
                    'meta_keywords' => 'حركة, نصائح تأهيل, تعافي, علاج طبيعي',
                ],
            ],
        ],
    ];

    $checkPost = $pdo->prepare('SELECT id FROM blog_posts WHERE slug = :slug');
    $upsertPost = $pdo->prepare('
        INSERT INTO blog_posts (slug, category, status, featured, thumbnail_media_id, hero_media_id, author_id, read_time, published_at)
        VALUES (:slug, :category, :status, :featured, :thumbnail_media_id, :hero_media_id, :author_id, :read_time, :published_at)
        ON DUPLICATE KEY UPDATE
            category = VALUES(category),
            status = VALUES(status),
            featured = VALUES(featured),
            thumbnail_media_id = VALUES(thumbnail_media_id),
            hero_media_id = VALUES(hero_media_id),
            read_time = VALUES(read_time),
            published_at = VALUES(published_at),
            updated_at = CURRENT_TIMESTAMP
    ');

    $upsertTranslation = $pdo->prepare('
        INSERT INTO blog_post_translations (post_id, lang, title, excerpt, body, meta_title, meta_description, meta_keywords)
        VALUES (:post_id, :lang, :title, :excerpt, :body, :meta_title, :meta_description, :meta_keywords)
        ON DUPLICATE KEY UPDATE
            title = VALUES(title),
            excerpt = VALUES(excerpt),
            body = VALUES(body),
            meta_title = VALUES(meta_title),
            meta_description = VALUES(meta_description),
            meta_keywords = VALUES(meta_keywords),
            updated_at = CURRENT_TIMESTAMP
    ');

    foreach ($blogPosts as $bp) {
        $checkPost->execute(['slug' => $bp['slug']]);
        $postId = $checkPost->fetchColumn();

        if (!$postId) {
            $upsertPost->execute([
                'slug' => $bp['slug'],
                'category' => $bp['category'] ?? 'news',
                'status' => $bp['status'] ?? 'draft',
                'featured' => (int)($bp['featured'] ?? 0),
                'thumbnail_media_id' => null,
                'hero_media_id' => null,
                'author_id' => null,
                'read_time' => (int)($bp['read_time'] ?? 5),
                'published_at' => $bp['status'] === 'published' ? ($bp['published_at'] ?? date('Y-m-d H:i:s')) : null,
            ]);
            $postId = (int)$pdo->lastInsertId();
        } else {
            $upsertPost->execute([
                'slug' => $bp['slug'],
                'category' => $bp['category'] ?? 'news',
                'status' => $bp['status'] ?? 'draft',
                'featured' => (int)($bp['featured'] ?? 0),
                'thumbnail_media_id' => null,
                'hero_media_id' => null,
                'author_id' => null,
                'read_time' => (int)($bp['read_time'] ?? 5),
                'published_at' => $bp['status'] === 'published' ? ($bp['published_at'] ?? date('Y-m-d H:i:s')) : null,
            ]);
            $postId = (int)$postId;
        }

        foreach (['en', 'ar'] as $langCode) {
            if (empty($bp['translations'][$langCode])) continue;
            $tr = $bp['translations'][$langCode];
            $upsertTranslation->execute([
                'post_id' => $postId,
                'lang' => $langCode,
                'title' => $tr['title'] ?? '',
                'excerpt' => $tr['excerpt'] ?? '',
                'body' => $tr['body'] ?? '',
                'meta_title' => $tr['meta_title'] ?? null,
                'meta_description' => $tr['meta_description'] ?? null,
                'meta_keywords' => $tr['meta_keywords'] ?? null,
            ]);
        }
    }

    $pdo->commit();

    jsonResponse([
        'success' => true,
        'message' => 'Seed completed. You can now edit content in the dashboard.',
    ]);
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('Seed error: ' . $e->getMessage());
    jsonResponse(['success' => false, 'error' => 'Seeding failed: ' . $e->getMessage()], 500);
}

