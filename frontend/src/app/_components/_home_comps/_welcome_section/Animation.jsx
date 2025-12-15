"use client";

import { motion } from "framer-motion";

const bgChange = {
  idle: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 1,
      ease: "easeInOut",
    },
  },
  active: {
    zIndex: -1,
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const iconZoom = {
  idle: {
    opacity: 1,
    zIndex: 1,

    scale: 0,
    transition: {
      type: "tween",
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  active: {
    opacity: [0, 0.1, 1],
    scale: 1,
    transition: {
      scale: {
        type: "tween",
        duration: 0.5,
        ease: "easeIn",
      },
      opacity: {
        type: "tween",
        duration: 2,
        times: [0.1, 0.2, 1],
        ease: "easeOut",
      },
    },
  },
};

const titleZoom = {
  idle: {
    opacity: 0,
    scale: 0.2,
    y: -25,
    transition: {
      type: "tween",
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  active: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 1,
      ease: "easeIn",
    },
  },
};

const textMove = {
  idle: {
    opacity: 0,
    x: 30,
    transition: {
      type: "tween",
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  active: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      duration: 1.2,
      ease: "easeIn",
    },
  },
};

const triRight = {
  idle: {
    opacity: 0,
    x: 10,
    transition: {
      type: "tween",
      duration: 0.1,
      ease: "easeInOut",
    },
  },
  active: {
    opacity: [0, 0.1, 1],
    x: 0,
    transition: {
      type: "tween",
      duration: 1,
      ease: "easeIn",
      opacity: {
        type: "tween",
        duration: 1,
        times: [0.1, 0.2, 1],
        ease: "easeOut",
      },
    },
  },
};

const triLeft = {
  idle: {
    opacity: 0,
    x: -10,
    transition: {
      type: "tween",
      duration: 0.1,
      ease: "easeInOut",
    },
  },
  active: {
    opacity: [0, 0.1, 1],
    x: 0,
    transition: {
      type: "tween",
      duration: 1,
      ease: "easeIn",
      opacity: {
        type: "tween",
        duration: 1,
        times: [0.1, 0.2, 1],
        ease: "easeOut",
      },
    },
  },
};

const variantMap = {
  bgChange,
  iconZoom,
  titleZoom,
  textMove,
  triRight,
  triLeft,
};

export default function Animation({ isActive, animation = "", target, className = "" }) {
  const variants = variantMap[animation];

  return (
    <>
      <motion.div className={className} variants={variants} initial="idle" animate={isActive ? "active" : "idle"}>
        {target}
      </motion.div>
    </>
  );
}

/*

{


          if (!variants) {
    console.warn(`Animation variant "${animation}" not found`);
    return target;
    } 
  



return (
    <motion.div className="relative grid grid-cols-1 grid-rows-[auto] min-h-95 sm:h-100 md:h-[110%] max-w-[305px] md:max-w-full gap-2 place-self-center bg-cover bg-center" onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)} onFocus={() => setIsActive(true)} onBlur={() => setIsActive(false)} tabIndex={0}>
      <AnimatePresence>
        <motion.div className="absolute inset-0" variants={bgChange} initial="idle" animate={isActive ? "active" : "idle"}>
          <Image src={img} alt={`Picture of ${title}`} fill className="object-cover object-center pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div className="grid grid-cols-1 grid-rows-[auto]" >

          <article className="relative border-t-2 border-[#FF2A70] ">
            <LeftTriangle />
          </article>

          <article className="grid grid-cols-1 grid-rows-[1fr_auto_auto] gap-2 mx-8 lg:my-10 ">
            <div
              className="flex w-fit h-fit border-2 border-[#FF2A70] p-[1rem] justify-center place-self-center
              [&>*]:text-[#FF2A70] [&>*]:h-10 [&>*]:w-10 [&>*]:aspect-square [&>*]: "
            >
              {icon}
            </div>

            <p className="uppercase text-center text-2xl font-bold tracking-[0.5em]">{title}</p>

            <p className="text-center text-pretty">{text}</p>
         
            </article>
         
          <article className="relative border-b-2 border-[#FF2A70] ">
            <RightTriangle width={12} height={12} />
          </article>

        </motion.div>

      </AnimatePresence>

    </motion.div>          



*/
