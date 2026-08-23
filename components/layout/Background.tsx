export default function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-scene"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, oklch(0.75 0.14 300 / 0.25), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 90% 110%, oklch(0.78 0.1 205 / 0.2), transparent 70%)",
        }}
      />
    </div>
  );
}