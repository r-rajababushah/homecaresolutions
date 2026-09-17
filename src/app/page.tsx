"use client";

import { createClient } from "@/lib/supabase/client";

export default function Home() {
  const supabase = createClient();

  return (
    <main>
      <h1>HomeCare Repair</h1>
      <p>Supabase connected.</p>
    </main>
  );
}