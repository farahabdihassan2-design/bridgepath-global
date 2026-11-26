export type Guidance = {
  heading: string;
  intro: string;
  legal: string;
  payment: string;
  compliance: string;
  legalSteps: [string, string][];
  paymentSteps: [string, string][];
  complianceSteps: [string, string][];
  caution: string;
  progress: string;
};
export const guidance: Record<string, Guidance> = {
  English: {
    heading: "Move forward with clarity.",
    intro:
      "Work authorization, payment access and safer onboarding — in a language you understand.",
    legal: "Legal action checklist",
    payment: "Payment & invoicing readiness",
    compliance: "Hiring compliance copilot",
    progress: "completed",
    legalSteps: [
      [
        "Confirm your identity documents",
        "Gather available identity records and ask a qualified adviser about accepted alternatives.",
      ],
      [
        "Check your current status and work rights",
        "Confirm whether your protection or residence status permits the selected work pathway.",
      ],
      [
        "Confirm permits and local requirements",
        "Check work authorization, tax registration and any regulated-profession requirements with the competent authority.",
      ],
      [
        "Review a written work agreement",
        "Confirm fair compensation, duties, working hours and an accessible grievance process before signing.",
      ],
    ],
    paymentSteps: [
      [
        "Prepare a banking or mobile-money account",
        "Ask regulated providers which identity documents they accept. Compare fees and account restrictions.",
      ],
      [
        "Confirm cross-border payout access",
        "Check availability, currency conversion, fees and recipient verification for your chosen payout provider.",
      ],
      [
        "Check tax and invoicing obligations",
        "Confirm registration, reporting and invoice requirements with a local qualified tax adviser.",
      ],
      [
        "Prepare your contractor invoice",
        "Include both parties, a clear service description, currency, payment terms and applicable registration details.",
      ],
    ],
    complianceSteps: [
      [
        "Verify the specific right to work",
        "Check current authorization and expiry with the candidate’s consent. Refugee status is not a universal work permit.",
      ],
      [
        "Use skills-first selection",
        "Assess job-relevant competencies and reasonable accommodations, not nationality or local-only credentials.",
      ],
      [
        "Agree a fair, paid pathway",
        "Document pay, hours, supervision, renewal dates and returnship conversion criteria. Do not promise a full-time offer.",
      ],
      [
        "Protect data and monitor renewals",
        "Collect only necessary records, restrict access, set review dates and provide a safe grievance channel.",
      ],
    ],
    caution:
      "General onboarding guidance, not legal or tax advice. Rules vary by status, region and pathway. Confirm current requirements with the relevant authority or a qualified adviser.",
  },
  Arabic: {
    heading: "تقدّم بثقة ووضوح.",
    intro: "تصريح العمل والوصول إلى المدفوعات وإجراءات التوظيف الآمنة — بلغتك.",
    legal: "قائمة الإجراءات القانونية",
    payment: "الاستعداد للمدفوعات والفواتير",
    compliance: "دليل امتثال التوظيف",
    progress: "مكتمل",
    legalSteps: [
      ["تأكيد وثائق الهوية", "اجمع الوثائق المتاحة واستشر مختصاً بشأن البدائل المقبولة."],
      ["التحقق من الوضع وحق العمل", "تأكد من أن وضع الحماية أو الإقامة يسمح بمسار العمل المحدد."],
      [
        "التحقق من التصاريح والمتطلبات المحلية",
        "تحقق من تصريح العمل والتسجيل الضريبي ومتطلبات المهن المنظمة لدى الجهة المختصة.",
      ],
      [
        "مراجعة اتفاق عمل مكتوب",
        "تأكد من الأجر العادل والمهام وساعات العمل وآلية تقديم الشكاوى قبل التوقيع.",
      ],
    ],
    paymentSteps: [
      [
        "إعداد حساب مصرفي أو محفظة مالية",
        "اسأل مقدمي الخدمات المعتمدين عن وثائق الهوية المقبولة وقارن الرسوم والقيود.",
      ],
      [
        "التحقق من المدفوعات عبر الحدود",
        "تحقق من التوافر وتحويل العملات والرسوم وإجراءات التحقق من المستلم.",
      ],
      [
        "التحقق من الالتزامات الضريبية والفواتير",
        "استشر مستشاراً ضريبياً محلياً بشأن التسجيل والتقارير ومتطلبات الفواتير.",
      ],
      [
        "إعداد فاتورة المقاول",
        "أدرج الطرفين ووصف الخدمة والعملة وشروط الدفع وبيانات التسجيل المطلوبة.",
      ],
    ],
    complianceSteps: [
      [
        "التحقق من حق العمل المحدد",
        "تحقق من التصريح وتاريخ انتهائه بموافقة المرشح. صفة اللاجئ ليست تصريح عمل عاماً.",
      ],
      [
        "اختيار قائم على المهارات",
        "قيّم الكفاءات المتعلقة بالوظيفة والتسهيلات المعقولة بدلاً من الجنسية.",
      ],
      [
        "الاتفاق على مسار عادل ومدفوع",
        "وثّق الأجر والساعات والإشراف والتجديد ومعايير التوظيف بعد التدريب.",
      ],
      [
        "حماية البيانات ومتابعة التجديد",
        "اجمع فقط البيانات الضرورية وحدد صلاحيات الوصول ومواعيد المراجعة وآلية آمنة للشكاوى.",
      ],
    ],
    caution:
      "إرشادات عامة وليست مشورة قانونية أو ضريبية. تختلف القواعد حسب الوضع والمنطقة والمسار. تحقق من المتطلبات الحالية لدى الجهات المختصة.",
  },
  French: {
    heading: "Avancez avec confiance.",
    intro: "Autorisation de travail, accès aux paiements et intégration sûre — dans votre langue.",
    legal: "Liste des démarches juridiques",
    payment: "Préparation des paiements et factures",
    compliance: "Guide de conformité employeur",
    progress: "terminé",
    legalSteps: [
      [
        "Confirmer vos pièces d’identité",
        "Rassemblez les documents disponibles et consultez un conseiller sur les alternatives acceptées.",
      ],
      [
        "Vérifier votre statut et le droit au travail",
        "Confirmez que votre statut de protection ou de résidence autorise le parcours choisi.",
      ],
      [
        "Vérifier les permis et exigences locales",
        "Vérifiez l’autorisation de travail, l’inscription fiscale et les exigences professionnelles auprès de l’autorité compétente.",
      ],
      [
        "Examiner un contrat écrit",
        "Confirmez la rémunération, les fonctions, les horaires et une procédure de réclamation avant de signer.",
      ],
    ],
    paymentSteps: [
      [
        "Préparer un compte bancaire ou mobile",
        "Demandez aux prestataires réglementés quelles pièces ils acceptent. Comparez les frais et restrictions.",
      ],
      [
        "Vérifier les paiements transfrontaliers",
        "Vérifiez la disponibilité, le change, les frais et l’identification du bénéficiaire.",
      ],
      [
        "Vérifier les obligations fiscales",
        "Confirmez l’inscription, les déclarations et les exigences de facturation avec un conseiller fiscal local.",
      ],
      [
        "Préparer votre facture de prestataire",
        "Indiquez les deux parties, la prestation, la devise, les modalités de paiement et les inscriptions requises.",
      ],
    ],
    complianceSteps: [
      [
        "Vérifier le droit au travail",
        "Contrôlez l’autorisation et son expiration avec le consentement du candidat. Le statut de réfugié n’est pas un permis universel.",
      ],
      [
        "Recruter selon les compétences",
        "Évaluez les compétences utiles et les aménagements raisonnables, et non la nationalité.",
      ],
      [
        "Convenir d’un parcours équitable et rémunéré",
        "Documentez le salaire, les horaires, la supervision et les critères de conversion. Ne garantissez pas une offre.",
      ],
      [
        "Protéger les données et suivre les renouvellements",
        "Limitez les données, contrôlez les accès, fixez des révisions et proposez un canal de réclamation sûr.",
      ],
    ],
    caution:
      "Informations générales, non un conseil juridique ou fiscal. Les règles varient selon le statut, la région et le parcours. Consultez l’autorité compétente ou un conseiller qualifié.",
  },
  Chinese: {
    heading: "清晰前行，安心启程。",
    intro: "工作许可、收款渠道与安全入职——用您熟悉的语言获取指引。",
    legal: "法律行动清单",
    payment: "收款与开票准备",
    compliance: "招聘合规指南",
    progress: "已完成",
    legalSteps: [
      ["确认身份证明文件", "收集现有身份证明，并向合格顾问咨询可接受的替代文件。"],
      ["核实当前身份与工作权利", "确认您的保护或居留身份是否允许所选的工作途径。"],
      ["确认许可与当地要求", "向主管机构核实工作许可、税务登记及受监管职业的相关要求。"],
      ["审阅书面工作协议", "签署前确认公平报酬、工作职责、工作时间及方便使用的申诉程序。"],
    ],
    paymentSteps: [
      ["准备银行或移动支付账户", "向受监管的服务机构询问接受哪些身份证明，并比较费用与账户限制。"],
      ["确认跨境收款渠道", "核实所选收款服务的可用性、货币兑换、费用及收款人身份验证要求。"],
      ["核实税务与开票义务", "向当地合格税务顾问确认登记、申报及发票要求。"],
      ["准备承包服务发票", "注明双方信息、清晰的服务说明、币种、付款条款及适用的登记信息。"],
    ],
    complianceSteps: [
      [
        "核实具体工作权利",
        "经候选人同意，核查当前工作许可及有效期。难民身份并不等于通用工作许可。",
      ],
      ["采用技能优先的选拔方式", "评估与岗位相关的能力及合理便利措施，而非国籍或仅限当地的资历。"],
      [
        "约定公平且有报酬的工作途径",
        "记录报酬、工时、监督安排、续约日期及重返职场项目的转正标准。不要承诺全职录用。",
      ],
      ["保护数据并跟进续期", "仅收集必要记录，限制访问权限，设定审核日期，并提供安全的申诉渠道。"],
    ],
    caution:
      "一般入职指引，不构成法律或税务建议。规定因身份、地区及工作途径而异。请向相关主管机构或合格顾问确认现行要求。",
  },
  Swahili: {
    heading: "Songa mbele kwa uwazi.",
    intro: "Ruhusa ya kazi, upatikanaji wa malipo na kuanza kazi kwa usalama — kwa lugha yako.",
    legal: "Orodha ya hatua za kisheria",
    payment: "Utayari wa malipo na ankara",
    compliance: "Mwongozo wa kufuata sheria za ajira",
    progress: "imekamilika",
    legalSteps: [
      [
        "Thibitisha hati zako za utambulisho",
        "Kusanya hati zilizopo na muulize mshauri kuhusu njia mbadala zinazokubalika.",
      ],
      [
        "Angalia hali yako na haki ya kufanya kazi",
        "Thibitisha kama hali yako ya ulinzi au makazi inaruhusu njia ya kazi uliyochagua.",
      ],
      [
        "Thibitisha vibali na mahitaji ya eneo",
        "Angalia kibali cha kazi, usajili wa kodi na mahitaji ya taaluma kwa mamlaka husika.",
      ],
      [
        "Pitia mkataba wa kazi ulioandikwa",
        "Thibitisha malipo ya haki, majukumu, saa za kazi na utaratibu wa malalamiko kabla ya kusaini.",
      ],
    ],
    paymentSteps: [
      [
        "Andaa akaunti ya benki au pesa za simu",
        "Waulize watoa huduma walioidhinishwa kuhusu hati zinazokubalika. Linganisha ada na vikwazo.",
      ],
      [
        "Thibitisha malipo ya kimataifa",
        "Angalia upatikanaji, ubadilishaji wa fedha, ada na uthibitisho wa mpokeaji.",
      ],
      [
        "Angalia wajibu wa kodi na ankara",
        "Thibitisha usajili, taarifa na mahitaji ya ankara na mshauri wa kodi wa eneo lako.",
      ],
      [
        "Andaa ankara yako ya huduma",
        "Weka taarifa za wahusika, maelezo ya huduma, sarafu, masharti ya malipo na usajili unaohitajika.",
      ],
    ],
    complianceSteps: [
      [
        "Thibitisha haki maalum ya kufanya kazi",
        "Angalia ruhusa na tarehe ya mwisho kwa idhini ya mgombea. Hadhi ya ukimbizi si kibali cha kazi kila mahali.",
      ],
      [
        "Chagua kwa kuzingatia ujuzi",
        "Tathmini uwezo unaohusiana na kazi na marekebisho yanayofaa, si uraia.",
      ],
      [
        "Kubalianeni njia ya haki yenye malipo",
        "Andika malipo, saa, usimamizi na vigezo vya kuajiri baada ya majaribio. Usiahidi ajira ya kudumu.",
      ],
      [
        "Linda data na fuatilia vibali",
        "Kusanya taarifa muhimu tu, dhibiti ufikiaji na weka tarehe za ukaguzi na njia salama ya malalamiko.",
      ],
    ],
    caution:
      "Mwongozo wa jumla, si ushauri wa kisheria au kodi. Sheria hutofautiana kulingana na hali, eneo na njia. Thibitisha mahitaji na mamlaka husika au mshauri mwenye sifa.",
  },
};
export const regionalResources: Record<string, { name: string; url: string }> = {
  Kenya: { name: "Kenya Department of Refugee Services", url: "https://refugee.go.ke/" },
  Uganda: { name: "Uganda Office of the Prime Minister", url: "https://opm.go.ug/" },
  Rwanda: {
    name: "Rwanda Ministry in Charge of Emergency Management",
    url: "https://www.minema.gov.rw/",
  },
  Germany: {
    name: "Germany Federal Office for Migration and Refugees",
    url: "https://www.bamf.de/EN/",
  },
  "Global / Remote": {
    name: "UNHCR Help — country-specific support",
    url: "https://help.unhcr.org/",
  },
};
