export interface TranslationSet {
  app: {
    title: string;
    subtitle: string;
  };
  splash: {
    logo: string;
    subtitle: string;
  };
  steps: {
    template: string;
    personal: string;
    experience: string;
    education: string;
    skills: string;
    language: string;
    export: string;
  };
  labels: {
    fullName: string;
    address: string;
    phone: string;
    email: string;
    summary: string;
    degree: string;
    institution: string;
    graduationYear: string;
    honors: string;
    skills: string;
    courses: string;
    arabicLevel: string;
    englishLevel: string;
    template: string;
  };
  placeholders: {
    fullName: string;
    address: string;
    phone: string;
    email: string;
    summary: string;
    degree: string;
    institution: string;
    graduationYear: string;
    honors: string;
    skills: string;
    courses: string;
    arabicLevel: string;
    englishLevel: string;
    jobTitle: string;
    companyLocation: string;
    dateRange: string;
    task: string;
  };
  tips: {
    fullName: string;
    address: string;
    phone: string;
    email: string;
    summary: string;
    degree: string;
    institution: string;
    graduationYear: string;
    honors: string;
    skills: string;
    courses: string;
    arabicLevel: string;
    englishLevel: string;
    jobTitle: string;
    companyLocation: string;
    dateRange: string;
    task: string;
  };
  buttons: {
    back: string;
    next: string;
    export: string;
    generating: string;
    completed: string;
    shareAgain: string;
    close: string;
    improve: string;
  };
  actionSheet: {
    cancel: string;
    toggleTheme: string;
    pdfEnglish: string;
    pdfArabic: string;
  };
  preferences: {
    title: string;
    toggleTheme: string;
    pdfLang: string;
    pdfLangAr: string;
  };
  status: {
    generating: string;
    validationError: string;
    noData: string;
  };
  validation: {
    required: string;
    invalidEmail: string;
    summaryLength: string;
    workExperienceRequired: string;
    educationRequired: string;
  };
  errors: {
    validationFailed: string;
    sharingUnavailable: string;
    compilationError: string;
    sharingFailed: string;
    importSuccess: string;
    importInvalidJSON: string;
    importEmpty: string;
  };
  cvManager: {
    title: string;
    newCV: string;
    delete: string;
    rename: string;
    duplicate: string;
    confirmDelete: string;
  };
}

export type Language = 'en' | 'ar';

