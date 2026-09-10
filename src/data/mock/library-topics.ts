import type { KnowledgeTopic } from "./library-types";

/**
 * Seed library topics. Educational overviews for development; structured so
 * each topic carries every learning resource (quick notes, detailed notes,
 * flashcards, cheat sheet, exam link, related topics).
 */
export const LIBRARY_TOPICS: KnowledgeTopic[] = [
  /* ------------------------- Fundamentals ------------------------- */
  {
    id: "lib-infection-control",
    subjectSlug: "fundamentals-of-nursing",
    title: "Infection Control",
    slug: "infection-control",
    description:
      "Breaking the chain of infection through standard precautions, transmission-based precautions, and aseptic technique.",
    difficulty: "Foundations",
    tags: ["infection", "safety", "precautions", "asepsis", "hand-hygiene"],
    estimatedMinutes: 15,
    examSlug: "nclex-rn",
    relatedSlugs: ["vital-signs"],
    quickNotes: {
      intro:
        "Most infection questions are answered by two ideas: hand hygiene breaks the chain, and the precaution must match the transmission route.",
      sections: [
        {
          heading: "Definition",
          points: [
            "Infection control is the set of practices that prevent pathogens from spreading between patients, staff, and visitors.",
            "The chain of infection has six links: agent, reservoir, portal of exit, mode of transmission, portal of entry, susceptible host.",
          ],
        },
        {
          heading: "Standard Precautions",
          points: [
            "Apply to ALL patients, ALL the time — gloves, gowns, masks, and eye protection based on anticipated exposure.",
            "Hand hygiene before and after every patient contact is the single most effective measure.",
            "Safe injection practices and proper cleaning of shared equipment are included.",
          ],
        },
        {
          heading: "Transmission-Based Precautions",
          points: [
            "Contact (MRSA, VRE, C. difficile, wound infections): private room, gown + gloves; dedicated equipment.",
            "Droplet (influenza, pertussis, meningitis): private room, surgical mask within 3 feet; patient wears a mask during transport.",
            "Airborne (measles, varicella, tuberculosis): negative-pressure room, N95 respirator, keep door closed.",
          ],
        },
        {
          heading: "Asepsis",
          points: [
            "Medical asepsis (clean technique) reduces pathogen spread; surgical asepsis (sterile technique) eliminates all microbes from an area.",
            "Sterile field rules: keep objects above the waist, keep the field dry, never turn your back, 1-inch border is contaminated.",
          ],
        },
        {
          heading: "Nursing Priorities",
          ordered: true,
          points: [
            "Perform hand hygiene before and after every contact — even when gloves are worn.",
            "Match the precaution to the organism's transmission route before entering the room.",
            "Protect immunocompromised (neutropenic) patients with protective precautions and safe food handling.",
          ],
        },
      ],
      nclexFocus: [
        "Hand hygiene is the answer to most 'best action to prevent spread' questions.",
        "Airborne = N95 + negative pressure (measles, TB, varicella). Droplet = surgical mask (flu, pertussis).",
        "C. difficile requires soap and water — alcohol-based sanitizer does not kill spores.",
      ],
    },
    detailedNotes: {
      intro:
        "Healthcare-associated infections prolong hospitalization and increase mortality. Nurses are the front line of prevention, and exam questions reward nurses who apply precautions systematically rather than from memory of isolated facts.",
      sections: [
        {
          heading: "Overview",
          paragraphs: [
            "An infection occurs when a pathogen enters a susceptible host, multiplies, and causes disease. The nurse's role spans prevention (hand hygiene, precautions, vaccination), early detection (vital-sign trends, wound assessment), and containment (isolation, cohorting, reporting).",
          ],
        },
        {
          heading: "The Chain of Infection",
          paragraphs: [
            "Each of the six links offers an intervention point: treat or eliminate the agent, disinfect reservoirs, cover portals of exit (masks, wound dressings), block transmission (hand hygiene, barriers), protect portals of entry (sterile technique), and strengthen the host (nutrition, immunization).",
          ],
          callout: {
            type: "key-concept",
            text: "Breaking ANY single link stops transmission. Hand hygiene is the link nurses control most often, which is why it dominates exam questions.",
          },
        },
        {
          heading: "Standard Precautions",
          paragraphs: [
            "Assume every patient's blood and body fluids are infectious. Wear gloves for any contact with fluids, mucous membranes, or non-intact skin; add gowns, masks, and eye protection when splashing is likely. Change gloves between tasks on the same patient when moving from a contaminated to a clean body site.",
          ],
        },
        {
          heading: "Transmission-Based Precautions",
          paragraphs: [
            "Use this quick guide when selecting precautions:",
            "| Route | Room | Barrier | Examples |",
            "| --- | --- | --- | --- |",
            "| Contact | Private (or cohort) | Gown + gloves | MRSA, VRE, C. difficile |",
            "| Droplet | Private | Surgical mask within 3 ft | Influenza, pertussis |",
            "| Airborne | Negative pressure | N95 respirator | Measles, TB, varicella |",
            "Keep precaution supplies outside the room, explain the reason to the patient and family to reduce stigma, and continue precautions for the full recommended duration.",
          ],
          callout: {
            type: "nclex-tip",
            text: "Select-all-that-apply questions love mixing precaution elements. Memorize one full set per route (room + barrier + example organisms) instead of isolated facts.",
          },
        },
        {
          heading: "Aseptic Technique",
          paragraphs: [
            "Sterile technique is required for urinary catheter insertion, central-line dressing changes, wound care of surgical incisions, and any procedure entering a sterile body cavity. Open sterile packages away from the body, keep the field above waist level and within sight, and consider any wet or dropped item contaminated.",
          ],
        },
        {
          heading: "Protecting the Immunocompromised Patient",
          paragraphs: [
            "Neutropenic patients (absolute neutrophil count below 500) need protective precautions: private room, strict hand hygiene for all entrants, no fresh flowers or raw fruits and vegetables, and immediate reporting of fever above 38.3°C (101°F) once — fever may be the only sign of infection.",
          ],
          callout: {
            type: "nursing-alert",
            text: "A single temperature of 38.3°C (101°F) or 38.0°C sustained for an hour in a neutropenic patient is an emergency — notify the provider immediately and obtain cultures before antibiotics when ordered.",
          },
        },
        {
          heading: "Nursing Management",
          paragraphs: [
            "Monitor for early systemic signs: fever trends, tachycardia, tachypnea, hypotension, altered mentation, and rising white-cell counts. Obtain cultures before starting prescribed antibiotics, administer antimicrobials on schedule to maintain therapeutic levels, and teach patients to complete the full course even after symptoms resolve.",
          ],
        },
      ],
    },
    flashcards: [
      {
        id: "lib-ic-f1",
        front: "What is the single most effective way to break the chain of infection?",
        back: "Hand hygiene before and after every patient contact — even when gloves are worn.",
      },
      {
        id: "lib-ic-f2",
        front: "Which precautions are required for measles, tuberculosis, and varicella?",
        back: "Airborne precautions: negative-pressure room, N95 respirator, keep the door closed.",
      },
      {
        id: "lib-ic-f3",
        front: "A patient has influenza. Which mask, and within what distance?",
        back: "Droplet precautions: surgical mask when within 3 feet; private room; patient masks during transport.",
      },
      {
        id: "lib-ic-f4",
        front: "Why must C. difficile rooms use soap and water instead of alcohol sanitizer?",
        back: "Alcohol does not kill C. difficile spores; mechanical washing with soap and water removes them.",
      },
      {
        id: "lib-ic-f5",
        front: "Your neutropenic patient spikes a temperature of 38.4°C once. What do you do?",
        back: "Treat it as an emergency: notify the provider immediately and obtain ordered cultures before antibiotics.",
      },
      {
        id: "lib-ic-f6",
        front: "Name three sterile-field rules.",
        back: "Keep objects above the waist and in sight, keep the field dry, never turn your back; the outer 1-inch border counts as contaminated.",
      },
    ],
    cheatSheet: {
      tagline: "Match the precaution to the route — 60-second review.",
      blocks: [
        {
          title: "Chain (6 links)",
          points: ["Agent → Reservoir → Exit portal → Transmission → Entry portal → Host"],
        },
        {
          title: "Precautions",
          points: [
            "Contact: gown + gloves (MRSA, VRE, C. diff)",
            "Droplet: surgical mask < 3 ft (flu, pertussis)",
            "Airborne: N95 + negative pressure (measles, TB, varicella)",
          ],
        },
        {
          title: "Hand Hygiene",
          points: [
            "Before AND after every contact",
            "Soap + water for C. difficile and visible soiling",
            "Most-tested single intervention on the exam",
          ],
        },
        {
          title: "Neutropenic Red Flags",
          points: ["Fever ≥ 38.3°C once = emergency", "No fresh flowers or raw produce", "Cultures before antibiotics"],
        },
      ],
      mnemonic: {
        title: "Mnemonic",
        text: "Airborne trio 'MTV': Measles, TB, Varicella — think 'on MTV you need an N95 backstage pass.'",
      },
    },
  {
    id: "lib-vital-signs",
    subjectSlug: "fundamentals-of-nursing",
    title: "Vital Signs",
    slug: "vital-signs",
    description:
      "Measuring and interpreting temperature, pulse, respirations, blood pressure, oxygenation, and pain like a nurse.",
    difficulty: "Foundations",
    tags: ["assessment", "vital-signs", "monitoring", "fundamentals"],
    estimatedMinutes: 12,
    examSlug: "nclex-rn",
    relatedSlugs: ["infection-control"],
    quickNotes: {
      intro:
        "Know the adult ranges cold, then ask one question about every abnormal value: is the patient perfusing, oxygenating, and stable?",
      sections: [
        {
          heading: "Adult Normal Ranges",
          points: [
            "Temperature: 36.1–37.2°C (97–99°F); fever is generally above 38°C (100.4°F).",
            "Pulse: 60–100 beats/min, regular rhythm, full volume.",
            "Respirations: 12–20 breaths/min, unlabored, regular.",
            "Blood pressure: less than 120/80 mmHg; use the correct cuff size.",
            "Oxygen saturation: 95–100% on room air; pain is the fifth vital sign (0–10 scale).",
          ],
        },
        {
          heading: "Assessment Tips",
          points: [
            "Count respirations discreetly right after taking the pulse so the rate is not voluntarily altered.",
            "Seat the patient with feet flat, arm supported at heart level, after 5 minutes of rest before measuring BP.",
            "A cuff that is too small reads falsely high; a cuff that is too large reads falsely low.",
          ],
        },
        {
          heading: "Abnormal Patterns",
          points: [
            "Tachycardia + hypotension + tachypnea suggests shock or volume loss until proven otherwise.",
            "Fever with tachycardia and tachypnea suggests developing infection or sepsis.",
            "Bradypnea with pinpoint pupils suggests opioid effect; Cheyne-Stokes suggests end-stage or neurologic change.",
          ],
        },
        {
          heading: "Nursing Priorities",
          ordered: true,
          points: [
            "Re-check any unexpected value manually before acting — except in a crisis, where you assess and intervene together.",
            "Trend the numbers: one abnormal set is data, two in the same direction is a warning.",
            "Report systolic below 90, heart rate above 120 or below 50, respirations above 24, or SpO2 below 92% promptly.",
          ],
        },
      ],
      nclexFocus: [
        "Orthostatic hypotension = systolic drop of 20+ or diastolic drop of 10+ within 3 minutes of standing, with symptoms.",
        "Apical pulse for 1 full minute is required for infants, irregular rhythms, and before digoxin.",
        "Pain is whatever the patient says it is — always assess before medicating and reassess after.",
      ],
    },
    detailedNotes: {
      intro:
        "Vital signs are the earliest window into perfusion, oxygenation, and compensation. Expert nurses do not just record numbers — they compare, trend, and connect them to the patient's story.",
      sections: [
        {
          heading: "Overview",
          paragraphs: [
            "The six routinely assessed signs are temperature, pulse, respirations, blood pressure, oxygen saturation, and pain. Each reflects a different body system, but interpretation is always integrative: a single value rarely tells the story that the full set does.",
          ],
        },
        {
          heading: "Temperature",
          paragraphs: [
            "Core temperature reflects the balance between heat production and loss. Rectal readings run about 0.5°C higher than oral; axillary readings run about 0.5°C lower. Older adults may not mount a fever even with serious infection, so a subtle rise plus confusion deserves attention.",
          ],
        },
        {
          heading: "Pulse and Respirations",
          paragraphs: [
            "Assess rate, rhythm, and quality together. A thready pulse suggests poor perfusion; a bounding pulse suggests fluid overload or fever. Count an irregular pulse apically for one full minute, and assess respirations for effort — retractions, nasal flaring, and accessory-muscle use matter more than the number alone.",
          ],
          callout: {
            type: "key-concept",
            text: "Rate × rhythm × quality. A 'normal rate' with an irregular rhythm or thready quality is still an abnormal finding that needs follow-up.",
          },
        },
        {
          heading: "Blood Pressure",
          paragraphs: [
            "Systolic pressure reflects cardiac output; diastolic reflects peripheral resistance. Orthostatic measurements (lying, sitting, standing) detect volume depletion and autonomic dysfunction. In shock states, mean arterial pressure below 65 mmHg signals inadequate organ perfusion regardless of the systolic number.",
          ],
        },
        {
          heading: "Oxygenation and Pain",
          paragraphs: [
            "Pulse oximetry trends oxygenation, but cold extremities, anemia, nail polish, and motion can distort readings — correlate with the patient's work of breathing and mentation. Pain assessment uses a consistent scale, includes location, quality, timing, and relieving factors, and is always reassessed after intervention.",
          ],
          callout: {
            type: "nursing-alert",
            text: "Never rely on a reassuring SpO2 alone when the patient shows increased work of breathing, cyanosis, or confusion — treat the patient, then verify the probe.",
          },
        },
        {
          heading: "Delegation and Documentation",
          paragraphs: [
            "Stable, routine vital signs may be delegated to assistive personnel, but interpretation stays with the nurse. Document the full set with site, position, and circumstances (for example, 'BP 148/92 left arm sitting, rechecked manually'), and report trends, not just thresholds.",
          ],
        },
      ],
    },
    flashcards: [
      {
        id: "lib-vs-f1",
        front: "State the five adult vital-sign ranges (T, HR, RR, BP, SpO2).",
        back: "T 36.1–37.2°C, HR 60–100, RR 12–20, BP <120/80, SpO2 95–100%.",
      },
      {
        id: "lib-vs-f2",
        front: "What defines orthostatic hypotension?",
        back: "Systolic drop ≥ 20 or diastolic drop ≥ 10 mmHg within 3 minutes of standing, usually with dizziness.",
      },
      {
        id: "lib-vs-f3",
        front: "When must the pulse be counted apically for a full minute?",
        back: "Infants and children, irregular rhythms, and before giving digoxin (withhold if <60 in adults).",
      },
      {
        id: "lib-vs-f4",
        front: "A cuff that is too small gives what kind of error?",
        back: "Falsely HIGH reading. Too large a cuff reads falsely low.",
      },
      {
        id: "lib-vs-f5",
        front: "Which vital-sign cluster suggests shock?",
        back: "Tachycardia + hypotension + tachypnea, often with cool clammy skin and narrowing pulse pressure.",
      },
      {
        id: "lib-vs-f6",
        front: "What is the single most important rule of pain assessment?",
        back: "Pain is whatever the patient says it is — assess with a consistent scale and always reassess after intervening.",
      },
    ],
    cheatSheet: {
      tagline: "Ranges, red flags, and recheck rules — one minute.",
      blocks: [
        {
          title: "Adult Ranges",
          points: ["T 36.1–37.2°C · HR 60–100 · RR 12–20", "BP <120/80 · SpO2 95–100% · Pain 0–10"],
        },
        {
          title: "Report Promptly",
          points: ["SBP < 90 · HR > 120 or < 50", "RR > 24 · SpO2 < 92% · MAP < 65"],
        },
        {
          title: "Technique",
          points: [
            "Rest 5 min, feet flat, arm at heart level",
            "Small cuff = falsely high; large cuff = falsely low",
            "Count RR discreetly after the pulse",
          ],
        },
        {
          title: "Orthostatics",
          points: ["Lying → sitting → standing", "SBP ↓20 or DBP ↓10 within 3 min = positive", "Check for dizziness, not just numbers"],
        },
      ],
      mnemonic: {
        title: "Mnemonic",
        text: "'60-100, 12-20' — heart and lungs share the same decades: HR 60–100, RR 12–20.",
      },
    },
  {
    id: "lib-heart-failure",
    subjectSlug: "medical-surgical-nursing",
    title: "Heart Failure",
    slug: "heart-failure",
    description:
      "Left-sided versus right-sided failure, daily-weight monitoring, diuretics, and the perfusion-first nursing priorities.",
    difficulty: "Core",
    tags: ["cardiac", "heart-failure", "perfusion", "nclex", "prioritization"],
    estimatedMinutes: 20,
    examSlug: "nclex-rn",
    relatedSlugs: ["hypertension", "diuretics", "copd"],
    quickNotes: {
      intro:
        "Think perfusion first: every assessment and intervention protects cardiac output. Left = lungs, right = rest of the body.",
      sections: [
        {
          heading: "Definition",
          points: [
            "A clinical syndrome in which the heart cannot pump enough blood to meet the body's metabolic demands.",
            "Ejection fraction below 40% indicates systolic (HFrEF) failure; preserved EF with stiff ventricles indicates diastolic (HFpEF) failure.",
          ],
        },
        {
          heading: "Left-Sided Signs",
          points: ["Dyspnea, orthopnea, paroxysmal nocturnal dyspnea", "Pulmonary crackles, cough with frothy sputum", "Fatigue and decreased activity tolerance"],
        },
        {
          heading: "Right-Sided Signs",
          points: ["Jugular vein distention (JVD)", "Dependent edema and rapid weight gain", "Hepatomegaly, ascites, right-upper-quadrant pain"],
        },
        {
          heading: "Diagnosis",
          points: ["BNP rises with ventricular stretch; echocardiogram confirms EF", "Chest X-ray shows pulmonary congestion; daily weights track fluid status", "Assess I&O, lung sounds, edema grade, and electrolytes (especially potassium)"],
        },
        {
          heading: "Management",
          points: ["ACE inhibitors, beta blockers, and diuretics are the core regimen; digoxin adds contractility with toxicity risk", "Sodium restriction (often 2 g/day) and fluid restriction as prescribed", "High Fowler's position, oxygen for hypoxia, activity as tolerated with rest periods"],
        },
        {
          heading: "Nursing Priorities",
          ordered: true,
          points: [
            "Weigh daily at the same time, same scale, same clothing — the best indicator of fluid status.",
            "Report a gain of 2–3 lb in 24 hours or 5 lb in a week immediately.",
            "Monitor potassium closely: diuretics waste it, ACE inhibitors retain it, and digoxin turns dangerous when it falls.",
          ],
        },
      ],
      nclexFocus: [
        "Airway and perfusion come before calling the provider: assess first, then intervene.",
        "High Fowler's eases breathing in pulmonary edema; never lay these patients flat.",
        "Digoxin toxicity: anorexia, nausea, vision changes (yellow-green halos); hold for pulse below 60.",
      ],
    },
    detailedNotes: {
      intro:
        "Heart failure is among the most tested topics on the exam because it fuses assessment, pharmacology, prioritization, and teaching into a single patient story. Master the left/right distinction and the weight-monitoring routine, and most questions answer themselves.",
      sections: [
        {
          heading: "Overview",
          paragraphs: [
            "Heart failure is not a disease but the common endpoint of many cardiac disorders — coronary disease, hypertension, valve disease, and cardiomyopathies. Prevalence rises with age, and exacerbations are frequently triggered by dietary indiscretion, missed medications, infection, or arrhythmias.",
          ],
        },
        {
          heading: "Etiology and Risk Factors",
          paragraphs: [
            "Chronic hypertension and coronary artery disease cause most cases. Additional risks include diabetes, obesity, sleep apnea, heavy alcohol use, cardiotoxic drugs, and a family history of cardiomyopathy. Nurses target modifiable risks at every encounter.",
          ],
        },
        {
          heading: "Pathophysiology",
          paragraphs: [
            "Left-sided failure lets pressure back up into the pulmonary circulation: fluid leaks into alveoli and gas exchange falls. Right-sided failure backs pressure into the systemic veins: the liver congests, the gut swells, and dependent tissues collect fluid. Most patients eventually show both sides, but one side usually dominates the presentation.",
          ],
          callout: {
            type: "key-concept",
            text: "Left = LUNGS (crackles, cough, dyspnea). Right = REST OF BODY (JVD, edema, ascites). Say it until it is automatic.",
          },
        },
        {
          heading: "Clinical Manifestations",
          paragraphs: [
            "Early signs are subtle: exertional dyspnea, new nocturia, and needing an extra pillow. Late signs declare themselves: pink frothy sputum, severe orthopnea, anasarca, and confusion from poor cerebral perfusion. Nocturia occurs because recumbency returns edema fluid to the circulation at night.",
          ],
        },
        {
          heading: "Diagnostics",
          paragraphs: [
            "BNP above 100 pg/mL supports the diagnosis and tracks severity. Echocardiography measures ejection fraction and valve function. Chest X-ray reveals cardiomegaly and pulmonary edema; ECG and electrolytes screen for ischemic triggers and arrhythmia risk from potassium shifts.",
          ],
        },
        {
          heading: "Medical and Pharmacologic Management",
          paragraphs: [
            "ACE inhibitors reduce afterload and remodeling; beta blockers protect the tired myocardium; loop diuretics relieve congestion. Digoxin strengthens contraction but has a narrow therapeutic window (0.5–2.0 ng/mL). Newer agents such as ARNIs and SGLT2 inhibitors increasingly appear in guidelines — know their purpose even if dosing details stay with the prescriber.",
          ],
          callout: {
            type: "medications",
            text: "Digoxin: check apical pulse for 1 full minute, hold below 60, and watch for toxicity (anorexia, nausea, blurred or yellow-green vision) — especially when potassium is low.",
          },
        },
        {
          heading: "Nursing Management",
          paragraphs: [
            "Position in high Fowler's, administer oxygen for saturation below target, enforce sodium and fluid limits, and cluster care to conserve energy. Teach the 'zone' system many clinics use: green (stable weights, no new symptoms), yellow (2–3 lb gain, more swelling, call the clinic), red (severe breathlessness, chest pain, confusion — emergency care).",
          ],
          callout: {
            type: "nursing-alert",
            text: "Daily weights are the single best indicator of fluid status. A 2–3 lb gain in 24 hours or 5 lb in a week must be reported the same day.",
          },
        },
        {
          heading: "Patient Education",
          paragraphs: [
            "Discharge teaching covers medications (purpose plus potassium effects), a written weight-and-symptom diary, sodium literacy (bread, soup, and processed meats hide most of it), fluid limits, smoking cessation, annual influenza and pneumococcal vaccines, and exactly when to call versus when to go to the emergency department.",
          ],
        },
      ],
    },
    flashcards: [
      {
        id: "lib-hf-f1",
        front: "Contrast left-sided and right-sided heart failure in one sentence each.",
        back: "Left: pressure backs into the lungs (dyspnea, crackles, frothy sputum). Right: pressure backs into the body (JVD, edema, ascites).",
      },
      {
        id: "lib-hf-f2",
        front: "What is the single best indicator of fluid status, and which gain must be reported?",
        back: "Daily weights — report 2–3 lb in 24 hours or 5 lb in a week.",
      },
      {
        id: "lib-hf-f3",
        front: "List three signs of digoxin toxicity and the hold parameter.",
        back: "Anorexia/nausea, vision changes (halos), confusion; hold for apical pulse below 60 and notify the provider.",
      },
      {
        id: "lib-hf-f4",
        front: "Why is the patient positioned in high Fowler's during pulmonary edema?",
        back: "Upright positioning pools blood in the lower body, reduces venous return and preload, and maximizes lung expansion.",
      },
      {
        id: "lib-hf-f5",
        front: "Why is potassium monitored so closely in heart failure?",
        back: "Loop diuretics waste potassium while ACE inhibitors retain it — and low potassium dramatically raises digoxin toxicity risk.",
      },
      {
        id: "lib-hf-f6",
        front: "What does paroxysmal nocturnal dyspnea tell you?",
        back: "Left-sided failure: recumbency redistributes edema fluid into the pulmonary circulation, waking the patient gasping 1–2 hours after sleep.",
      },
    ],
    cheatSheet: {
      tagline: "Left versus right, weights, and meds — 90 seconds.",
      blocks: [
        {
          title: "Left-Sided",
          points: ["Dyspnea · orthopnea · PND", "Crackles · frothy cough", "Fatigue · low output"],
        },
        {
          title: "Right-Sided",
          points: ["JVD · dependent edema", "Weight gain · ascites", "Hepatomegaly · RUQ pain"],
        },
        {
          title: "Priorities",
          points: ["Daily weights (same time/scale/clothes)", "2–3 lb/24 h or 5 lb/week → report", "High Fowler's · O2 · I&O · K+"],
        },
        {
          title: "Meds",
          points: ["ACE-I + beta blocker + loop diuretic", "Digoxin: pulse <60 hold; watch vision/GI signs", "2 g sodium diet · fluid limits"],
        },
      ],
      mnemonic: {
        title: "Mnemonic",
        text: "'LEFT = LUNGS, RIGHT = REST' — and 'weight WAIT': never wait on a 2–3 lb overnight gain.",
      },
    },
    // __MORE_TOPICS__
  },
];
