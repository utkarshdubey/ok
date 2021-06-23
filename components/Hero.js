import styled from "styled-components";
import Layout from "@/components/Layout";
import InfoBox from "@/components/InfoBox";
import Sparkles from "@/components/Sparkles/Sparkles";
import Button from "@/components/Button";
import MapSvg from "./MapSvg";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import { language } from "@/state/atoms";
import { useRecoilValue } from "recoil";


const Body = () => {
  const lang = useRecoilValue(language);
  const fadeIn = {
    hidden: {
      scale: 0.5,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
  };
  return (
    <div>
  
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                opacity: 0,
                x: -100,
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.5,
                },
              },
            }}
          >
            <InfoBox title={lang ? "DPS Rau" : "डी पी एस राउ"} />
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Sparkles>
              <Title>
                {lang
                  ? "Play the quiz and learn about the amazing culture of india."
                  : "प्रश्नोत्तरी खेले और भारत की अखंड संस्कृति के बारे में अधिक जानें"}
              </Title>
            </Sparkles>
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Description>
              {lang
                ? `A voyage through Indian culture -- know about our lavish heritage
                  by playing an online quiz. Do you think you know about all the
                  states, we bet not!`
                : `आ वायेज थ्रू इंडियन कल्चर -- नो अबौट और लॅविश
                  हेरिटेज बाइ प्लेयिंग आन ऑनलाइन क्विज़. दो योउ थिंक योउ नो अबौट ऑल
                  थे स्टेट्स, वी बेट नोट!`}
            </Description>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.2,
                rotate: 45,
              },
              visible: {
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: {
                  delay: 0.5,
                },
              },
            }}
          >
            <Link href="/select">
            <Button
              id="signup"
            >
              {lang ? "Play" : "खेलें"}
            </Button>
            </Link>
          </motion.div>
    </div>
  )
}

const Hero = () => {
  return (
    <Layout body={<Body />} media={<MapSvg />} />
  );
};


const Title = styled.h1`
  line-height: 2.5rem;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
`;
const Description = styled.span`
  color: var(--primary-grey);
  text-align: center;
  font-weight: 600;
`;

export default Hero;
