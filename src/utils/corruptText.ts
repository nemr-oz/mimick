const noiseChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%&?@";

export function corruptText(
  text: string,
  closeness: number
) {
  const corruptionRate =
    Math.max(0, 1 - closeness * 1.25);

  return text
    .split("")
    .map((char) => {
      if (
        char === "。" ||
        char === "、" ||
        char === " "
      ) {
        return char;
      }

      if (Math.random() < corruptionRate) {
        return noiseChars[
          Math.floor(
            Math.random() * noiseChars.length
          )
        ];
      }

      return char;
    })
    .join("");
}