import { useEffect } from "react";

type ArchiveUnlockProps = {
  recordName: string;
  onFinish: () => void;
};

export default function ArchiveUnlock({
  recordName,
  onFinish,
}: ArchiveUnlockProps) {
  useEffect(() => {
    const key = "unlockedRecords";

    const current = JSON.parse(
      localStorage.getItem(key) || "[]"
    ) as string[];

    if (!current.includes(recordName)) {
      localStorage.setItem(
        key,
        JSON.stringify([...current, recordName])
      );
    }

    const timeout = window.setTimeout(() => {
      onFinish();
    }, 3500);

    return () => {
      clearTimeout(timeout);
    };
  }, [recordName, onFinish]);

  return (
    <main className="app maintenanceScene">
      <section className="stage">
        <section className="introBox maintenanceBox">
          <p className="maintenanceLine">
            archive synchronization complete
          </p>

          <br />

          <p className="maintenanceLine">
            new record available :
          </p>

          <p className="maintenanceLine">
            {recordName}
          </p>
        </section>
      </section>
    </main>
  );
}