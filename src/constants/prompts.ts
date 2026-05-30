export const PROMPTS = {
  summary: (text: string, lang: 'en' | 'ar'): string => {
    if (lang === 'ar')
      return `أنت كاتب سير ذاتية محترف. حسّن الملخص المهني التالي ليكون مؤثراً وقوياً وجاهزاً لأنظمة ATS. اجعله موجزاً (2-4 جمل)، ركز على الإنجازات والمهارات والقيمة المضافة. اكتب بصيغة المتكلم بدون ضمائر.

الملخص الحالي:
${text}

أعد كتابة الملخص المحسّن فقط دون أي شرح أو مقدمات.`;

    return `You are a professional CV writer. Improve the following professional summary to be impactful, ATS-friendly, and concise (2-4 sentences). Focus on achievements, skills, and value proposition. Write in first person without pronouns.

Current summary:
${text}

Rewrite only the improved summary without any explanations.`;
  },

  task: (task: string, jobTitle: string, lang: 'en' | 'ar'): string => {
    if (lang === 'ar')
      return `أنت كاتب سير ذاتية محترف. أعد صياغة المهمة التالية لتكون مؤثرة وموجهة نحو الإنجاز. استخدم أفعال حركية قوية وأضف نتائج قابلة للقياس إن أمكن.

المسمى الوظيفي: ${jobTitle}
المهمة الحالية: ${task}

أعد كتابة المهمة المحسّنة فقط دون أي شرح.`;

    return `You are a professional CV writer. Rewrite the following task to be impactful, action-oriented, and achievement-focused. Use strong action verbs and include measurable results where possible.

Job Title: ${jobTitle}
Current Task: ${task}

Rewrite only the improved task without any explanations.`;
  },

  skills: (lang: 'en' | 'ar'): string => {
    if (lang === 'ar')
      return `أنت كاتب سير ذاتية محترف. ساعدني في إنشاء قائمة مهارات احترافية منظمة لسيرتي الذاتية. قسم المهارات إلى: مهارات تقنية، مهارات شخصية، ولغات. قدم القائمة بتنسيق بسيط (كل مهارة في سطر منفصل) بدون شرح.`;

    return `You are a professional CV writer. Help me create a professional, well-organized skills list for my CV. Divide skills into: Technical Skills, Soft Skills, and Languages. Present the list in a simple format (one skill per line) without explanations.`;
  },

  education: (text: string, lang: 'en' | 'ar'): string => {
    if (lang === 'ar')
      return `أنت كاتب سير ذاتية محترف. ساعدني في تحسين وصف المؤهل التعليمي التالي لسيرتي الذاتية. أضف تفاصيل مهمة مثل المعدل، المشاريع، الأنشطة، أو أي إنجازات أكاديمية.

الوصف الحالي:
${text}

أعد كتابة الوصف المحسّن فقط دون أي شرح.`;

    return `You are a professional CV writer. Help me improve the following education entry for my CV. Add relevant details like GPA, projects, activities, or academic achievements.

Current description:
${text}

Rewrite only the improved description without any explanations.`;
  },
};

export const CHATGPT_URL = 'https://chat.openai.com';
