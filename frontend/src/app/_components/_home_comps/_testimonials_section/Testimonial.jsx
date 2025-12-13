"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaSnapchatGhost, FaTwitter, FaSquareFull } from "react-icons/fa";

import { color } from "framer-motion";

export default function Testimonials() {
  const [slide, setSlide] = useState([]);
  const [guestId, setGuestId] = useState(1);

  useEffect(() => {
    async function getTestimonials() {
      const res = await fetch("http://localhost:4000/testimonials", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch testimonials");

      const testimonials = await res.json();
      setSlide(testimonials);
      /*setGuestId(testimonials[0].id);*/
    }
    getTestimonials();
  }, []);

  if (slide.length === 0) return <h2>Loading...</h2>;

  const clubGuest = slide.find((person) => person.id === guestId); /*finder/matcher personens id (fra slide) med id fra i arrayet(guestId)*/


  return (
    <>
      <div className="grid grid-cols-1 grid-rows-1">
        <Image src="/footerbg.webp" alt="People dancing" width={1600} height={1600} className="h-full w-fit lg:w-full brightness-20 object-cover z-0 row-start-1 row-end-2 col-start-1 col-end-2" />

        <main className="grid grid-cols-1 grid-rows-[auto] md:mx-40 justify-items-center text-center gap-3 p-5 md:p-10 lg:px-20 z-100 row-start-1 row-end-2 col-start-1 col-end-2">
          <Image src={clubGuest.asset.url} alt={`Club Guest: ${clubGuest.name}`} width={100} height={100} />
          <h2>{clubGuest.name}</h2>
          <p className="text-pretty">{clubGuest.content}</p>

          {/*SoMe links*/}
          <article className="place-self-center w-fit mt-3 grid grid-cols-3 gap-2 justify-items-center">
            <Link href={clubGuest.facebook} className="border-2 p-2 justify-items-center">
              <FaFacebookF className="h-6 w-6" />
            </Link>
            <Link href={clubGuest.twitter} className="border-2 p-2 items-center">
              <FaTwitter className="h-6 w-6" />
            </Link>
            <Link href="http://snapchat.com" className="border-2 p-2 items-center">
              <FaSnapchatGhost className="h-6 w-6" />
            </Link>
          </article>

          <section className="flex gap-3 mt-3">
            {/*hver knap er sat til ét bestemt testimonial med setGuestId(x) - */}
            <button onClick={() => setGuestId(1)} className={`transition duration-300 ${guestId === 1 ? "text-[#FF2A70]" : "text-white hover:text-[#FF2A70]"}`}>
              <FaSquareFull /> {/* "active" color (after click)  :  "deafult"/normal styling + hover */}
            </button>

            <button onClick={() => setGuestId(2)} className={`transition duration-300 ${guestId === 2 ? "text-[#FF2A70]" : "text-white hover:text-[#FF2A70]"}`}>
              <FaSquareFull />
            </button>

            <button onClick={() => setGuestId(3)} className={`transition duration-300 ${guestId === 3 ? "text-[#FF2A70]" : "text-white hover:text-[#FF2A70]"}`}>
              <FaSquareFull />
            </button>
          </section>
        </main>
      </div>
    </>
  );
}
