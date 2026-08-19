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
            "radial-gradient(ellipse 70% 50% at 50% -10%, oklch(0.45 0.15 300 / 0.22), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 90% 110%, oklch(0.5 0.12 200 / 0.16), transparent 70%)",
        }}
      />
    </div>
  );
}