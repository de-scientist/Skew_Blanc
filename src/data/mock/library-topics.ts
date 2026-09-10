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
  },
  {
    id: "lib-hypertension",
    subjectSlug: "medical-surgical-nursing",
    title: "Hypertension",
    slug: "hypertension",
    description:
      "Silent-killer fundamentals: accurate measurement, staging, first-line drugs, lifestyle change, and hypertensive crisis.",
    difficulty: "Core",
    tags: ["cardiac", "hypertension", "blood-pressure", "nclex"],
    estimatedMinutes: 15,
    examSlug: "nclex-rn",
    relatedSlugs: ["heart-failure", "diabetes-mellitus", "ace-inhibitors"],
    quickNotes: {
      intro:
        "Hypertension is usually silent until it injures something — so questions focus on correct measurement, staging numbers, and crisis recognition.",
      sections: [
        {
          heading: "Definition",
          points: [
            "Hypertension is sustained elevation: normal below 120/80, elevated 120–129/<80, stage 1 at 130/80+, stage 2 at 140/90+.",
            "Primary (essential) hypertension has no single cause; secondary hypertension stems from renal disease, endocrine disorders, drugs, or coarctation.",
          ],
        },
        {
          heading: "Risk Factors",
          points: ["Non-modifiable: age, family history, ethnicity", "Modifiable: obesity, high sodium intake, inactivity, alcohol, tobacco, chronic stress, NSAID or decongestant use"],
        },
        {
          heading: "Signs and Symptoms",
          points: [
            "Usually NONE — that is why it is called the silent killer; severe cases may show headache, visual changes, or chest discomfort.",
            "Hypertensive crisis (above 180/120) with organ-damage signs — chest pain, neuro deficits, acute kidney injury — is an emergency.",
          ],
        },
        {
          heading: "Diagnosis",
          points: [
            "Confirm with correctly sized cuff, seated after 5 minutes rest, feet flat, arm at heart level — average two or more visits.",
            "Workup screens for secondary causes and existing damage: urinalysis, creatinine, ECG, lipids, and eye exam.",
          ],
        },
        {
          heading: "Management",
          points: [
            "Lifestyle first: DASH diet, sodium below ~2.3 g/day, 150 min/week activity, weight loss, smoking cessation, limited alcohol.",
            "Thiazide diuretics are first-line for most adults; ACE inhibitors, ARBs, and calcium-channel blockers follow by comorbidity.",
          ],
        },
        {
          heading: "Nursing Priorities",
          ordered: true,
          points: [
            "Teach that feeling fine does not mean controlled — adherence matters precisely because there are no symptoms.",
            "Monitor for orthostatics after starting or titrating therapy, especially in older adults.",
            "Distinguish urgency (very high numbers, no organ damage — adjust meds urgently) from emergency (organ damage — lower pressure in a monitored setting).",
          ],
        },
      ],
      nclexFocus: [
        "Crisis numbers: above 180 systolic or 120 diastolic — with organ-damage signs it is an emergency.",
        "Thiazides first-line; monitor potassium, hydration, and uric acid (gout risk).",
        "NSAIDs, decongestants, and excess alcohol raise blood pressure — reconcile them on every medication review.",
      ],
    },
    detailedNotes: {
      intro:
        "Nearly half of adults have hypertension and most do not know it. Nursing care centers on detection, adherence coaching, and recognizing the moment high numbers become dangerous.",
      sections: [
        {
          heading: "Overview",
          paragraphs: [
            "Sustained pressure injures arteries, heart, brain, kidneys, and eyes over years. Because early disease is silent, the nurse's highest-value actions are accurate screening and convincing asymptomatic patients that treatment matters.",
          ],
        },
        {
          heading: "Classification",
          paragraphs: [
            "Use this quick reference when staging readings:",
            "| Category | Systolic | Diastolic |",
            "| --- | --- | --- |",
            "| Normal | < 120 | < 80 |",
            "| Elevated | 120–129 | < 80 |",
            "| Stage 1 | 130–139 | 80–89 |",
            "| Stage 2 | ≥ 140 | ≥ 90 |",
            "| Crisis | > 180 | > 120 |",
            "Stage from the higher of the two numbers, and confirm elevation across visits before labeling a patient hypertensive.",
          ],
        },
        {
          heading: "Etiology and Risk Factors",
          paragraphs: [
            "Primary hypertension reflects interacting genetics, age-related arterial stiffness, and lifestyle load. Secondary causes — chronic kidney disease, primary aldosteronism, sleep apnea, thyroid disease, and drugs such as NSAIDs, steroids, and stimulants — should be suspected with sudden, severe, or treatment-resistant elevation in younger patients.",
          ],
        },
        {
          heading: "Assessment",
          paragraphs: [
            "Beyond the numbers, assess fundi, heart sounds, peripheral pulses, edema, weight trends, and kidney function. Ask about headaches, visual changes, chest discomfort, snoring, medication adherence, over-the-counter drugs, alcohol, and home readings technique.",
          ],
        },
        {
          heading: "Lifestyle Management",
          paragraphs: [
            "DASH eating (fruits, vegetables, whole grains, low-fat dairy), sodium moderation, regular aerobic activity, weight control, smoking cessation, and sleep-apnea treatment each lower pressure — and together they reduce drug burden. Set one concrete, measurable goal per visit rather than a lecture.",
          ],
        },
        {
          heading: "Pharmacologic Management",
          paragraphs: [
            "Thiazide diuretics suit most uncomplicated patients; ACE inhibitors or ARBs are preferred with diabetes, kidney disease, or heart failure; calcium-channel blockers work well across ages. Most stage 2 patients need two agents. Teach orthostatic precautions, potassium effects, and never stopping beta blockers abruptly (rebound hypertension and ischemia risk).",
          ],
          callout: {
            type: "medications",
            text: "Stopping clonidine or beta blockers suddenly can trigger rebound hypertensive crisis. Taper only under prescriber direction and warn patients explicitly.",
          },
        },
        {
          heading: "Hypertensive Crisis",
          paragraphs: [
            "Urgency: numbers above 180/120 WITHOUT acute organ damage — arrange same-day medication adjustment and close follow-up. Emergency: the same numbers WITH chest pain, neuro changes, pulmonary edema, or kidney injury — rapid, controlled lowering in a monitored setting, because dropping pressure too fast can infarct brain or heart.",
          ],
          callout: {
            type: "nursing-alert",
            text: "Above 180/120 with chest pain, confusion, visual loss, or severe headache = emergency department now. Without organ-damage signs = urgent same-day follow-up.",
          },
        },
      ],
    },
    flashcards: [
      {
        id: "lib-htn-f1",
        front: "State the five BP categories with numbers.",
        back: "Normal <120/80 · Elevated 120–129/<80 · Stage 1 130–139/80–89 · Stage 2 ≥140/90 · Crisis >180/120.",
      },
      {
        id: "lib-htn-f2",
        front: "What distinguishes hypertensive emergency from urgency?",
        back: "Emergency has acute organ damage (chest pain, neuro changes, AKI, pulmonary edema); urgency has severe numbers without it.",
      },
      {
        id: "lib-htn-f3",
        front: "Which drug class is first-line for most uncomplicated hypertension?",
        back: "Thiazide diuretics — monitor potassium, hydration, glucose, and uric acid.",
      },
      {
        id: "lib-htn-f4",
        front: "Name three drugs or substances that raise blood pressure.",
        back: "NSAIDs, decongestants (pseudoephedrine), steroids, stimulants, and excess alcohol.",
      },
      {
        id: "lib-htn-f5",
        front: "What is the core DASH teaching in one sentence?",
        back: "Fruits, vegetables, whole grains, and low-fat dairy with limited sodium — plus activity, weight control, and no tobacco.",
      },
      {
        id: "lib-htn-f6",
        front: "Why must beta blockers and clonidine never be stopped abruptly?",
        back: "Rebound sympathetic surge can cause hypertensive crisis and myocardial ischemia — taper only as prescribed.",
      },
    ],
    cheatSheet: {
      tagline: "Numbers, first-line drugs, and crisis rules — 60 seconds.",
      blocks: [
        {
          title: "Numbers",
          points: ["<120/80 normal · 130/80 stage 1 · 140/90 stage 2", ">180/120 = crisis — check for organ damage"],
        },
        {
          title: "First-Line",
          points: ["Thiazides for most · ACE/ARB with DM, CKD, HF", "CCBs across ages · never stop BB/clonidine abruptly"],
        },
        {
          title: "Crisis",
          points: ["Organ damage → emergency (monitored lowering)", "No damage → urgent meds adjustment + follow-up"],
        },
        {
          title: "Lifestyle",
          points: ["DASH · Na+ ~2.3 g · 150 min activity/week", "Weight · tobacco · alcohol · sleep apnea"],
        },
      ],
      mnemonic: {
        title: "Mnemonic",
        text: "'120-130-140-180': normal, stage 1, stage 2, crisis — one ladder, four rungs.",
      },
    },
  },
  {
    id: "lib-diabetes",
    subjectSlug: "medical-surgical-nursing",
    title: "Diabetes Mellitus",
    slug: "diabetes-mellitus",
    description:
      "Type 1 versus type 2, insulin peaks, the 15-15 rule, and telling DKA apart from HHS under pressure.",
    difficulty: "Core",
    tags: ["endocrine", "diabetes", "insulin", "nclex"],
    estimatedMinutes: 18,
    examSlug: "nclex-rn",
    relatedSlugs: ["hypertension", "heart-failure"],
    quickNotes: {
      intro:
        "Half the questions compare two things: type 1 vs type 2, hypo vs hyper, DKA vs HHS. Learn the pairs and the numbers follow.",
      sections: [
        {
          heading: "Type 1 vs Type 2",
          points: [
            "Type 1: autoimmune beta-cell destruction, absolute insulin lack, younger onset, DKA-prone — always needs insulin.",
            "Type 2: insulin resistance with relative lack, adult onset strongly tied to obesity — metformin first, insulin often later.",
          ],
        },
        {
          heading: "Classic Signs",
          points: ["The 3 Ps: polyuria, polydipsia, polyphagia — plus fatigue, blurred vision, slow wound healing", "Type 1 may present in DKA; type 2 is often found on routine labs"],
        },
        {
          heading: "Diagnosis",
          points: ["A1C ≥ 6.5%, fasting glucose ≥ 126 mg/dL, or random ≥ 200 with symptoms (confirmed on repeat)", "Target A1C is generally below 7% for most adults; tighter or looser by age and comorbidity"],
        },
        {
          heading: "Hypoglycemia",
          points: [
            "Cold, clammy, confused, combative — give 15 g fast carbs, recheck in 15 min, repeat (the 15-15 rule).",
            "Unconscious or NPO: glucagon IM or IV dextrose per protocol — never pour liquids into an unconscious mouth.",
          ],
        },
        {
          heading: "Management",
          points: [
            "Insulin: rapid (lispro) peaks ~1 h, regular peaks 2–4 h, NPH peaks 4–12 h, glargine has no peak — match meals to peaks.",
            "Metformin first-line for type 2 (hold around contrast procedures); foot care, sick-day rules, and vaccines complete the plan.",
          ],
        },
        {
          heading: "Nursing Priorities",
          ordered: true,
          points: [
            "Treat hypoglycemia first — the brain runs on glucose and symptoms escalate in minutes.",
            "Never give rapid-acting insulin unless the patient is about to eat.",
            "Teach foot inspection, never walking barefoot, and when high readings plus illness mean calling for help.",
          ],
        },
      ],
      nclexFocus: [
        "15-15 rule for conscious hypoglycemia; glucagon or IV dextrose when unconscious.",
        "DKA = type 1, fruity breath, Kussmaul respirations; HHS = type 2, extreme hyperglycemia and dehydration without ketosis.",
        "Hold metformin around iodinated contrast (lactic acidosis risk) per prescriber direction.",
      ],
    },
    detailedNotes: {
      intro:
        "Diabetes touches every body system, which is why it threads through cardiac, renal, wound, and infection questions. Anchor on insulin action curves and the hypoglycemia response and the rest becomes organized detail.",
      sections: [
        {
          heading: "Overview",
          paragraphs: [
            "Diabetes mellitus is chronic hyperglycemia from insulin deficiency, resistance, or both. Acute dangers (hypoglycemia, DKA, HHS) kill quickly; chronic hyperglycemia blinds, disables kidneys, amputates limbs, and hardens arteries over years.",
          ],
        },
        {
          heading: "Type 1 vs Type 2",
          paragraphs: [
            "Type 1 destroys beta cells outright — onset is often abrupt in youth with weight loss and DKA risk, and survival requires lifelong insulin. Type 2 pairs resistance with gradual beta-cell fatigue — onset is silent in midlife, strongly linked to adiposity and inactivity, and early disease may reverse partially with weight loss and activity.",
          ],
        },
        {
          heading: "Clinical Manifestations",
          paragraphs: [
            "Osmotic diuresis drives the 3 Ps and dehydration; blurred vision comes from lens swelling; recurrent infections and slow healing reflect impaired immunity and perfusion. Long-term: retinopathy, nephropathy (microalbuminuria first), peripheral and autonomic neuropathy, and accelerated atherosclerosis.",
          ],
        },
        {
          heading: "Insulin Therapy",
          paragraphs: [
            "Match insulin peaks to meals: rapid-acting (lispro, aspart) onsets in ~15 min and peaks near 1 hour; regular onsets in 30–60 min and peaks at 2–4 hours; NPH peaks at 4–12 hours (cloudy, roll to mix); glargine and detemir provide peakless basal coverage. Only regular insulin goes IV.",
          ],
          callout: {
            type: "medications",
            text: "Peak = hypoglycemia danger window. A patient on morning NPH is most vulnerable mid-afternoon — schedule meals and activity around it.",
          },
        },
        {
          heading: "Oral and Injectable Agents",
          paragraphs: [
            "Metformin (first-line type 2) lowers hepatic glucose output without causing hypoglycemia alone — hold around contrast studies because of lactic acidosis risk with renal compromise. Sulfonylureas push insulin release (hypoglycemia risk, take with meals); SGLT2 inhibitors spill glucose in urine (genital infection and dehydration cautions); GLP-1 agents slow gastric emptying and aid weight loss.",
          ],
        },
        {
          heading: "Hypoglycemia and the 15-15 Rule",
          paragraphs: [
            "Shakiness, sweating, pallor, confusion, and combativeness signal neuroglycopenia. The conscious patient gets 15 g of fast carbohydrate (glucose tablets, juice, regular soda — not chocolate or cheese), a recheck in 15 minutes, and repetition until above 70 mg/dL, followed by a snack or meal. The unconscious patient gets glucagon or IV dextrose — never oral intake.",
          ],
          callout: {
            type: "nursing-alert",
            text: "Cold and clammy = give candy (hypoglycemia). Hot and dry = sugar high (hyperglycemia). When in doubt and the patient is conscious with low readings, treat the low — it kills faster.",
          },
        },
        {
          heading: "DKA vs HHS",
          paragraphs: [
            "DKA strikes type 1 patients with insulin lack: glucose above ~250, ketones, fruity breath, Kussmaul respirations, and metabolic acidosis — treat with fluids, IV regular insulin, and aggressive potassium replacement as insulin drives K+ into cells. HHS strikes type 2 patients: glucose often above 600 with profound dehydration and altered mentation but minimal ketosis — fluids dominate resuscitation.",
          ],
        },
        {
          heading: "Ongoing Nursing Management",
          paragraphs: [
            "Daily foot inspection, well-fitting shoes, no barefoot walking, and prompt blister care prevent amputations. Sick-day rules (never stop basal insulin, check ketones, stay hydrated, know call thresholds), hypoglycemia action plans for the household, and annual eye, kidney, vaccine, and dental reviews complete the safety net.",
          ],
        },
      ],
    },
    flashcards: [
      {
        id: "lib-dm-f1",
        front: "State the 3 Ps and what causes them.",
        back: "Polyuria, polydipsia, polyphagia — osmotic diuresis from hyperglycemia dehydrates the patient and starves cells.",
      },
      {
        id: "lib-dm-f2",
        front: "Recite the 15-15 rule and its exception.",
        back: "15 g fast carbs, recheck in 15 min, repeat until >70, then a snack. Exception: unconscious/NPO → glucagon or IV dextrose, never oral.",
      },
      {
        id: "lib-dm-f3",
        front: "Contrast DKA and HHS in one breath.",
        back: "DKA: type 1, ketones + fruity breath + Kussmaul + acidosis. HHS: type 2, glucose >600, profound dehydration, minimal ketones.",
      },
      {
        id: "lib-dm-f4",
        front: "When do rapid-acting, regular, NPH, and glargine insulins peak?",
        back: "Rapid ~1 h · Regular 2–4 h · NPH 4–12 h · Glargine peakless. Only regular goes IV.",
      },
      {
        id: "lib-dm-f5",
        front: "Why is metformin held around contrast procedures?",
        back: "Contrast can impair kidneys; metformin plus renal compromise risks lactic acidosis — hold per prescriber direction.",
      },
      {
        id: "lib-dm-f6",
        front: "What are the diabetes diagnostic thresholds?",
        back: "A1C ≥ 6.5%, fasting ≥ 126, or random ≥ 200 with symptoms — confirmed on repeat testing.",
      },
    ],
    cheatSheet: {
      tagline: "Pairs and peaks — the whole topic in one minute.",
      blocks: [
        {
          title: "T1 vs T2",
          points: ["T1: no insulin made → always needs it → DKA risk", "T2: resistant → metformin first → HHS risk"],
        },
        {
          title: "Hypo Action",
          points: ["Conscious: 15-15 rule with fast carbs", "Unconscious: glucagon / IV dextrose, nothing by mouth"],
        },
        {
          title: "Insulin Peaks",
          points: ["Rapid ~1 h · Regular 2–4 h (only IV one)", "NPH 4–12 h (cloudy) · Glargine peakless"],
        },
        {
          title: "DKA vs HHS",
          points: ["DKA: fruity + Kussmaul + acidotic", "HHS: >600 + dry + confused, few ketones"],
        },
      ],
      mnemonic: {
        title: "Mnemonic",
        text: "'Cold-clammy-candy, hot-dry-high' — temperature and moisture of the skin point to hypo versus hyper.",
      },
    },
  },
  {
    id: "lib-copd",
    subjectSlug: "medical-surgical-nursing",
    title: "COPD",
    slug: "copd",
    description:
      "Chronic bronchitis versus emphysema, the 88–92% oxygen rule, inhaler sequencing, and exacerbation rescue.",
    difficulty: "Core",
    tags: ["respiratory", "copd", "oxygen", "nclex"],
    estimatedMinutes: 15,
    examSlug: "nclex-rn",
    relatedSlugs: ["heart-failure", "infection-control"],
    quickNotes: {
      intro:
        "COPD questions hinge on airflow limitation that does not fully reverse — and on oxygen handled differently than in most patients.",
      sections: [
        {
          heading: "Definition",
          points: [
            "COPD is persistent, usually progressive airflow limitation from chronic bronchitis (productive cough ≥ 3 months/year for 2 years) and emphysema (alveolar destruction).",
            "Smoking is the dominant cause; alpha-1 antitrypsin deficiency causes early-onset disease.",
          ],
        },
        {
          heading: "Signs and Symptoms",
          points: [
            "Chronic productive cough, exertional dyspnea progressing to rest dyspnea, wheezing, and prolonged expiration.",
            "Barrel chest from air trapping, pursed-lip and tripod positioning, accessory-muscle use, and eventual cor pulmonale (right-sided failure).",
          ],
        },
        {
          heading: "Diagnosis",
          points: [
            "Spirometry confirms: FEV1/FVC ratio below 0.70 with limited reversibility.",
            "ABGs show CO2 retention in advanced disease; chest X-ray shows hyperinflation and flattened diaphragms.",
          ],
        },
        {
          heading: "Management",
          points: [
            "Smoking cessation is the only intervention that slows decline; influenza, pneumococcal, and RSV vaccines prevent exacerbations.",
            "Bronchodilators (SABA rescue, LABA/LAMA maintenance), inhaled steroids for frequent exacerbators, pulmonary rehab, and controlled oxygen.",
            "Breathing retraining: pursed-lip exhalation, diaphragmatic breathing, energy conservation with rest breaks.",
          ],
        },
        {
          heading: "Nursing Priorities",
          ordered: true,
          points: [
            "Titrate oxygen to 88–92% — high flows can blunt the hypoxic drive of chronic CO2 retainers.",
            "Give bronchodilator before steroid inhaler, and teach mouth-rinsing after steroids to prevent thrush.",
            "Treat exacerbations early: more dyspnea, more sputum, or color change means same-day evaluation.",
          ],
        },
      ],
      nclexFocus: [
        "Target SpO2 88–92% (not 95%+) for COPD with CO2 retention; 1–2 L nasal cannula is the classic order.",
        "Blue bloaters (bronchitis: cyanotic, edematous) vs pink puffers (emphysema: thin, pursed-lip) is favorite comparison material.",
        "Encourage fluids to thin secretions unless contraindicated; avoid sedatives that depress respiratory drive.",
      ],
    },
    detailedNotes: {
      intro:
        "COPD traps air, flattens diaphragms, and remodels pulmonary vessels — so patients work harder for every breath while retaining CO2. Nursing care balances oxygenation against drive, secretions against hydration, and activity against exhaustion.",
      sections: [
        {
          heading: "Overview",
          paragraphs: [
            "COPD affects hundreds of millions worldwide and remains a leading cause of death. Exacerbations — usually viral or bacterial — accelerate decline, so prevention (vaccines, smoking cessation, action plans) carries as much weight as daily therapy.",
          ],
        },
        {
          heading: "Chronic Bronchitis vs Emphysema",
          paragraphs: [
            "Bronchitis inflames airways and overproduces mucus: the 'blue bloater' is cyanotic, edematous, and coughs constantly. Emphysema destroys alveolar walls and elastic recoil: the 'pink puffer' is thin, barrel-chested, and breathes through pursed lips with minimal cough. Most patients have both in varying proportion.",
          ],
        },
        {
          heading: "Pathophysiology",
          paragraphs: [
            "Narrowed airways and lost recoil trap air on exhalation, flattening the diaphragm into a weak position and raising the work of breathing. Chronic hypoxia constricts pulmonary vessels, straining the right heart into cor pulmonale. Long-standing CO2 retention resets the respiratory center to respond to hypoxia instead of hypercapnia — the hypoxic drive.",
          ],
          callout: {
            type: "key-concept",
            text: "Hypoxic drive is why COPD oxygen differs: flood a chronic retainer with oxygen and the brain may simply stop signaling breaths. Titrate, don't blast.",
          },
        },
        {
          heading: "Assessment",
          paragraphs: [
            "Track dyspnea scales, sputum volume and color, weight (steroid and inactivity effects), barrel-chest progression, and edema or JVD suggesting cor pulmonale. Listen for diminished sounds and wheezes, and watch the clock: pursed-lip tripod posture at rest means severe disease.",
          ],
        },
        {
          heading: "Oxygen Therapy",
          paragraphs: [
            "Deliver the lowest flow that holds saturation at 88–92% for CO2 retainers — typically 1–2 L by nasal cannula. Monitor mentation and ABGs after changes: rising drowsiness with climbing CO2 means backing oxygen down and notifying the provider. Venturi masks give precise fractions when control matters.",
          ],
          callout: {
            type: "nursing-alert",
            text: "New confusion or somnolence after increasing oxygen in COPD = possible CO2 narcosis. Recheck gases, reduce flow per orders, and escalate — do not just add more oxygen.",
          },
        },
        {
          heading: "Pharmacologic Management",
          paragraphs: [
            "Short-acting bronchodilators rescue acute tightness; long-acting agents plus inhaled steroids maintain the stable patient. Sequence matters: bronchodilator first to open airways, steroid second, with mouth-rinsing after steroids. Theophylline has a narrow window with drug interactions; systemic steroids are burst-limited by glucose, mood, and bone effects.",
          ],
        },
        {
          heading: "Rehabilitation and Exacerbations",
          paragraphs: [
            "Pulmonary rehab pairs exercise with breathing retraining: diaphragmatic breathing, pursed-lip exhalation twice as long as inhalation, paced activities with rest breaks, and humidified air plus hydration to mobilize secretions. Written action plans define the patient's personal red zone — increased dyspnea, sputum change, or fever — triggering steroids, antibiotics, or urgent evaluation per standing orders.",
          ],
        },
      ],
    },
    flashcards: [
      {
        id: "lib-copd-f1",
        front: "What spirometry finding confirms COPD?",
        back: "FEV1/FVC ratio below 0.70 with limited bronchodilator reversibility.",
      },
      {
        id: "lib-copd-f2",
        front: "What is the oxygen saturation target for a CO2-retaining COPD patient, and why?",
        back: "88–92%: higher flows can blunt the hypoxic drive and worsen CO2 narcosis.",
      },
      {
        id: "lib-copd-f3",
        front: "Contrast 'blue bloaters' and 'pink puffers.'",
        back: "Blue bloaters (bronchitis): cyanotic, edematous, chronic productive cough. Pink puffers (emphysema): thin, barrel chest, pursed-lip, little cough.",
      },
      {
        id: "lib-copd-f4",
        front: "In what order are bronchodilator and steroid inhalers given, and what follows steroids?",
        back: "Bronchodilator first, steroid second, then rinse the mouth to prevent oral thrush.",
      },
      {
        id: "lib-copd-f5",
        front: "Which single intervention slows COPD progression?",
        back: "Smoking cessation — nothing else changes the rate of decline.",
      },
      {
        id: "lib-copd-f6",
        front: "What three changes define a COPD exacerbation red zone?",
        back: "More dyspnea, more sputum, or sputum color change (plus fever) — triggers same-day evaluation per the action plan.",
      },
    ],
    cheatSheet: {
      tagline: "Two diseases, one oxygen rule — 60 seconds.",
      blocks: [
        {
          title: "Bronchitis vs Emphysema",
          points: ["Blue bloater: cough + cyanosis + edema", "Pink puffer: thin + barrel chest + pursed-lip"],
        },
        {
          title: "Oxygen Rule",
          points: ["Target 88–92% for retainers", "1–2 L NC typical · drowsiness = check CO2"],
        },
        {
          title: "Inhalers",
          points: ["Rescue SABA first · maintenance second", "Steroid last + rinse mouth", "Sequence: open, then coat"],
        },
        {
          title: "Prevention",
          points: ["Stop smoking · flu + pneumococcal vaccines", "Rehab + pursed-lip + fluids (if allowed)"],
        },
      ],
      mnemonic: {
        title: "Mnemonic",
        text: "'COPD COPES with less O2': Chronic, Obstructive, Pursed-lip, Eighty-eight to ninety-two, Exacerbation plan, Smoking cessation.",
      },
    },
  },
  {
    id: "lib-diuretics",
    subjectSlug: "pharmacology",
    title: "Diuretics",
    slug: "diuretics",
    description:
      "Loop, thiazide, potassium-sparing, and osmotic diuretics: what each wastes or keeps, and what to monitor.",
    difficulty: "Core",
    tags: ["pharmacology", "diuretics", "electrolytes", "cardiac", "nclex"],
    estimatedMinutes: 15,
    examSlug: "nclex-rn",
    relatedSlugs: ["ace-inhibitors", "heart-failure", "hypertension"],
    quickNotes: {
      intro:
        "Every diuretic question is really an electrolyte question: know what each class dumps, what it keeps, and which labs prove it.",
      sections: [
        {
          heading: "Classes",
          points: [
            "Loop (furosemide, bumetanide): strongest, work in the ascending loop — dump K+, Na+, water; risk ototoxicity.",
            "Thiazide (hydrochlorothiazide, chlorthalidone): first-line hypertension, milder — dump K+, raise glucose and uric acid.",
            "Potassium-sparing (spironolactone, triamterene): weak diuresis but KEEP potassium — risk hyperkalemia.",
            "Osmotic (mannitol IV): pulls water from tissues — used for cerebral edema and intraocular pressure.",
          ],
        },
        {
          heading: "Uses",
          points: ["Heart failure congestion, hypertension, edema states, hyperkalemia (loops + thiazides)", "Mannitol for raised intracranial pressure; acetazolamide for altitude and glaucoma (niche but tested)"],
        },
        {
          heading: "Side Effects",
          points: [
            "Loops + thiazides: hypokalemia, hyponatremia, dehydration, hypotension, orthostatics.",
            "Loops: ototoxicity (worse with rapid IV push and aminoglycosides). Thiazides: hyperglycemia, gout flares.",
            "Spironolactone: hyperkalemia plus gynecomastia and menstrual changes.",
          ],
        },
        {
          heading: "Monitoring",
          points: [
            "Daily weights, strict I&O, orthostatic vitals, and potassium/magnesium before the next dose decision.",
            "Rising BUN/creatinine signals over-diuresis and prerenal injury — report it.",
          ],
        },
        {
          heading: "Nursing Priorities",
          ordered: true,
          points: [
            "Give in the morning so diuresis does not destroy sleep — and expect frequent bathroom trips after the dose.",
            "Check potassium and hydration status before assuming the dose is safe to repeat.",
            "Protect hearing with slow IV furosemide pushes and avoid stacking other ototoxic drugs.",
          ],
        },
      ],
      nclexFocus: [
        "Hypokalemia + digoxin = lethal combination: cramps, weakness, dysrhythmias — supplement and recheck K+.",
        "Thiazides raise glucose and uric acid: caution in diabetes and gout.",
        "Mannitol needs a filter, crystallizes in the vial (warm to dissolve), and requires strict I&O plus neuro checks.",
      ],
    },
    detailedNotes: {
      intro:
        "Diuretics move fluid, but exam questions score whether you move electrolytes safely with it. Anchor each class to its site of action and its potassium behavior.",
      sections: [
        {
          heading: "Overview",
          paragraphs: [
            "Diuretics increase renal sodium and water excretion to relieve congestion, lower pressure, and correct select electrolyte emergencies. Potency and potassium effects differ by nephron segment, so the 'right' diuretic depends on the goal: rapid decongestion, chronic pressure control, potassium retention, or brain water.",
          ],
        },
        {
          heading: "Loop Diuretics",
          paragraphs: [
            "Furosemide and bumetanide block the Na-K-2Cl transporter in the thick ascending limb — the most powerful site available. Expect brisk diuresis within the hour (IV) with potassium, magnesium, and calcium losses. Give IV doses slowly to protect hearing, and watch aminoglycoside combinations that compound ototoxicity.",
          ],
        },
        {
          heading: "Thiazide Diuretics",
          paragraphs: [
            "Hydrochlorothiazide and chlorthalidone block the distal convoluted tubule's sodium-chloride channel — gentler diuresis ideal for chronic hypertension. They waste potassium like loops but add metabolic quirks: higher glucose, higher uric acid (gout), and higher lipids. They lose effectiveness as kidney function falls, where loops take over.",
          ],
        },
        {
          heading: "Potassium-Sparing Agents",
          paragraphs: [
            "Spironolactone (aldosterone blocker) and triamterene/amiloride keep potassium while shedding modest sodium and water — often paired with a loop or thiazide to balance losses. The trade is hyperkalemia, especially with ACE inhibitors, ARBs, kidney disease, or salt substitutes. Spironolactone's hormonal effects add gynecomastia, menstrual irregularity, and hirsutism counseling points.",
          ],
          callout: {
            type: "nursing-alert",
            text: "Hypokalemia plus digoxin can be fatal: muscle cramps, fatigue, and ventricular dysrhythmias. Recheck potassium after diuresis starts and supplement before toxicity declares itself.",
          },
        },
        {
          heading: "Osmotic Diuretics",
          paragraphs: [
            "Mannitol stays in the vasculature and drags tissue water with it — lowering intracranial and intraocular pressure within minutes. It demands a filter needle (crystals), strict intake-output and daily weights, serum osmolality monitoring, and crackle checks, because the mobilized fluid can briefly overload a failing heart before the kidneys clear it.",
          ],
        },
        {
          heading: "Interactions and Education",
          paragraphs: [
            "NSAIDs blunt diuretic effect and injure kidneys; lithium levels climb as thiazides cut its clearance; digoxin toxicity blooms in hypokalemia. Teach morning dosing, potassium-rich foods or supplements as prescribed, orthostatic precautions, and the weight-gain thresholds that trigger a call — the same 2–3 lb rule heart-failure patients live by.",
          ],
          callout: {
            type: "nclex-tip",
            text: "'Give in the morning' and 'monitor potassium and daily weight' answer a remarkable share of diuretic questions — pair every class with its K+ direction and you are covered.",
          },
        },
      ],
    },
    flashcards: [
      {
        id: "lib-diur-f1",
        front: "Which diuretic class is most potent, and what is its signature toxicity?",
        back: "Loop diuretics (furosemide) — ototoxicity, worse with rapid IV push or aminoglycosides.",
      },
      {
        id: "lib-diur-f2",
        front: "Which class is first-line for uncomplicated hypertension, and what two labs does it raise?",
        back: "Thiazides — raise glucose and uric acid (gout); also waste potassium.",
      },
      {
        id: "lib-diur-f3",
        front: "A patient on spironolactone also takes lisinopril and uses salt substitute. What is the danger?",
        back: "Triple potassium stacking → hyperkalemia (peaked Ts, widened QRS, arrest). Recheck K+ and stop the substitute.",
      },
      {
        id: "lib-diur-f4",
        front: "Mannitol is ordered for raised ICP. Name three administration safeguards.",
        back: "Filter needle (crystals), strict I&O with neuro checks, and lung-sound monitoring — mobilized fluid can overload weak hearts.",
      },
      {
        id: "lib-diur-f5",
        front: "Why are diuretics given in the morning?",
        back: "Peak diuresis hits within hours — morning dosing protects sleep and reduces fall risk from nighttime bathroom trips.",
      },
      {
        id: "lib-diur-f6",
        front: "Your heart-failure patient on furosemide + digoxin reports cramps and nausea with K+ 3.0. What is happening?",
        back: "Hypokalemia-driven digoxin toxicity — hold per parameters, notify the provider, recheck levels, supplement potassium.",
      },
    ],
    cheatSheet: {
      tagline: "What each class dumps or keeps — 60 seconds.",
      blocks: [
        {
          title: "Classes",
          points: ["Loop: strongest, dumps K+ (ototoxic)", "Thiazide: first-line HTN, dumps K+, raises sugar/gout", "K+-sparing: keeps K+ (hyperK risk)", "Mannitol: brain water, needs filter + I&O"],
        },
        {
          title: "Watch For",
          points: ["K+ direction per class · Mg2+ with loops", "Weights + I&O + orthostatics daily", "BUN/Cr climb = over-diuresis"],
        },
        {
          title: "Give Tips",
          points: ["Morning dosing always", "Slow IV furosemide push", "K+-rich foods or supplements as ordered"],
        },
        {
          title: "Interactions",
          points: ["HypoK + digoxin = toxicity", "Thiazides raise lithium levels", "NSAIDs blunt the effect + hurt kidneys"],
        },
      ],
      mnemonic: {
        title: "Mnemonic",
        text: "'Loops Lose K, Thiazides Toss K, Sparers Save K' — then mannitol Moves brain water.",
      },
    },
  },
  {
    id: "lib-ace-inhibitors",
    subjectSlug: "pharmacology",
    title: "ACE Inhibitors",
    slug: "ace-inhibitors",
    description:
      "The '-pril' drugs: RAAS blockade for hypertension, heart failure, and kidney protection — plus cough, potassium, and pregnancy rules.",
    difficulty: "Core",
    tags: ["pharmacology", "cardiac", "ace-inhibitors", "nclex"],
    estimatedMinutes: 12,
    examSlug: "nclex-rn",
    relatedSlugs: ["diuretics", "hypertension", "heart-failure"],
    quickNotes: {
      intro:
        "If it ends in '-pril', run the same checklist: why it helps, what it raises (potassium, creatinine), what it forbids (pregnancy), and what it swells (lips and tongue).",
      sections: [
        {
          heading: "Examples and Mechanism",
          points: [
            "Lisinopril, enalapril, captopril, ramipril — all end in '-pril'.",
            "They block angiotensin I → angiotensin II conversion: vasodilation, less aldosterone, lower pressure and cardiac workload.",
          ],
        },
        {
          heading: "Uses",
          points: ["Hypertension, heart failure with reduced EF, post-MI remodeling, and diabetic nephropathy (kidney protection)"],
        },
        {
          heading: "Side Effects",
          points: [
            "Persistent dry cough (bradykinin) — the classic reason to switch to an ARB.",
            "Hyperkalemia, first-dose hypotension, rising creatinine, and angioedema of lips/tongue/airway.",
          ],
        },
        {
          heading: "Contraindications",
          points: [
            "Pregnancy — teratogenic, especially second/third trimester; needs contraception counseling.",
            "History of angioedema and bilateral renal artery stenosis; caution with existing hyperkalemia or kidney disease.",
          ],
        },
        {
          heading: "Monitoring",
          points: [
            "Blood pressure (including orthostatics early), potassium, creatinine/eGFR, and pregnancy status.",
            "No potassium supplements or salt substitutes without explicit prescriber approval.",
          ],
        },
        {
          heading: "Nursing Priorities",
          ordered: true,
          points: [
            "Teach the cough-versus-emergency distinction: nagging dry cough gets reported routinely; lip/tongue swelling gets emergency care.",
            "Verify pregnancy status and contraception in every patient who could become pregnant.",
            "Recheck potassium and creatinine after initiation and dose changes — small rises are expected, large ones are reported.",
          ],
        },
      ],
      nclexFocus: [
        "Angioedema = stop the drug + emergency airway management; never rechallenge.",
        "Dry cough on an ACE inhibitor → prescriber switches to an ARB ('-sartan'), which rarely causes cough.",
        "Avoid K+ supplements and salt substitutes; monitor with diuretics that waste or spare potassium.",
      ],
    },
    detailedNotes: {
      intro:
        "ACE inhibitors protect hearts, vessels, and kidneys through one elegant blockade — but the same pathway produces the cough, the potassium rise, and the pregnancy danger. Learn the RAAS axis once and every '-pril' question resolves the same way.",
      sections: [
        {
          heading: "Overview",
          paragraphs: [
            "The renin-angiotensin-aldosterone system defends pressure by constricting vessels, retaining sodium and water, and remodeling the heart — useful in hemorrhage, harmful as chronic therapy targets go. ACE inhibitors interrupt this axis at the conversion step, easing load on failing hearts and shielding diabetic kidneys.",
          ],
        },
        {
          heading: "The RAAS Axis in One Minute",
          paragraphs: [
            "Low perfusion releases renin, which builds angiotensin I; ACE converts it to angiotensin II, which constricts vessels and triggers aldosterone-driven sodium and water retention. Blocking ACE therefore vasodilates, drops aldosterone (so potassium rises), and slows cardiac remodeling — while bradykinin accumulates and produces the famous cough.",
          ],
          callout: {
            type: "key-concept",
            text: "Block ACE → less angiotensin II → vasodilation + less aldosterone → lower pressure, higher potassium, protected kidneys — plus bradykinin cough.",
          },
        },
        {
          heading: "Indications",
          paragraphs: [
            "First-line or co-first-line in hypertension with compelling indications (diabetes, chronic kidney disease, heart failure, post-MI), cornerstone of HFrEF regimens alongside beta blockers, and renal-protective in diabetic nephropathy even before pressure control is the headline goal.",
          ],
        },
        {
          heading: "Adverse Effects",
          paragraphs: [
            "Dry persistent cough affects up to one in ten patients and resolves only by switching class. Hyperkalemia threatens patients on potassium-sparing diuretics, with kidney disease, or using salt substitutes. First-dose hypotension hits volume-depleted patients hardest — start low, monitor orthostatics. Creatinine may rise modestly; large jumps suggest renal artery stenosis or over-diuresis.",
          ],
          callout: {
            type: "medications",
            text: "Cough → switch to ARB. Swelling → stop everything and secure the airway. Rising K+ or creatinine → hold, hydrate-review, and call before the next dose.",
          },
        },
        {
          heading: "Pregnancy and Contraindications",
          paragraphs: [
            "ACE inhibitors are teratogenic — fetal renal injury, oligohydramnios, and skull hypoplasia cluster in later trimesters, so they are stopped before or the moment pregnancy is known. Absolute no-go history includes prior ACE-related angioedema; bilateral renal artery stenosis makes kidney function entirely angiotensin-dependent and equally forbidding.",
          ],
          callout: {
            type: "nursing-alert",
            text: "Any lip, tongue, or throat swelling on an ACE inhibitor is an airway emergency: stop the drug, call for help, prepare for airway intervention — and document a permanent allergy.",
          },
        },
        {
          heading: "Monitoring and Education",
          paragraphs: [
            "Check pressure sitting and standing for the first weeks, recheck potassium and creatinine within 1–2 weeks of starts and dose changes, and confirm contraception plans at every refill for patients of childbearing potential. Teach slow position changes, adherence despite feeling well, and the salt-substitute ban — then document the cough conversation so the next refill is not a surprise.",
          ],
        },
      ],
    },
    flashcards: [
      {
        id: "lib-ace-f1",
        front: "Name three ACE inhibitors and their shared suffix.",
        back: "Lisinopril, enalapril, captopril (also ramipril) — all end in '-pril'.",
      },
      {
        id: "lib-ace-f2",
        front: "What causes the ACE-inhibitor dry cough, and what is the fix?",
        back: "Bradykinin accumulation — switch to an ARB ('-sartan'), which rarely causes cough.",
      },
      {
        id: "lib-ace-f3",
        front: "Your patient's lips swell two hours after enalapril. Actions?",
        back: "Angioedema emergency: stop the drug, call for help, secure the airway, document permanent allergy — never rechallenge.",
      },
      {
        id: "lib-ace-f4",
        front: "Why are ACE inhibitors stopped in pregnancy?",
        back: "Teratogenic: fetal renal failure, oligohydramnios, skull defects — stop before or at first knowledge of pregnancy.",
      },
      {
        id: "lib-ace-f5",
        front: "Which labs and vitals are rechecked after starting an ACE inhibitor?",
        back: "Blood pressure with orthostatics, potassium, and creatinine/eGFR within 1–2 weeks and after dose changes.",
      },
      {
        id: "lib-ace-f6",
        front: "Why are salt substitutes banned on ACE inhibitors?",
        back: "They are potassium chloride — stacked on reduced aldosterone, they push potassium toward arrest levels.",
      },
    ],
    cheatSheet: {
      tagline: "Block, cough, potassium, pregnancy — 60 seconds.",
      blocks: [
        {
          title: "RAAS Block",
          points: ["Less angiotensin II → vasodilation", "Less aldosterone → K+ rises, kidneys protected"],
        },
        {
          title: "Watch For",
          points: ["Dry cough (→ ARB) · hyperK+ · first-dose drop", "Creatinine bump — small ok, large reported"],
        },
        {
          title: "Never",
          points: ["Pregnancy (teratogenic) · prior angioedema", "K+ supplements or salt substitutes unapproved"],
        },
        {
          title: "Monitor",
          points: ["Orthostatic BP early · K+ + creatinine 1–2 wks", "Contraception plan at every refill"],
        },
      ],
      mnemonic: {
        title: "Mnemonic",
        text: "'Prils Protect but Provoke': Pressure down, Proteinuria down — yet Potassium up, Pregnancy forbidden.",
      },
    },
  },
];
