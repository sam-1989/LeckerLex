import React, {useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import HintergrundVideo from '../../assets/videos/kochenderTopf.mp4';
import '../../assets/fonts/fonts.css';


const text = "Find delicious recipes with the ingredients you already have at home – clever and uncomplicated.";

const letterAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.1, ease: "easeOut" }
};

export default function LandingPage() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '0px',
  });

  useEffect(() => {
    if (inView && !videoLoaded) {
      setVideoLoaded(true);
    }
  }, [inView, videoLoaded]);

  useEffect(()=> {
    if (videoLoaded && videoRef.current) {
      videoRef.current.playbackRate = 0.7; 
    }
  }, [videoLoaded]);

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden font-sans flex flex-col items-center justify-center"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Hintergrundvideo einfügen */}
      {videoLoaded && (
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={HintergrundVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      )}

      {/* Website-Name */}
      <motion.div
        className="absolute top-5 left-2/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-green-900 text-4xl md:text-5xl font-bold">
          LeckerLex
        </h1>
      </motion.div>

      {/* Inhalt über dem Video */}
      <motion.div
        className="z-10 w-3/4 md:w-1/2 bg-black bg-opacity-0 p-4 rounded text-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <h1 className="text-gray-50 text-6xl md:text-5xl font-bold drop-shadow-2xl">
          Cooking made easy with what you have at home.
        </h1>
      </motion.div>

      {/* Button mit Framer Motion */}
      <motion.div
        className="z-10 w-3/4 md:w-1/2 text-center mt-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 5 }}
      >
        <Link to="/home">
          <button className="button px-8 py-4 text-lg md:text-xl bg-green-600 text-gray-100 rounded-full shadow-2xl hover:bg-green-700 transform hover:scale-110 transition-transform duration-300">
            Get inspired
          </button>
        </Link>
      </motion.div>

      <motion.div
        className="absolute bottom-10 w-full flex justify-center z-10 drop-shadow-md"
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.05, delayChildren: 2 }}
      >
      </motion.div>
    </motion.div>
  )
}



