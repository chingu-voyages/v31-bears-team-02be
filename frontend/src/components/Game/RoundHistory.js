function RoundHistory({ roundHistory }) {
  const rounds = roundHistory.map((round, i) => {
    console.log(round);
    let color;
    if (round === "✔") {
      color = "bg-green-500";
    } else if (round === "❌") {
      color = "bg-red-500";
    } else {
      color = "bg-yellow-500";
    }

    return (
      <div
        style={{ width: "10%", border: "1px solid #ccc" }}
        key={i}
        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center1 ${color}`}
      ></div>
    );
  });
  return (
    <div className="relative pt-1">
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-200">
        {rounds}
      </div>
    </div>
  );
}
export default RoundHistory;
