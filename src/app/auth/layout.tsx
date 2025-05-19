export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-dvh h-fit flex justify-center items-center">
      {children}
    </main>
  );
}
