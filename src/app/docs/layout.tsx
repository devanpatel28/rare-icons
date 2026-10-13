import Navbar from "@/components/navbar";
import DocsShell from "@/components/docs/docs-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Documentation", template: "%s | Rare-Icons Docs" },
  description:
    "Complete documentation for Rare-Icons — installation, usage, Tailwind CSS sizing, TypeScript, Next.js integration, and more.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <DocsShell>{children}</DocsShell>
    </div>
  );
}
