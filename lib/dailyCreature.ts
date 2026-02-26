const creatures = [
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

export function getDailyCreature(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  return creatures[dayOfYear % creatures.length];
}