/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Status from "../islands/Status.tsx"

const containerClass = `p-4 mx-auto max-w-screen-md`

export default function Home() {
  return (
    <div class={tw`bg-gray-50 min-h-screen`}>
      <section class={tw`bg-green-400`}>
        <div class={tw`${containerClass}`}>
          <h1 class={tw`mt-24 mb-4 text-5xl justify-center`}>Upturt Status</h1>
        </div>
      </section>
      <div class={tw`${containerClass} mt-8`}>
        <Status></Status>
      </div>
    </div>
  );
}
