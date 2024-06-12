import { Button, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-scroll";
import './css/Footer.css';

const Footer = () => {
  const motionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { ease: "easeIn", duration: 0.6 } },
  };
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <footer id="footer-box" className="bg-white mt-20 px-8">
      <motion.div
        className="flex flex-col py-6 left-10 right-10 w-full"
        initial="hidden"
        animate={controls}
        variants={motionVariants}
        ref={ref}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl">
              Subscribe our newsletter to get updates.
            </h1>

            <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
              <input
                id="email"
                type="text"
                className="px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500  focus:outline-none"
                placeholder="Email Address"
              />

              <Button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-blue-500 rounded-lg hover:bg-blue-600" ripple>
                Subscribe
              </Button>
            </div>
          </div>

          <section>
            <p className="font-semibold text-gray-800">
              Quick Links
            </p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="/heatmap"
                smooth={true}
                duration={500}
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 cursor-pointer"
              >
                HeatMap
              </a>
              <a
                href="/charts"
                smooth={true}
                duration={500}
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 cursor-pointer"
              >
                Tracker
              </a>
            </div>
          </section>

          <section>
            <p className="font-semibold text-gray-800">
              Contacts
            </p>

            <div className="flex flex-col items-start mt-5 space-y-2 mb-5">
              <a
                href="https://t.me/lumenhold"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500"
              >
                Telegram
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500"
              >
                FaceBook
              </a>
              
            </div>
          </section>
        </div>



        <div className="flex items-center justify-center">
          <Typography
            variant="small"
            color="blue-gray"
            className="text-black ml-4 font-medium"
          >
            © 2024 LumenHold. All rights reserved.
          </Typography>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
