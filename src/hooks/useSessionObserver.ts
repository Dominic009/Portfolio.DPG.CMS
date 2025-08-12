/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useSessionObserver.ts
"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function useSessionObserver(callback: (session: any) => void) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      callback(session);
    }
  }, [session, status, callback]);

  return { session, status };
}
