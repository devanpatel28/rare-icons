import { Suspense } from "react";
import DashboardClient from "@/components/dashboard/dashboard-client";

export const metadata = {
  title: "Icons Explorer — Rare-Icons",
  description:
    "Browse and search 3,700+ premium SVG icons across 59 categories.",
};

export default function IconsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-sm text-muted">
          Loading icons...
        </div>
      }
    >
      <DashboardClient />
    </Suspense>
  );
}
