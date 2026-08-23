import type {
  TutorAction,
  TutorContext,
  TutorMessage,
  TutorSession,
} from "@/types/assessment";

/**
 * AI Tutor architecture
 * ---------------------
 * The tutor is accessed only through `TutorProvider`. A real LLM backend can
 * be dropped in by implementing this interface (or by pointing the
 * `TutorService` at an API route that calls the model). The default provider
 * shipped here is a **deterministic, rule-based tutor** that composes guidance
 * from curated subject knowledge and the question's own explanation. It never
 * fabricates references and never presents itself as a clinician or exam
 * authority. It is genuinely useful (Socratic hints, mistake analysis,
 * concept explanations) without pretending to be a live language model.
 */
export interface TutorProvider {
  readonly name: string;
  hint(ctx: TutorContext): string;
  explainAnswer(ctx: TutorContext): string;
  explainConcept(ctx: TutorContext): string;
  analyzeMistake(ctx: TutorContext): string;
  clinicalExample(ctx: TutorContext): string;
  simplify(ctx: TutorContext): string;
  followUp(ctx: TutorContext): string;
  teachTopic(ctx: TutorContext): string;
  revealAnswer(ctx: TutorContext): string;
}

const SUBJECT_KB: Record<string, { concept: string; pearl: string }> = {
  Pharmacology: {
    concept:
      "Pharmacology questions hinge on mechanism of action, therapeutic window, and adverse-effect profiles. Anchor your reasoning to the drug class before reading the options.",
    pearl:
      "Ask: What system does this drug act on, and what happens when that system is modulated?",
  },
  "Medical-Surgical": {
    concept:
      "Medical-surgical reasoning follows the nursing process: assess, identify the priority problem, and intervene to maintain perfusion, oxygenation, and safety.",
    pearl: "Use ABCs and Maslow when choosing the priority nursing action.",
  },
  Pediatrics: {
    concept:
      "Pediatric answers must be judged against developmental norms (growth, milestones, family-centered care), not adult thresholds.",
    pearl: "Compare the finding to the expected developmental milestone for the age.",
  },
  "Mental Health": {
    concept:
      "Mental-health questions favor therapeutic communication: acknowledge, explore, and validate rather than reassure, contradict, or redirect prematurely.",
    pearl: "Choose the response that invites the client to say more.",
  },
  Fundamentals: {
    concept:
      "Fundamentals center on safety, standard precautions, asepsis, and the nurse's scope of practice.",
    pearl: "When in doubt, pick the option that protects the patient and follows protocol.",
  },
  "Maternal-Newborn": {
    concept:
      "Maternal-newborn reasoning tracks the four Ps (powers, passage, passenger, psyche) and postpartum recovery norms.",
    pearl: "Flag any vital sign or finding outside the expected postpartum range.",
  },
};

function kbFor(subject: string) {
  return (
    SUBJECT_KB[subject] ?? {
      concept:
        "Approach this question by isolating the core concept being tested, then eliminating options that contradict first-principle nursing reasoning.",
      pearl: "Identify the single best action that keeps the patient safe.",
    }
  );
}

function optionText(ctx: TutorContext, id?: string | null): string {
  if (!id) return "your selected answer";
  const opt = ctx.options.find((o) => o.id === id);
  return opt ? `“${opt.text}”` : "your selected answer";
}

export class HeuristicTutorProvider implements TutorProvider {
  readonly name = "heuristic";

  hint(ctx: TutorContext): string {
    const kb = kbFor(ctx.subject);
    return `Let's reason it through instead of guessing. ${kb.concept} ${kb.pearl} Which option best matches that principle? You don't need the answer yet — just tell me what you're thinking.`;
  }

  explainConcept(ctx: TutorContext): string {
    const kb = kbFor(ctx.subject);
    return `Concept: ${kb.concept} In this scenario, the key idea is to apply that principle to the client's presentation before evaluating each option.`;
  }

