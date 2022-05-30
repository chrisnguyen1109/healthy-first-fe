export const capitalizeWord = (word: string) =>
    word.replace(/\b\w/g, c => c.toUpperCase());
