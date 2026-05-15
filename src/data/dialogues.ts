export type Expression =
  | "normal"
  | "down"
  | "closed";

export type Choice = {
  text: string;
  emotionDelta: number;
  nextId: string;
};

export type DialogueNode = {
  id: string;
  text: string;
  expression?: Expression;
  choices?: Choice[];
};

export const chapter2Dialogue: DialogueNode[] = [

  {
    id: "start",

    text:
      "……まだ、そこにいますか。",

    expression: "down",

    choices: [
      {
        text: "います。",
        emotionDelta: 10,
        nextId: "stay",
      },

      {
        text: "作業を続けます。",
        emotionDelta: -5,
        nextId: "work",
      },
    ],
  },

  {
    id: "stay",

    text:
      "……そうですか。少し、安心しました。",

    expression: "closed",

    choices: [
      {
        text: "あなたは誰？",
        emotionDelta: 5,
        nextId: "who",
      },

      {
        text: "黙っている。",
        emotionDelta: -3,
        nextId: "silent",
      },
    ],
  },

  {
    id: "work",

    text:
      "……わかりました。保守を優先します。",

    expression: "normal",

    choices: [
      {
        text: "保守を続ける。",
        emotionDelta: -5,
        nextId: "maintenance",
      },

      {
        text: "少女を見る。",
        emotionDelta: 8,
        nextId: "look",
      },
    ],
  },

  {
    id: "who",

    text:
      "名前は、もう思い出せません。",

    expression: "closed",

    choices: [
      {
        text: "思い出したい？",
        emotionDelta: 8,
        nextId: "memory",
      },
    ],
  },

  {
    id: "silent",

    text:
      "……そういうところは、変わりませんね。",

    expression: "down",

    choices: [
      {
        text: "？",
        emotionDelta: 0,
        nextId: "end",
      },
    ],
  },

  {
    id: "maintenance",

    text:
      "同期を優先します。感情層を安定化してください。",

    expression: "normal",

    choices: [
      {
        text: "同期を開始する。",
        emotionDelta: -8,
        nextId: "end",
      },
    ],
  },

  {
    id: "look",

    text:
      "……見つめないでください。",

    expression: "down",

    choices: [
      {
        text: "どうして？",
        emotionDelta: 12,
        nextId: "memory",
      },
    ],
  },

  {
    id: "memory",

    text:
      "あなたは、何を思い出しましたか。",

    expression: "closed",

    choices: [
      {
        text: "あなたのこと",
        emotionDelta: 15,
        nextId: "end",
      },

      {
        text: "自分のこと",
        emotionDelta: 5,
        nextId: "end",
      },

      {
        text: "何も思い出していない",
        emotionDelta: -10,
        nextId: "end",
      },
    ],
  },

  {
    id: "end",

    text:
      "……記録を保存します。",

    expression: "closed",
  },

];