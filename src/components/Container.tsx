export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full px-2 max-w-9xl mx-auto bg-black text-white">
      {children}
    </div>
  );
}