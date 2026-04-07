"use client";

export default function IceParticles() {
  const particles = [
    { x: "8%", size: "4px", duration: "14s", delay: "0s" },
    { x: "15%", size: "6px", duration: "11s", delay: "2s" },
    { x: "25%", size: "3px", duration: "16s", delay: "4s" },
    { x: "35%", size: "7px", duration: "10s", delay: "1s" },
    { x: "45%", size: "4px", duration: "13s", delay: "5s" },
    { x: "55%", size: "5px", duration: "15s", delay: "3s" },
    { x: "65%", size: "3px", duration: "12s", delay: "6s" },
    { x: "72%", size: "6px", duration: "14s", delay: "0.5s" },
    { x: "80%", size: "4px", duration: "11s", delay: "3.5s" },
    { x: "90%", size: "5px", duration: "16s", delay: "7s" },
    { x: "20%", size: "3px", duration: "18s", delay: "8s" },
    { x: "50%", size: "4px", duration: "13s", delay: "2.5s" },
    { x: "70%", size: "5px", duration: "10s", delay: "4.5s" },
    { x: "40%", size: "3px", duration: "15s", delay: "6.5s" },
  ];

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="ice-particle"
          style={{
            "--x": p.x,
            "--size": p.size,
            "--duration": p.duration,
            "--delay": p.delay,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}
