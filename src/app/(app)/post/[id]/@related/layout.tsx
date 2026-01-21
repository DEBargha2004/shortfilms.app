export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full ml-auto grid xl:grid-cols-1 lg:grid-cols-2 grid-cols-1 gap-2.5">
      {children}
    </div>
  );
}
