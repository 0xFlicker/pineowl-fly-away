import Bridge from "./Bridge";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-600">ONE WAY ETHEREUM {'->'} BASE $PINEOWL BRIDGE</h1>
        <p className="text-lg text-gray-600">THIS IS A ONE WAY BRIDGE. YOU CANNOT BRIDGE BACK TO ETHEREUM WITHOUT INTERACTING DIRECTLY WITH THE BASE L2 BRIDGE CONTRACTS.</p>
      </div>
      <Bridge />
    </div>
  );
}
