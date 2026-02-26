const challenges: string[] = [
  "Drink an extra glass of water today.",
  "Send one message you’ve been postponing.",
  "Take a 5 minute walk without your phone.",
  "Write down one clear goal for this week.",
  "Clean one small thing around you.",
  "Do one push-up more than yesterday.",
  "Compliment someone genuinely.",
  "Declutter one digital file.",
  "Read 2 pages of something useful.",
  "Go to bed 20 minutes earlier.",
  "Take one deep breath before your next task.",
  "Smile at someone today.",
  "Stretch for 3 minutes.",
  "Plan tomorrow before today ends.",
  "Delete one unnecessary app.",
];

export function getDailyChallenge(date: Date): string {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const index = dayOfYear % challenges.length;
  return challenges[index];
}