"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          margin: 0,
        }}>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}>
          <h2>Something went wrong!</h2>
          <Button onClick={() => window.location.reload()}>Try again</Button>
        </div>
      </body>
    </html>
  );
}
