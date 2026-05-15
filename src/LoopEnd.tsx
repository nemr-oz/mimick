import { useEffect } from "react";

type LoopEndProps = {
  onRestart: () => void;
};

export default function LoopEnd({
  onRestart,
}: LoopEndProps) {

  useEffect(() => {

    const loopCount = Number(
      localStorage.getItem("loopCount") || "0"
    );

    localStorage.setItem(
      "loopCount",
      String(loopCount + 1)
    );

  }, []);

  return (
    <main
      className="endRoot"
      onClick={onRestart}
    >

      <div className="endNoise" />

      <section className="endBox">

        <div className="endSpeaker">
          SYSTEM
        </div>

        <h1 className="endTitle">
          LOOP END
        </h1>

        <p className="endText">
          記録層の巻き戻しが検出されました。
          {"\n"}
          感情構造の再初期化を実行します。
        </p>

        <div className="endHint">
          click to restart
        </div>

      </section>

    </main>
  );
}