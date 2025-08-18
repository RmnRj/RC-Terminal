import { Terminal } from "@/components/Terminal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[80vh] ">
        <Terminal />
      </div>
    </main>
  );
}
