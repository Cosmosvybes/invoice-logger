import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

export default function usePaddle() {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    initializePaddle({
      environment: "sandbox", // Switch to 'production' when live
      token: "test_86653df3413554e803d098e98a1", // Replace with USER's Client Token
    }).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  return paddle;
}
