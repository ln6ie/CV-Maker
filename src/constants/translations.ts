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
    personal: string;
    experience: string;
    education: string;
    skills: string;
    language: string;
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
  buttons: {
    back: string;
    next: string;
    export: string;
    generating: string;
    completed: string;
    shareAgain: string;
    close: string;
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
      personal: 'Personal Details',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills & Training',
      language: 'Language Details',
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
    },
    placeholders: {
      fullName: 'e.g. Abdullah Karim Hussein',
      address: 'e.g. Basra, Iraq',
      phone: 'e.g. 077xxxxxxxx',
      email: 'e.g. info@domain.com',
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
    buttons: {
      back: 'BACK',
      next: 'NEXT',
      export: 'COMPILE & EXPORT PDF',
      generating: 'GENERATING...',
      completed: 'Completed',
      shareAgain: 'SHARE AGAIN',
      close: 'CLOSE',
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
      personal: 'البيانات الشخصية',
      experience: 'الخبرات المهنية',
      education: 'التعليم',
      skills: 'المهارات والتدريب',
      language: 'تفاصيل اللغة',
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
    buttons: {
      back: 'السابق',
      next: 'التالي',
      export: 'تصدير بصيغة PDF',
      generating: 'جارٍ التصدير...',
      completed: 'تم',
      shareAgain: 'إعادة المشاركة',
      close: 'إغلاق',
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
  },
};
