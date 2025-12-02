import Image from "next/image";

async function getEvents() {
  const res = await fetch("http://localhost:4000/events");
  return res.json();
}

export default async function Home() {
  const events = await getEvents();

  return (
    <div>
      <h1>Events</h1>
      <pre>{JSON.stringify(events, null, 2)}</pre>
    </div>
  );
}
