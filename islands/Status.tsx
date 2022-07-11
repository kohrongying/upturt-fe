/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

interface StatusProps {
  start: number;
}

const getData = async () => {
  const request = new Request("https://upturt.onrender.com", {
    headers: {
      accept: "application/json",
    },
  });
  const response = await fetch(request);
  console.log(response)
  return response.body;
}
const cardClass = `py-6 px-4 mb-6 flex flex-row justify-between content-center border-l-4 bg-white hover:shadow-md`

const format_dt = (dateStr: string) => {
  const date = new Date(dateStr)
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const day = ("0" + date.getDate()).slice(-2)
  return `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}`
}

export default function Status(props: StatusProps) {
  const [count, setCount] = useState(props.start);
  const btn = tw`px-2 py-1 border(gray-100 1) hover:bg-gray-200`;
  return (
    <div class={tw`flex gap-2 w-full`}>
     {getData().map(d => (
          <div class={tw`${cardClass} ${d.status === "up" ? 'border-green-200' : 'border-red-200'}`}>
            <p><a href={d.url} target="_blank" class={tw`hover:underline`}>{d.url}</a></p>
            <p class={tw`text-sm`}><i>{d.status} since {format_dt(d.status_dt)}</i></p>
          </div>
        ))}
    </div>
  );
}
