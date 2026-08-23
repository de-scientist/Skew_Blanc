import type { AnswerOptionId, Question } from "@/types";

interface RichTemplate {
  subject: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  text: string;
  options: [string, string, string, string];
  correct: AnswerOptionId;
  explanation: string;
  rationales: [string, string, string, string];
  nursingProcess?: string;
  clinicalSetting?: string;
}

const templates: RichTemplate[] = [
  {
    subject: "Pharmacology",
    topic: "Cardiac medications",
    difficulty: "Medium",
    text: "A nurse is preparing to administer digoxin to a client with heart failure. Which finding would lead the nurse to withhold the dose?",
    options: [
      "Blood pressure 118/76 mm Hg",
      "Apical pulse 48 beats/min",
      "Potassium 4.2 mEq/L",
      "Oxygen saturation 97%",
    ],
    correct: "B",
    explanation:
      "Digoxin should be withheld if the apical pulse is below 60 beats/min in adults. A pulse of 48 requires holding the dose and notifying the provider.",
    rationales: [
      "Blood pressure 118/76 is within a safe range and is not a reason to hold digoxin.",
      "An apical pulse of 48 beats/min is below the safe threshold; digoxin is held to avoid toxicity.",
      "Potassium 4.2 mEq/L is normal; hypokalemia (not this value) increases digoxin toxicity risk.",
      "Oxygen saturation 97% is acceptable and not a withholding criterion.",
    ],
    nursingProcess: "Assessment",
    clinicalSetting: "Medical-Surgical",
  },
  {
    subject: "Medical-Surgical",
    topic: "Endocrine",
    difficulty: "Medium",
    text: "A client with type 1 diabetes mellitus reports trembling, sweating, and confusion. Which action should the nurse implement first?",
    options: [
      "Administer 1 ampule of 50% dextrose IV",
      "Check the client's blood glucose level",
      "Provide 15 g of a fast-acting carbohydrate",
      "Notify the health care provider",
    ],
    correct: "C",
    explanation:
      "For a conscious client with mild to moderate hypoglycemia, the first action is to administer 15 g of fast-acting carbohydrate. IV dextrose is reserved for severe or unconscious hypoglycemia.",
    rationales: [
      "IV dextrose is for severe/unconscious hypoglycemia, not the first step for a conscious client.",
      "Checking glucose is important but treating the symptoms takes precedence for a conscious client.",
      "15 g of fast-acting carbohydrate is the immediate treatment for mild hypoglycemia in a conscious client.",
      "Notifying the provider is not the first action for an acute, treatable symptom.",
    ],
    nursingProcess: "Implementation",
    clinicalSetting: "Medical-Surgical",
  },
  {
    subject: "Pediatrics",
    topic: "Growth and development",
    difficulty: "Easy",
    text: "A nurse is assessing a 6-month-old infant. Which finding indicates a need for further evaluation?",
    options: [
      "Rolls from back to abdomen",
      "Sits with support",
      "Has not yet doubled birth weight",
      "Transfers a toy from one hand to the other",
    ],
    correct: "C",
    explanation:
      "An infant should double birth weight by about 4–6 months. Failure to double birth weight by 6 months suggests a growth or feeding problem requiring evaluation.",
    rationales: [
      "Rolling back to abdomen is expected around 6 months.",
      "Sitting with support is appropriate at 6 months.",
      "Not doubling birth weight by 6 months is a red flag for growth delay.",
      "Transferring a toy hand-to-hand is expected by 6–7 months.",
    ],
    nursingProcess: "Assessment",
    clinicalSetting: "Pediatrics",
  },
  {
    subject: "Mental Health",
    topic: "Therapeutic communication",
    difficulty: "Medium",
    text: "A client with major depressive disorder states, 'I am worthless and a burden to everyone.' Which therapeutic response is most appropriate?",
    options: [
      "Tell the client that these feelings are not true",
      "Ask the client to describe what makes them feel this way",
      "Reassure the client that things will get better soon",
      "Encourage the client to join group activities immediately",
    ],
    correct: "B",
    explanation:
      "Using open-ended exploration validates the client's experience and gathers assessment data. Premature reassurance or contradicting the client can shut down communication.",
    rationales: [
      "Contradicting the client can feel dismissive and shut down communication.",
      "Open-ended exploration validates the experience and gathers data.",
      "Premature reassurance minimizes the client's feelings.",
      "Pushing group activities ignores the immediate need to be heard.",
    ],
    nursingProcess: "Assessment",
    clinicalSetting: "Mental Health",
  },
  {
    subject: "Fundamentals",
    topic: "Standard precautions",
    difficulty: "Easy",
    text: "A nurse is using standard precautions. Which personal protective equipment is required when drawing blood from a client?",
    options: [
      "N95 respirator",
      "Gown and face shield",
      "Clean gloves",
      "Surgical mask",
    ],
    correct: "C",
    explanation:
      "Drawing blood is a task with anticipated exposure to blood; clean gloves are the minimum required PPE under standard precautions.",
    rationales: [
      "An N95 is for airborne precautions, not routine blood draw.",
      "Gown and face shield are not required for routine venipuncture.",
      "Clean gloves are the minimum PPE for anticipated blood exposure.",
      "A surgical mask is not required for drawing blood.",
    ],
    nursingProcess: "Implementation",
    clinicalSetting: "Fundamentals",
  },
  {
    subject: "Maternal-Newborn",
    topic: "Postpartum",
    difficulty: "Medium",
    text: "A nurse is caring for a postpartum client. Which assessment finding 12 hours after delivery requires immediate notification of the provider?",
    options: [
      "Lochia rubra, moderate amount",
      "Fundus firm at the midline",
      "Temperature 38.4°C (101.1°F)",
      "Urination of 300 mL",
    ],
    correct: "C",
    explanation:
      "A temperature above 38°C (100.4°F) on the first postpartum day can indicate infection and should be reported promptly.",
    rationales: [
      "Lochia rubra moderate is expected at 12 hours postpartum.",
      "A firm midline fundus is a desired finding.",
      "Temperature >38°C on postpartum day 1 suggests infection.",
      "Voiding 300 mL is adequate.",
    ],
    nursingProcess: "Assessment",
    clinicalSetting: "Maternal-Newborn",
  },
  {
    subject: "Pharmacology",
    topic: "Anticoagulants",
    difficulty: "Hard",
    text: "A client is receiving warfarin. Which over-the-counter product should the nurse instruct the client to avoid?",
    options: [
      "Acetaminophen",
      "Aspirin",
      "Loratadine",
      "Calcium carbonate",
    ],
    correct: "B",
    explanation:
      "Aspirin inhibits platelet aggregation and, combined with warfarin, significantly increases bleeding risk. Clients on warfarin should avoid aspirin and NSAIDs.",
    rationales: [
      "Acetaminophen is preferred over aspirin for pain in warfarin clients.",
      "Aspirin adds to bleeding risk and must be avoided.",
      "Loratadine does not significantly affect bleeding risk.",
      "Calcium carbonate has no major interaction with warfarin.",
    ],
    nursingProcess: "Implementation",
    clinicalSetting: "Medical-Surgical",
  },
  {
    subject: "Medical-Surgical",
    topic: "Respiratory",
    difficulty: "Hard",
    text: "A nurse is assessing a client with chronic obstructive pulmonary disease (COPD). Which oxygen delivery method is safest?",
    options: [
      "Non-rebreather mask at 100%",
      "Venturi mask with controlled low-flow oxygen",
      "Bag-valve mask at high flow",
      "Nasal cannula at 15 L/min",
    ],
    correct: "B",
    explanation:
      "Clients with COPD retain CO2 and rely on hypoxic drive. Controlled low-concentration oxygen via a Venturi mask prevents suppressing the respiratory drive and worsening hypercapnia.",
    rationales: [
      "High-concentration oxygen can suppress hypoxic drive in COPD clients.",
      "A Venturi mask delivers controlled low-flow oxygen safely.",
      "A bag-valve mask at high flow is for resuscitation, not routine COPD care.",
      "15 L/min via nasal cannula is far above safe COPD limits.",
    ],
    nursingProcess: "Implementation",
    clinicalSetting: "Medical-Surgical",
  },
  {
    subject: "Fundamentals",
    topic: "Prioritization",
    difficulty: "Medium",
    text: "A nurse receives reports on four clients. Which client should the nurse assess first?",
    options: [
      "A client with a scheduled dressing change",
      "A client reporting chest pain and diaphoresis",
      "A client requesting a walk",
      "A client with a stable postoperative vital signs",
    ],
    correct: "B",
    explanation:
      "Chest pain with diaphoresis is potentially cardiac and immediately life-threatening; it takes priority over routine and stable needs.",
    rationales: [
      "A dressing change is non-urgent and can wait.",
      "Chest pain with diaphoresis suggests acute cardiac compromise and is the priority.",
      "A walk request is elective.",
      "Stable postoperative vitals are not urgent.",
    ],
    nursingProcess: "Assessment",
    clinicalSetting: "Fundamentals",
  },
  {
    subject: "Pediatrics",
    topic: "Fluid balance",
    difficulty: "Medium",
    text: "A nurse is calculating fluid maintenance for a 10-kg child. Using the 4-2-1 rule, what is the hourly maintenance rate?",
    options: ["40 mL/hr", "50 mL/hr", "60 mL/hr", "100 mL/hr"],
    correct: "A",
    explanation:
      "4-2-1: first 10 kg × 4 = 40 mL/hr. (Additional weight would add 2 mL/kg/hr and 1 mL/kg/hr tiers.)",
    rationales: [
      "First 10 kg × 4 mL = 40 mL/hr is correct.",
      "50 mL/hr would apply to a heavier child with tier 2 included.",
      "60 mL/hr overestimates for 10 kg.",
      "100 mL/hr is far above maintenance.",
    ],
    nursingProcess: "Planning",
    clinicalSetting: "Pediatrics",
  },
  {
    subject: "Mental Health",
    topic: "Anxiety disorders",
    difficulty: "Easy",
    text: "A client with generalized anxiety disorder is taught relaxation techniques. Which statement indicates the teaching was effective?",
    options: [
      "I will avoid all caffeine and practice diaphragmatic breathing",
      "I will take my anxiolytic only when I feel panicky",
      "I should isolate when anxious to stay safe",
      "I will stop the medication once I feel calm",
    ],
    correct: "A",
    explanation:
      "Avoiding caffeine and using breathing techniques are effective, client-controlled anxiety management strategies.",
    rationales: [
      "Caffeine reduction and breathing are effective self-management.",
      "Anxiolytics are usually scheduled, not only PRN for panic, per prescriber.",
      "Isolation worsens anxiety; connection helps.",
      "Medication should not be stopped without provider guidance.",
    ],
    nursingProcess: "Evaluation",
    clinicalSetting: "Mental Health",
  },
  {
    subject: "Maternal-Newborn",
    topic: "Labor and delivery",
    difficulty: "Medium",
    text: "A nurse is monitoring a client in active labor. Which finding suggests the need to notify the provider immediately?",
    options: [
      "Cervix dilated 6 cm",
      "Fetal heart rate 170 beats/min persistent",
      "Contractions every 3 minutes",
      "Mucous plug passed",
    ],
    correct: "B",
    explanation:
      "A persistent fetal heart rate of 170 beats/min suggests fetal tachycardia, possibly indicating hypoxia or infection, and requires prompt provider notification.",
    rationales: [
      "6 cm dilation is expected in active labor.",
      "Persistent FHR 170 is fetal tachycardia and concerning.",
      "Contractions every 3 minutes are normal in active labor.",
      "Passing the mucous plug is expected.",
    ],
    nursingProcess: "Assessment",
    clinicalSetting: "Maternal-Newborn",
  },
  {
    subject: "Pharmacology",
    topic: "Insulin",
    difficulty: "Medium",
    text: "A nurse is teaching a client with diabetes about insulin storage. Which instruction is correct?",
    options: [
      "Keep open insulin vials at room temperature for up to 28 days",
      "Freeze insulin to extend its life",
      "Store all insulin in direct sunlight",
      "Shake the vial vigorously before drawing up",
    ],
    correct: "A",
    explanation:
      "Open insulin vials may be kept at room temperature for up to about 28 days; unopened insulin is refrigerated. Freezing, heat, and vigorous shaking degrade insulin.",
    rationales: [
      "Room-temperature open vials up to ~28 days is correct.",
      "Freezing destroys insulin.",
      "Sunlight/heat degrades insulin.",
      "Vigorous shaking creates bubbles and denatures insulin.",
    ],
    nursingProcess: "Implementation",
    clinicalSetting: "Medical-Surgical",
  },
  {
    subject: "Medical-Surgical",
    topic: "Renal",
    difficulty: "Hard",
    text: "A nurse is caring for a client with acute kidney injury. Which laboratory value requires the nurse to hold a scheduled dose of spironolactone?",
    options: [
      "Sodium 140 mEq/L",
      "Potassium 6.1 mEq/L",
      "Calcium 9.2 mg/dL",
      "Creatinine 1.4 mg/dL",
    ],
    correct: "B",
    explanation:
      "Spironolactone is potassium-sparing; a potassium of 6.1 mEq/L indicates hyperkalemia, and the dose should be held and the provider notified.",
    rationales: [
      "Sodium 140 is normal.",
      "Potassium 6.1 is hyperkalemic; holding a K-sparing diuretic is required.",
      "Calcium 9.2 is normal.",
      "Creatinine 1.4 is mildly elevated but not the deciding value here.",
    ],
    nursingProcess: "Implementation",
    clinicalSetting: "Medical-Surgical",
  },
  {
    subject: "Fundamentals",
    topic: "Delegation",
    difficulty: "Medium",
    text: "A nurse is delegating care. Which task is appropriate to assign to a nursing assistive personnel (NAP)?",
    options: [
      "Assess a new admission's pain",
      "Measure and record intake and output",
      "Teach a client about a new medication",
      "Evaluate the effectiveness of a intervention",
    ],
    correct: "B",
    explanation:
      "Measuring and recording intake and output is within NAP scope. Assessment, teaching, and evaluation are the nurse's responsibility.",
    rationales: [
      "Assessment is the nurse's responsibility, not NAP.",
      "I&O measurement/recording is appropriate to delegate to NAP.",
      "Teaching requires the nurse's scope.",
      "Evaluation is the nurse's responsibility.",
    ],
    nursingProcess: "Implementation",
    clinicalSetting: "Fundamentals",
  },
  {
    subject: "Pediatrics",
    topic: "Immunization",
    difficulty: "Easy",
    text: "A parent asks why their infant needs multiple vaccine doses. Which response is best?",
    options: [
      "Extra doses are given in case the first ones fail",
      "Doses build and sustain protective immunity as the immune system matures",
      "The doses are identical to adult doses",
      "Vaccines are only needed once a child starts school",
    ],
    correct: "B",
    explanation:
      "Multiple doses build and maintain protective antibody levels as the child's immune system develops; schedules are evidence-based.",
    rationales: [
      "Doses are scheduled for immunity, not as backups for failure.",
      "Multiple doses build/sustain immunity as the immune system matures.",
      "Pediatric doses are weight/age adjusted, not identical to adults.",
      "Vaccines are needed well before school entry.",
    ],
    nursingProcess: "Implementation",
    clinicalSetting: "Pediatrics",
  },
  {
    subject: "Mental Health",
    topic: "Substance use",
    difficulty: "Medium",
    text: "A client is admitted for alcohol withdrawal. Which medication is commonly used to prevent seizures and reduce symptoms?",
    options: [
      "Disulfiram",
      "Benzodiazepines",
      "Naltrexone",
      "Methadone",
    ],
    correct: "B",
    explanation:
      "Benzodiazepines are first-line to prevent withdrawal seizures and manage symptoms; disulfiram/naltrexone are used later for relapse prevention.",
    rationales: [
      "Disulfiram is for aversion, not acute withdrawal.",
      "Benzodiazepines prevent seizures and ease acute withdrawal.",
      "Naltrexone is for relapse prevention, not acute withdrawal.",
      "Methadone is for opioid dependence, not alcohol withdrawal.",
    ],
    nursingProcess: "Implementation",
    clinicalSetting: "Mental Health",
  },
  {
    subject: "Maternal-Newborn",
    topic: "Neonatal",
    difficulty: "Easy",
    text: "A nurse is assessing a newborn. Which finding is expected and normal?",
    options: [
      "Cyanosis of the hands and feet (acrocyanosis)",
      "Absent Moro reflex",
      "Jaundice at birth",
      "Respiratory rate of 60 with retractions",
    ],
    correct: "A",
    explanation:
      "Acrocyanosis (bluish hands and feet) is a normal transitional finding in newborns; the other options are abnormal.",
    rationales: [
      "Acrocyanosis is a normal newborn transition finding.",
      "Absent Moro reflex is abnormal and needs evaluation.",
      "Jaundice at birth suggests pathology, not normal.",
      "Retractions with tachypnea indicate distress.",
    ],
    nursingProcess: "Assessment",
    clinicalSetting: "Maternal-Newborn",
  },
];

