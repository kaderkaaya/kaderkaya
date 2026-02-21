const WORDS_PER_MINUTE = 200;

export function getReadingTimeMinutes(content: string): number {
  if (!content?.trim()) return 0;
  const stripped = content.replace(/[#*_`\[\]()]/g, " ").replace(/\s+/g, " ");
  const wordCount = stripped.trim().split(" ").filter(Boolean).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return Math.max(1, minutes);
}