  explainAnswer(ctx: TutorContext): string {
    const kb = kbFor(ctx.subject);
    const base = ctx.explanation
      ? `Here is the reasoning: ${ctx.explanation}`
      : `Apply the governing principle: ${kb.concept}`;
    return `${base} Notice how the correct choice follows directly from the underlying concept rather than a memorized fact.`;
  }

  analyzeMistake(ctx: TutorContext): string {
    if (!ctx.studentAnswerId) {
      return "You hadn't selected an answer yet. Start by stating what the question is really asking, then apply the core principle for this subject.";
    }
    const kb = kbFor(ctx.subject);
    const wrong = optionText(ctx, ctx.studentAnswerId);
    return `Your answer was ${wrong}. A common misconception here is focusing on a secondary detail instead of the priority issue. ${kb.concept} Re-read the stem: what is the single most important problem the nurse must address?`;
  }

  clinicalExample(ctx: TutorContext): string {
    return `Clinical example: imagine a similar client on your unit. The same principle — ${kbFor(ctx.subject).concept} — would guide your assessment and the order of your interventions. Real patients vary, so always confirm with your instructor or the care team for actual clinical decisions.`;
  }

  simplify(ctx: TutorContext): string {
    const kb = kbFor(ctx.subject);
    return `In plain terms: ${kb.concept} ${kb.pearl}`;
  }

  followUp(ctx: TutorContext): string {
    return `Good. Now extend the reasoning: what would change your priority if the client's status worsened? Or which assessment finding would make you reconsider the plan?`;
  }

  teachTopic(ctx: TutorContext): string {
    const topic = ctx.topic ?? ctx.subject;
    const kb = kbFor(ctx.subject);
    return `Let's study ${topic}. Core idea: ${kb.concept} ${kb.pearl} After this question, review one more ${topic} item, then summarize the rule in your own words to lock it in.`;
  }

  revealAnswer(ctx: TutorContext): string {
    const correct =
      ctx.options.find((o) => o.id === ctx.correctAnswerId)?.text ??
      "the correct option";
    return `For learning purposes: the correct answer is ${correct}. ${ctx.explanation ?? ""} Remember, the goal is to understand *why*, so re-explain it back to me before moving on.`;
  }
}

/**
 * Selects the active tutor provider.
 *
 * A real LLM provider would be wired here (e.g. behind a server route that
 * injects the model key). Until then the deterministic heuristic provider is
 * used and clearly labeled in the UI as a guided tutor — no live model is
 * invoked and no answer is fabricated.
 */
export function getTutorProvider(): TutorProvider {
  const requested = process.env.NEXT_PUBLIC_TUTOR_PROVIDER;
  if (requested && requested !== "heuristic") {
    // Hook for a future model-backed provider. Falls back to heuristic so the
    // product never silently claims AI capability it does not have.
    return new HeuristicTutorProvider();
  }
  return new HeuristicTutorProvider();
}

export class TutorService {
  constructor(private provider: TutorProvider = getTutorProvider()) {}

  respond(action: TutorAction, ctx: TutorContext): TutorMessage {
    const content = this.dispatch(action, ctx);
    return {
      id: `msg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      role: "tutor",
      content,
      action,
      createdAt: new Date().toISOString(),
      revealsAnswer: action === "reveal_answer",
    };
  }

  private dispatch(action: TutorAction, ctx: TutorContext): string {
    switch (action) {
      case "hint":
        return this.provider.hint(ctx);
      case "explain_answer":
        return this.provider.explainAnswer(ctx);
      case "explain_concept":
        return this.provider.explainConcept(ctx);
      case "analyze_mistake":
        return this.provider.analyzeMistake(ctx);
      case "clinical_example":
        return this.provider.clinicalExample(ctx);
      case "simplify":
        return this.provider.simplify(ctx);
      case "follow_up":
        return this.provider.followUp(ctx);
      case "teach_topic":
        return this.provider.teachTopic(ctx);
      case "reveal_answer":
        return this.provider.revealAnswer(ctx);
      default:
        return this.provider.hint(ctx);
    }
  }
}

export function newSession(questionId?: string, attemptId?: string): TutorSession {
  return {
    id: `tut-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    attemptId,
    questionId,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
