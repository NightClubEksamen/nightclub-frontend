"use client";
import { FaSquareFull } from "react-icons/fa";

export default function SlideSquareBtns() {
  return (
    <>
      <main className="flex gap-3 mt-3">
        <button id={1} className="text-white target:blue hover:text-[#FF2A70] active:text-[#FF2A70]">
          <FaSquareFull />
        </button>
        <button id={2} className="text-white target:blue hover:text-[#FF2A70] active:text-[#FF2A70]">
          <FaSquareFull />
        </button>
        <button id={3} className="text-white target:blue hover:text-[#FF2A70] active:text-[#FF2A70]">
          <FaSquareFull />
        </button>
      </main>
    </>
  );
}
