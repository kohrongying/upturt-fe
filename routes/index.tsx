/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

const containerClass = `p-4 mx-auto max-w-screen-md`

const cardClass = `py-6 px-4 mb-6 flex flex-row justify-between content-center border-l-4 bg-white hover:shadow-md`

const data = [{"url":"https://rongying.co","status":"up","status_dt":"2022-07-11T14:32:54.743000+08:00"},{"url":"https://blog.rongying.co","status":"up","status_dt":"2022-07-11T14:32:54.743000+08:00"},{"url":"https://eleventy.rongying.co","status":"up","status_dt":"2022-07-11T14:32:54.743000+08:00"},{"url":"https://peppa.netlify.app","status":"up","status_dt":"2022-07-11T14:32:54.743000+08:00"}];

const format_dt = (dateStr: string) => {
  const date = new Date(dateStr)
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const day = ("0" + date.getDate()).slice(-2)
  return `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}`
}

export default function Home() {
  return (
    <div class={tw`bg-gray-50 min-h-screen`}>
      <section class={tw`bg-green-400`}>
        <div class={tw`${containerClass}`}>
          <h1 class={tw`mt-24 mb-4 text-5xl justify-center`}>Upturt Status</h1>
        </div>
      </section>
      <div class={tw`${containerClass} mt-8`}>
        {data.map(d => (
          <div class={tw`${cardClass} ${d.status === "up" ? 'border-green-200' : 'border-red-200'}`}>
            <p><a href={d.url} target="_blank" class={tw`hover:underline`}>{d.url}</a></p>
            <p class={tw`text-sm`}><i>{d.status} since {format_dt(d.status_dt)}</i></p>
          </div>
        ))}
      </div>
    </div>
  );
}
