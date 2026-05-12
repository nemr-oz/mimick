import romanDictionary from "../data/romanTypingParseDictionary.json";

type DictionaryItem = {
  Pattern: string;
  TypePattern: string[];
};

const dictionary =
  romanDictionary as DictionaryItem[];

export function normalizeInput(text: string) {
  return text
    .toLowerCase()
    .replace(
      /[\s.,。、，．・「」『』…—ー\-!?！？：:；;]/g,
      ""
    );
}

export function buildRomaCandidates(
  kana: string,
  limit = 300
) {
  const results: string[] = [];

  function search(rest: string, typed: string) {
    if (results.length >= limit) return;

    if (rest.length === 0) {
      results.push(typed);
      return;
    }

    const matched = dictionary
      .filter((item) =>
        rest.startsWith(item.Pattern)
      )
      .sort(
        (a, b) =>
          b.Pattern.length - a.Pattern.length
      );

    if (matched.length === 0) {
      search(rest.slice(1), typed);
      return;
    }

    const longestLength =
      matched[0].Pattern.length;

    const candidates = matched.filter(
      (item) =>
        item.Pattern.length === longestLength
    );

    for (const item of candidates) {
      for (const pattern of item.TypePattern) {
        if (results.length >= limit) return;

        search(
          rest.slice(item.Pattern.length),
          typed + pattern
        );
      }
    }
  }

  search(normalizeInput(kana), "");

  return Array.from(new Set(results));
}