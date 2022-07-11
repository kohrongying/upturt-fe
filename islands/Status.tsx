/** @jsx h */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

interface StatusResponse {
  url: string;
  status: string;
  status_dt: string;
}

function getData (): Promise<StatusResponse[]> {
  const request = new Request("https://upturt.onrender.com", {
    headers: {
      accept: "application/json",
    },
  });
  return fetch(request)
    .then(res => res.json())
    .then(res => {
      return res as StatusResponse[]
    })
}
const cardClass = `py-6 px-4 mb-6 flex flex-row justify-between content-center border-l-4 bg-white hover:shadow-md`

const format_dt = (dateStr: string) => {
  const date = new Date(dateStr)
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const day = ("0" + date.getDate()).slice(-2)
  return `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}`
}

export default function Status() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<StatusResponse[]>([])
  
  useEffect(() => {
    getData().then(resp => setData(resp))
  }, [])

  useEffect(() => {
    if (data.length !== 0) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <div>
      {isLoading ? <p>Loading... Please wait...</p> : (
       data.map(d => (
            <div class={tw`${cardClass} ${d.status === "up" ? 'border-green-200' : 'border-red-200'}`}>
              <p><a href={d.url} target="_blank" class={tw`hover:underline`}>{d.url}</a></p>
              <p class={tw`text-sm`}><i>{d.status} since {format_dt(d.status_dt)}</i></p>
            </div>
          ))
      )}
    </div>
  );
}
