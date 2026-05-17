export type Expression =
  | "normal"
  | "down"
  | "closed";

export type Line = {
  text: string;
  expression?: Expression;
};

export type MemoryAnswer =
  | "remember"
  | "forgot"
  | "unknown";

export type EmotionAnswer =
  | "feel"
  | "none"
  | "unknown";

export const diagnosisLines: Line[] = [
  { text: "……", expression: "closed" },
  { text: "……おや。", expression: "down" },
  { text: "目が、覺めましたか？", expression: "normal" },
  { text: "長く、眠っておられたので。", expression: "down" },
  { text: "……", expression: "closed" },
  {
    text: "これから、簡単な確認を行います。",
    expression: "normal",
  },
  {
    text: "質問には、できるだけ正確に答えてください。",
    expression: "normal",
  },
  {
    text: "自分の名前を憶えていますか？",
    expression: "down",
  },
];

export const mainLines: Line[] = [
  { text: "確認を終了します。", expression: "normal" },
  { text: "あなたの状態を記録しました。", expression: "down" },
  {
    text: "これより、人格維持補修処理を開始します。",
    expression: "normal",
  },
  {
    text: "意味を理解する必要はありません。",
    expression: "down",
  },
  {
    text: "正しく感じる必要もありません。",
    expression: "down",
  },
  {
    text: "ただ、文字を追ってください。",
    expression: "normal",
  },
  {
    text: "反応があれば、こちらで記録します。",
    expression: "normal",
  },
  { text: "……では、始めましょう", expression: "closed" },
  {
    text: "《Enterキーを押してください。》",
    expression: "normal",
  },
];

export const confirmedNameLines = (
  observerName: string
): Line[] => [
  {
    text: `そうですね、${observerName}さん。`,
    expression: "normal",
  },
  {
    text: "それでは、次の質問に移ります。",
    expression: "normal",
  },
];

export const temporaryNameLines = (
  observerName: string
): Line[] => [
  { text: "……そうですか。", expression: "down" },
  {
    text: "では、仮の名前を置いておきます。",
    expression: "normal",
  },
  {
    text: "本当の名前を思い出したら、教えてください。",
    expression: "normal",
  },
  {
    text: `では、仮に ${observerName} さんとお呼びします。`,
    expression: "normal",
  },
  {
    text: "それでは、次の質問に移ります。",
    expression: "down",
  },
];

export const getMemoryResultLines = (
  answer: MemoryAnswer
): Line[] => {
  if (answer === "remember") {
    return [
      { text: "……そうですか。", expression: "down" },
      {
        text: "では、その記憶を失くさないようにしてください。",
        expression: "normal",
      },
      {
        text: "こちらでは、保証できませんので。",
        expression: "down",
      },
      {
        text: "それでは、次の質問に移ります。",
        expression: "normal",
      },
    ];
  }

  if (answer === "forgot") {
    return [
      { text: "……そうですか。", expression: "closed" },
      {
        text: "では、記憶の欠損として記録します。",
        expression: "down",
      },
      {
        text: "欠けているものから、順番に確認します。",
        expression: "normal",
      },
      {
        text: "それでは、次の質問に移ります。",
        expression: "normal",
      },
    ];
  }

  return [
    { text: "分からない、ですね。", expression: "normal" },
    {
      text: "一番正確な答えかもしれません。",
      expression: "down",
    },
    { text: "そのまま記録します。", expression: "normal" },
    {
      text: "それでは、次の質問に移ります。",
      expression: "normal",
    },
  ];
};

export const getEmotionResultLines = (
  answer: EmotionAnswer
): Line[] => {
  if (answer === "feel") {
    return [
      { text: "……よかった。", expression: "closed" },
      {
        text: "まだ、反応があります。",
        expression: "normal",
      },
      {
        text: "完全には、平坦化されていません。",
        expression: "down",
      },
    ];
  }

  if (answer === "none") {
    return [
      { text: "……そうですか。", expression: "down" },
      {
        text: "感情反応の低下として記録します。",
        expression: "normal",
      },
      {
        text: "無理に思い出さなくてかまいません。",
        expression: "closed",
      },
    ];
  }

  return [
    { text: "分からない、ですね。", expression: "normal" },
    {
      text: "感情は、いつも名前を持っているとは限りません。",
      expression: "down",
    },
    {
      text: "その曖昧さも、記録しておきます。",
      expression: "normal",
    },
  ];
};

export const SPECIAL_NAMES = [
  "青猫",
  "羊少女",
  "観測者",
  "保守員",
];