export const translations: Record<Language, TranslationSet> = {
  en: {
    app: {
      title: 'Raqeem CV',
      subtitle: 'Professional CV Builder',
    },
    splash: {
      logo: 'Raqeem',
      subtitle: 'Professional CV Builder',
    },
    steps: {
      template: 'Choose Template',
      personal: 'Personal Details',
      experience: 'Work Experience',
      education: 'Education & Skills',
      skills: 'Skills & Training',
      language: 'Language Details',
      export: 'Export CV',
    },
    labels: {
      fullName: 'Full Name',
      address: 'Official Address',
      phone: 'Phone Number',
      email: 'Email Address',
      summary: 'Summary Description',
      degree: 'Degree Title',
      institution: 'Institution',
      graduationYear: 'Graduation Year',
      honors: 'Academic Honors Notes',
      skills: 'Technical Skills',
      courses: 'Courses & Training',
      arabicLevel: 'Arabic Level',
      englishLevel: 'English Level',
      template: 'CV Template',
    },
    placeholders: {
      fullName: 'e.g. Abdullah Kareem Hussein',
      address: 'e.g. Basra, Iraq',
      phone: 'e.g. 077xxxxxxxx',
      email: 'e.g. abdullah@gmail.com',
      summary: 'Describe your professional experience and objectives...',
      degree: 'e.g. Bachelors of Electromechanical Engineering',
      institution: 'e.g. Southern Technical University',
      graduationYear: 'e.g. 2025',
      honors: 'e.g. Top of my class, graduated with honors',
      skills: 'e.g. AutoCAD, MATLAB, Python, Leadership (Comma separated)',
      courses: 'e.g. NEBOSH Safety Course, Split AC Installation (Comma separated)',
      arabicLevel: 'e.g. Native language',
      englishLevel: 'e.g. Fluent (Reading, writing and speaking)',
      jobTitle: 'e.g. Diesel Generator Mechanic',
      companyLocation: 'e.g. Private Workshop - Basra, Iraq',
      dateRange: 'e.g. 2019 - 2022',
      task: 'e.g. Supervised daily safety compliance on-site',
    },
    tips: {
      fullName: 'Include your full name as it appears on official documents',
      address: 'Your current city and country of residence',
      phone: 'Include country code for international applications',
      email: 'Use a professional email address',
      summary: 'Write 2-3 sentences highlighting your key qualifications and career goals',
      degree: 'Include the exact title of your degree or certification',
      institution: 'Name of university, college, or training institute',
      graduationYear: 'Year of graduation or expected graduation',
      honors: 'Mention any awards, honors, or notable achievements',
      skills: 'List technical and soft skills separated by commas',
      courses: 'List relevant courses, workshops, or training programs',
      arabicLevel: 'Describe your Arabic proficiency level',
      englishLevel: 'Describe your English proficiency level',
      jobTitle: 'Your official job title or position name',
      companyLocation: 'Company name and location',
      dateRange: 'Start and end dates (e.g. 2019 - 2022)',
      task: 'Describe a specific responsibility or achievement',
    },
    buttons: {
      back: 'BACK',
      next: 'NEXT',
      export: 'COMPILE & EXPORT PDF',
      generating: 'GENERATING...',
      completed: 'Completed',
      shareAgain: 'SHARE AGAIN',
      close: 'CLOSE',
      improve: 'Improve',
    },
    actionSheet: {
      cancel: 'Cancel',
      toggleTheme: 'Toggle Light/Dark Theme',
      pdfEnglish: 'Render PDF: English (LTR)',
      pdfArabic: 'Render PDF: Arabic (RTL)',
    },
    preferences: {
      title: 'PREFERENCES',
      toggleTheme: 'TOGGLE LIGHT/DARK MODE',
      pdfLang: 'PDF LANGUAGE: EN',
      pdfLangAr: 'PDF LANGUAGE: AR',
    },
    status: {
      generating: 'Generating PDF...',
      validationError: 'Validation Error',
      noData: 'No Data Found',
    },
    validation: {
      required: 'This field is required',
      invalidEmail: 'Invalid email format',
      summaryLength: 'Please write a brief summary (at least 20 characters)',
      workExperienceRequired: 'Please add at least one valid Work Experience entry',
      educationRequired: 'Please add at least one valid Education entry',
    },
    errors: {
      validationFailed: 'Validation failed. Please check the marked fields.',
      sharingUnavailable: 'Sharing is not available on this platform.',
      compilationError: 'An unexpected error occurred during PDF compilation.',
      sharingFailed: 'Sharing failed.',
      importSuccess: 'CV data imported successfully!',
      importInvalidJSON: 'Invalid JSON code entered.',
      importEmpty: 'Please paste the JSON code first!',
    },
    cvManager: {
      title: 'My CVs',
      newCV: 'Create New CV',
      delete: 'Delete',
      rename: 'Rename',
      duplicate: 'Duplicate',
      confirmDelete: 'Are you sure you want to delete this CV?',
    },
  },
  ar: {
    app: {
      title: 'رَقيم CV',
      subtitle: 'منشئ السيرة الذاتية الاحترافي',
    },
    splash: {
      logo: 'رَقيم',
      subtitle: 'منشئ السيرة الذاتية الاحترافي',
    },
    steps: {
      template: 'اختيار القالب',
      personal: 'البيانات الشخصية',
      experience: 'الخبرات المهنية',
      education: 'التعليم والمهارات',
      skills: 'المهارات والتدريب',
      language: 'تفاصيل اللغة',
      export: 'تصدير السيرة الذاتية',
    },
    labels: {
      fullName: 'الاسم الكامل',
      address: 'العنوان الرسمي',
      phone: 'رقم الهاتف',
      email: 'البريد الإلكتروني',
      summary: 'الملخص المهني',
      degree: 'المؤهل العلمي',
      institution: 'الجامعة / المؤسسة',
      graduationYear: 'سنة التخرج',
      honors: 'ملاحظات الشرف الأكاديمي',
      skills: 'المهارات التقنية',
      courses: 'الدورات التدريبية',
      arabicLevel: 'مستوى اللغة العربية',
      englishLevel: 'مستوى اللغة الإنجليزية',
      template: 'قالب السيرة الذاتية',
    },
    placeholders: {
      fullName: 'مثال: عبدالله كريم حسين',
      address: 'مثال: البصرة - العراق',
      phone: 'مثال: 077xxxxxxxx',
      email: 'مثال: name@gmail.com',
      summary: 'اكتب ملخصاً جذاباً لخبراتك وقدراتك وأهدافك المهنية...',
      degree: 'مثال: بكالوريوس هندسة كهروميكانيكية',
      institution: 'مثال: الجامعة التقنية الجنوبية',
      graduationYear: 'مثال: 2025',
      honors: 'مثال: من الطلبة الأوائل على القسم بتقدير امتياز',
      skills: 'مثال: AutoCAD, MATLAB, Python, قيادة الفريق (مفصولة بفواصل)',
      courses: 'مثال: دورة السلامة المهنية NEBOSH، صيانة المحركات (مفصولة بفواصل)',
      arabicLevel: 'مثال: اللغة الأم',
      englishLevel: 'مثال: ممتاز (قراءة وكتابة وتحدث)',
      jobTitle: 'مثال: ميكانيكي مولدات ديزل',
      companyLocation: 'مثال: ورشة خاصة - البصرة، العراق',
      dateRange: 'مثال: 2019 - 2022',
      task: 'مثال: الإشراف اليومي على تطبيق معايير السلامة المهنية بالموقع',
    },
    tips: {
      fullName: 'أدخل اسمك الكامل كما يظهر في الوثائق الرسمية',
      address: 'مدينة إقامتك الحالية والدولة',
      phone: 'قم بتضمين رمز الدولة للتقديمات الدولية',
      email: 'استخدم بريداً إلكترونياً مهنياً',
      summary: 'اكتب 2-3 جمل تبرز مؤهلاتك الرئيسية وأهدافك المهنية',
      degree: 'أدخل العنوان الدقيق لشهادتك أو شهادتك المهنية',
      institution: 'اسم الجامعة أو الكلية أو معهد التدريب',
      graduationYear: 'سنة التخرج أو السنة المتوقعة للتخرج',
      honors: 'اذكر أي جوائز أو تكريمات أو إنجازات ملحوظة',
      skills: 'أدرج المهارات التقنية والشخصية مفصولة بفواصل',
      courses: 'أدرج الدورات وورش العمل والبرامج التدريبية ذات الصلة',
      arabicLevel: 'صف مستواك في اللغة العربية',
      englishLevel: 'صف مستواك في اللغة الإنجليزية',
      jobTitle: 'المسمى الوظيفي الرسمي الخاص بك',
      companyLocation: 'اسم الشركة والموقع',
      dateRange: 'تاريخ البداية والنهاية (مثال: 2019 - 2022)',
      task: 'صف مسؤولية محددة أو إنجازاً قمت به',
    },
    buttons: {
      back: 'السابق',
      next: 'التالي',
      export: 'تصدير بصيغة PDF',
      generating: 'جارٍ التصدير...',
      completed: 'تم',
      shareAgain: 'إعادة المشاركة',
      close: 'إغلاق',
      improve: 'تحسين',
    },
    actionSheet: {
      cancel: 'إلغاء',
      toggleTheme: 'تبديل الوضع الفاتح/الداكن',
      pdfEnglish: 'تصدير PDF: إنجليزي (LTR)',
      pdfArabic: 'تصدير PDF: عربي (RTL)',
    },
    preferences: {
      title: 'التفضيلات',
      toggleTheme: 'تبديل الوضع الفاتح/الداكن',
      pdfLang: 'لغة PDF: EN',
      pdfLangAr: 'لغة PDF: AR',
    },
    status: {
      generating: 'جارٍ إنشاء PDF...',
      validationError: 'خطأ في التحقق',
      noData: 'لا توجد بيانات',
    },
    validation: {
      required: 'هذا الحقل مطلوب',
      invalidEmail: 'تنسيق البريد الإلكتروني غير صحيح',
      summaryLength: 'يرجى كتابة ملخص لا يقل عن 20 حرفًا',
      workExperienceRequired: 'يرجى إضافة خبرة مهنية واحدة على الأقل',
      educationRequired: 'يرجى إضافة مؤهل تعليمي واحد على الأقل',
    },
    errors: {
      validationFailed: 'فشل التحقق. يرجى مراجعة الحقول المحددة.',
      sharingUnavailable: 'المشاركة غير متوفرة على هذا النظام.',
      compilationError: 'حدث خطأ غير متوقع أثناء إنشاء PDF.',
      sharingFailed: 'فشلت المشاركة.',
      importSuccess: 'تم استيراد بيانات السيرة الذاتية بنجاح!',
      importInvalidJSON: 'كود الـ JSON المدخل غير صالح.',
      importEmpty: 'الرجاء إدخال كود الـ JSON أولاً!',
    },
    cvManager: {
      title: 'سيرتي الذاتية',
      newCV: 'إنشاء سيرة جديدة',
      delete: 'حذف',
      rename: 'إعادة تسمية',
      duplicate: 'نسخ',
      confirmDelete: 'هل أنت متأكد من حذف هذه السيرة الذاتية؟',
    },
  },
};
