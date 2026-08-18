import type { AnswerOption, AnswerOptionId, Question } from "@/types";

interface QuestionTemplate {
  subject: string;
  text: string;
  options: [string, string, string, string];
  correct: AnswerOptionId;
  explanation: string;
}

const templates: QuestionTemplate[] = [
  {
    subject: "Pharmacology",
    text: "A nurse is preparing to administer digoxin to a client with heart failure. Which finding would lead the nurse to withhold the dose?",
    options: [
      "Blood pressure 118/76 mm Hg",
      "Apical pulse 48 beats/min",
      "Potassium 4.2 mEq/L",
      "Oxygen saturation 97%",
    ],
    correct: "B",
    explanation:
      "Digoxin should be withheld if the apical pulse is below 60 beats/min in adults (or below 90–110 in infants/young children). A pulse of 48 requires holding the dose and notifying the provider.",
  },
  {
    subject: "Medical-Surgical",
    text: "A client with type 1 diabetes mellitus reports trembling, sweating, and confusion. Which action should the nurse implement first?",
    options: [
      "Administer 1 ampule of 50% dextrose IV",
      "Check the client's blood glucose level",
      "Provide 15 g of a fast-acting carbohydrate",
      "Notify the health care provider",
    ],
    correct: "C",
    explanation:
      "For a conscious client with mild to moderate hypoglycemia, the first action is to administer 15 g of fast-acting carbohydrate (e.g., 4 oz juice). IV dextrose is reserved for severe or unconscious hypoglycemia.",
  },
  {
    subject: "Pediatrics",
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
  },
  {
    subject: "Mental Health",
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
  },
  {
    subject: "Fundamentals",
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
  },
  {
    subject: "Maternal-Newborn",
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
  },
  {
    subject: "Pharmacology",
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
  },
  {
    subject: "Medical-Surgical",
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
  },
];

const optionIds: AnswerOptionId[] = ["A", "B", "C", "D"];

export function buildMockQuestions(examId: string, total: number): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < total; i += 1) {
    const template = templates[i % templates.length];
    const options: AnswerOption[] = template.options.map((text, idx) => ({
      id: optionIds[idx],
      text,
    }));
    questions.push({
      id: `${examId}-q-${i + 1}`,
      examId,
      number: i + 1,
      subject: template.subject,
      text: template.text,
      options,
      correctOptionId: template.correct,
      explanation: template.explanation,
    });
  }
  return questions;
}
