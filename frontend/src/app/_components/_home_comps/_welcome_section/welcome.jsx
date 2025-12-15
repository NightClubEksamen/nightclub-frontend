"use client";

import { useState } from "react";
import Image from "next/image";
import { MdOutlineRoomService } from "react-icons/md";
import { PiCheersDuotone } from "react-icons/pi";
import Animation from "./Animation";

const OFFERS = [
  {
    id: 1,
    img: "/welcome/offer_1.jpg",
    icon: <Image src="/welcome/icon_dancer.svg" width={12} height={12} alt="Offer icon" />,
    title: "Night Club",
    text: "Night Club Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quod temporibus rerum minus nihil nulla recusandae aliquam nesciunt veniam, doloremque modi ducimus, dolores voluptas. Mollitia distinctio velit itaque dolores officiis.",
  },
  {
    id: 2,
    img: "/welcome/offer_2.jpg",
    icon: <MdOutlineRoomService />,
    title: "Resturant",
    text: "Resturant Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quod temporibus rerum minus nihil nulla recusandae aliquam nesciunt veniam, doloremque modi ducimus, dolores voluptas. Mollitia distinctio velit itaque dolores officiis.",
  },
  {
    id: 3,
    img: "/welcome/offer_3.jpg",
    icon: <PiCheersDuotone />,
    title: "Bar",
    text: "Bar Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quod temporibus rerum minus nihil nulla recusandae aliquam nesciunt veniam, doloremque modi ducimus, dolores voluptas. Mollitia distinctio velit itaque dolores officiis.",
  },
];

export default function Welcome() {
  const [activeId, setActiveId] = useState(null);

  return (
    <main className="grid grid-cols-1 sm:grid-cols-3 max-w-6xl place-self-center gap-x-6 gap-y-8 p-5 md:p-10 lg:px-20">
      {OFFERS.map((offer) => (
        <section key={offer.id} className="grid grid-cols-1 grid-rows-1 min-h-90 sm:h-100 max-w-[305px] md:max-w-full gap-2 place-self-center" onPointerEnter={() => setActiveId(offer.id)} onPointerLeave={() => setActiveId(null)} onPointerDown={() => setActiveId((prev) => (prev === offer.id ? null : offer.id))} onFocus={() => setActiveId(offer.id)} onBlur={() => setActiveId(null)} tabIndex={0}>
          {/*bg img*/}
          <Animation isActive={activeId === offer.id} className="row-start-1 col-start-1 z-0 h-full w-full" animation="bgChange" target={<Image src={offer.img} alt={`Picture of ${offer.title}`} width={400} height={800} className="h-full w-full object-cover pointer-events-none" />} />

          {/*
        overlay*/}
          <article className="grid grid-cols-1 grid-rows-[auto] row-start-1 col-start-1">
            {/*left tri*/}
            <Animation isActive={activeId === offer.id} className="w-full h-full border-t-2 border-[#FF2A70]" animation="triLeft" target={<div className="place-self-start border-[#FF2A70] h-full border-t-40 border-r-40 border-r-transparent"></div>}></Animation>

            {/*icon*/}
            <Animation isActive={activeId === offer.id} className=" place-self-center" animation="iconZoom" target={<div className="flex w-fit h-fit border-2 border-[#FF2A70] p-[1rem] justify-center place-self-center [&>*]:text-[#FF2A70] [&>*]:h-10 [&>*]:w-10 [&>*]:aspect-square">{offer.icon}</div>}></Animation>

            {/*title*/}
            <Animation isActive={activeId === offer.id} className="place-self-center" animation="titleZoom" target={<p className="uppercase text-center text-2xl font-bold tracking-[0.5em]">{offer.title}</p>}></Animation>

            {/*text*/}
            <Animation isActive={activeId === offer.id} className="place-self-center" animation="textMove" target={<p className="text-center text-pretty">{offer.text}</p>}></Animation>

            {/*right tri*/}
            <Animation isActive={activeId === offer.id} className="w-full h-full border-b-2 border-[#FF2A70]" animation="triRight" target={<div className="place-self-end border-[#FF2A70] h-full border-b-40 border-l-40 border-l-transparent"></div>}></Animation>
          </article>
        </section>
      ))}
    </main>
  );
}
