export type Attestation = 'critical' | 'vulgate' | 'regional-retelling' | 'contested';
export type Thread = 'bloodline' | 'exile' | 'war';

export type AtlasNode = {
  id: string;
  kind: 'person' | 'event' | 'verse';
  label: string;
  devanagari?: string;
  thread: Thread;
  x: number;
  y: number;
  attestation: Attestation;
  summary: string;
  citation: string;
  reviewStatus: 'draft' | 'reviewed' | 'published';
};

export const nodes: AtlasNode[] = [
  {
    id: 'satyavati',
    kind: 'person',
    label: 'Satyavatī',
    thread: 'bloodline',
    x: 12,
    y: 47,
    attestation: 'critical',
    summary:
      'Her decision to preserve the Kuru line makes succession a question that will not stay private.',
    citation: 'Ādi Parva · Critical Edition reference pending review',
    reviewStatus: 'draft',
  },
  {
    id: 'bhishma',
    kind: 'person',
    label: 'Bhīṣma',
    devanagari: 'भीष्म',
    thread: 'bloodline',
    x: 27,
    y: 27,
    attestation: 'critical',
    summary:
      'A vow of renunciation turns devotion to a father into a lifelong political force.',
    citation: 'Ādi Parva · Critical Edition reference pending review',
    reviewStatus: 'draft',
  },
  {
    id: 'dhritarashtra',
    kind: 'person',
    label: 'Dhṛtarāṣṭra',
    thread: 'bloodline',
    x: 41,
    y: 48,
    attestation: 'critical',
    summary:
      'Denied the throne, then entrusted with it. His love for Duryodhana becomes statecraft by omission.',
    citation: 'Ādi Parva · Critical Edition reference pending review',
    reviewStatus: 'draft',
  },
  {
    id: 'duryodhana',
    kind: 'person',
    label: 'Duryodhana',
    devanagari: 'दुर्योधन',
    thread: 'war',
    x: 59,
    y: 38,
    attestation: 'critical',
    summary:
      'He sees a rival claim where others see kinship, and makes the court choose sides.',
    citation: 'Sabhā Parva · Critical Edition reference pending review',
    reviewStatus: 'draft',
  },
  {
    id: 'yudhishthira',
    kind: 'person',
    label: 'Yudhiṣṭhira',
    devanagari: 'युधिष्ठिर',
    thread: 'exile',
    x: 55,
    y: 69,
    attestation: 'critical',
    summary:
      'His commitment to dharma is tested by a game designed to turn virtue into vulnerability.',
    citation: 'Sabhā Parva · Critical Edition reference pending review',
    reviewStatus: 'draft',
  },
  {
    id: 'draupadi',
    kind: 'person',
    label: 'Draupadī',
    devanagari: 'द्रौपदी',
    thread: 'exile',
    x: 72,
    y: 60,
    attestation: 'critical',
    summary:
      'Her question in the dice hall exposes the court’s failure to answer for its own law.',
    citation: 'Sabhā Parva · Critical Edition reference pending review',
    reviewStatus: 'draft',
  },
  {
    id: 'dice',
    kind: 'event',
    label: 'The dice hall',
    thread: 'exile',
    x: 64,
    y: 50,
    attestation: 'critical',
    summary: 'A wager becomes dispossession. Private vice becomes a public rupture.',
    citation: 'Sabhā Parva · Dice Game · reference pending review',
    reviewStatus: 'draft',
  },
  {
    id: 'exile',
    kind: 'event',
    label: 'Thirteen years',
    thread: 'exile',
    x: 80,
    y: 75,
    attestation: 'critical',
    summary:
      'Exile gives the brothers time, allies, and a promise of return. It does not dissolve the injury.',
    citation: 'Vana & Virāṭa Parvas · reference pending review',
    reviewStatus: 'draft',
  },
  {
    id: 'gita',
    kind: 'verse',
    label: 'The field before battle',
    devanagari: 'धर्मक्षेत्रे कुरुक्षेत्रे',
    thread: 'war',
    x: 83,
    y: 28,
    attestation: 'critical',
    summary:
      'Before action, the battlefield becomes a place of seeing. This is a study entry, not a final translation.',
    citation: 'Bhagavad Gītā 1.1 · publication review required',
    reviewStatus: 'draft',
  },
  {
    id: 'kurukshetra',
    kind: 'event',
    label: 'Kurukṣetra',
    devanagari: 'कुरुक्षेत्र',
    thread: 'war',
    x: 90,
    y: 51,
    attestation: 'critical',
    summary:
      'The conflict reaches the field after every smaller remedy has been refused or exhausted.',
    citation: 'Bhīṣma Parva · reference pending review',
    reviewStatus: 'draft',
  },
  {
    id: 'karna',
    kind: 'person',
    label: 'Karna',
    devanagari: 'कर्ण',
    thread: 'war',
    x: 72,
    y: 17,
    attestation: 'critical',
    summary:
      'A hidden birth, foster lineage, friendship and a vow make him impossible to reduce to one allegiance.',
    citation: 'Critical Edition and received tradition references pending review',
    reviewStatus: 'draft',
  },
];

export const edges = [
  ['satyavati', 'bhishma'],
  ['bhishma', 'dhritarashtra'],
  ['dhritarashtra', 'duryodhana'],
  ['duryodhana', 'dice'],
  ['yudhishthira', 'dice'],
  ['draupadi', 'dice'],
  ['dice', 'exile'],
  ['exile', 'kurukshetra'],
  ['karna', 'kurukshetra'],
  ['gita', 'kurukshetra'],
] as const;

export const threadLabels: Record<
  Thread,
  { number: string; label: string; prompt: string }
> = {
  bloodline: {
    number: '01',
    label: 'Bloodline',
    prompt: 'How did succession become a wound?',
  },
  exile: {
    number: '02',
    label: 'Exile',
    prompt: 'What did the dice game make irreversible?',
  },
  war: {
    number: '03',
    label: 'War',
    prompt: 'When does a promise become a battlefield?',
  },
};
