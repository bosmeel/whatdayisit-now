export type CreatureCategory = "creature" | "cat" | "dog" | "bird" | "surprise";

type Creature = {
  emoji: string;
  name: string;
  vibe: string;
};

const creatures: Creature[] = [
  { emoji: "🐢", name: "Turtle", vibe: "Slow and steady today." },
  { emoji: "🦊", name: "Fox", vibe: "Stay curious." },
  { emoji: "🦉", name: "Owl", vibe: "Trust your quiet wisdom." },
  { emoji: "🐝", name: "Bee", vibe: "Small actions matter." },
  { emoji: "🐙", name: "Octopus", vibe: "Adapt and flow." },
  { emoji: "🦔", name: "Hedgehog", vibe: "Protect your energy." },
  { emoji: "🐬", name: "Dolphin", vibe: "Play a little." },
  { emoji: "🦌", name: "Deer", vibe: "Move gently forward." },
  { emoji: "🐿️", name: "Squirrel", vibe: "Prepare wisely." },
  { emoji: "🦩", name: "Flamingo", vibe: "Stand tall." },
];

const cats: Creature[] = [
  { emoji: "🐈", name: "Cat", vibe: "Choose comfort + focus." },
  { emoji: "😺", name: "Happy Cat", vibe: "Keep it light." },
  { emoji: "😼", name: "Smirk Cat", vibe: "Confidence, quietly." },
  { emoji: "😸", name: "Grin Cat", vibe: "Celebrate small wins." },
  { emoji: "🐈‍⬛", name: "Black Cat", vibe: "Move with intention." },
];

const dogs: Creature[] = [
  { emoji: "🐕", name: "Dog", vibe: "Loyalty to your plan." },
  { emoji: "🐶", name: "Puppy", vibe: "Start simple, stay playful." },
  { emoji: "🦮", name: "Guide Dog", vibe: "One step at a time." },
  { emoji: "🐕‍🦺", name: "Service Dog", vibe: "Support your future self." },
];

const birds: Creature[] = [
  { emoji: "🐦", name: "Bird", vibe: "Keep perspective." },
  { emoji: "🦅", name: "Eagle", vibe: "Aim higher today." },
  { emoji: "🦜", name: "Parrot", vibe: "Say what matters." },
  { emoji: "🕊️", name: "Dove", vibe: "Calm and steady." },
];

export const CATEGORY_OPTIONS: Array<{ value: CreatureCategory; label: string }> =
  [
    { value: "creature", label: "Creature" },
    { value: "cat", label: "Cat" },
    { value: "dog", label: "Dog" },
    { value: "bird", label: "Bird" },
    { value: "surprise", label: "Surprise" },
  ];

function seedFromIsoDate(isoDate: string): number {
  // isoDate = "YYYY-MM-DD"
  // Deterministic and timezone-proof.
  const numeric = Number(isoDate.replace(/-/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function pick(list: Creature[], seed: number): Creature {
  return list[seed % list.length];
}

function getList(category: Exclude<CreatureCategory, "surprise">): Creature[] {
  if (category === "cat") return cats;
  if (category === "dog") return dogs;
  if (category === "bird") return birds;
  return creatures;
}

export function getCreatureOfDay(isoDate: string, category: CreatureCategory): Creature {
  const seed = seedFromIsoDate(isoDate);

  if (category === "surprise") {
    const groups: Array<Exclude<CreatureCategory, "surprise">> = [
      "creature",
      "cat",
      "dog",
      "bird",
    ];
    const chosenGroup = groups[seed % groups.length];
    return pick(getList(chosenGroup), seed);
  }

  return pick(getList(category), seed);
}