const optionIds: AnswerOptionId[] = ["A", "B", "C", "D"];

function buildOne(
  examId: string,
  template: RichTemplate,
  index: number,
  poolId: string
): Question {
  const options = template.options.map((text, idx) => ({
    id: optionIds[idx],
    text,
  }));
  const optionRationales: Record<string, string> = {};
  template.rationales.forEach((r, idx) => {
    optionRationales[optionIds[idx]] = r;
  });
  return {
    id: `${examId}-q-${index + 1}`,
    examId,
    number: index + 1,
    subject: template.subject,
    topic: template.topic,
    text: template.text,
    options,
    correctOptionId: template.correct,
    explanation: template.explanation,
    questionType: "single_choice",
    difficulty: template.difficulty,
    optionRationales,
    tags: [template.subject, template.topic],
    nursingProcess: template.nursingProcess,
    clinicalSetting: template.clinicalSetting,
    questionBankStatus: "published",
    reviewStatus: "approved",
    poolId,
    source: "Nursora editorial",
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  };
}

/** Builds an exam-length set of questions (backward-compatible). */
export function buildMockQuestions(examId: string, total: number): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < total; i += 1) {
    const template = templates[i % templates.length];
    questions.push(buildOne(examId, template, i, examId));
  }
  return questions;
}

/**
 * Builds a question pool larger than the exam so the engine can demonstrate
 * pooling, filtering, and randomization. The engine selects `questionCount`
 * items from this pool per attempt.
 */
export function buildQuestionPool(examId: string, size = 60): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < size; i += 1) {
    const template = templates[i % templates.length];
    questions.push(buildOne(examId, template, i, `${examId}-pool`));
  }
  return questions;
}
