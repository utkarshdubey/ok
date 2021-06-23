import Link from "next/link";
import styled from "styled-components";
import Layout from "@/components/Layout";
import StateSelect from "@/components/StateSelect";
import InfoBox from "@/components/InfoBox";
import Sparkles from "@/components/Sparkles/Sparkles";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import React from "react";
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

  const [option, setOption] = React.useState("");
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
            {lang ? "Select your state:" : "अपना राज्य सेलेक्ट करें"}
          </Title>
        </Sparkles>
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <StateSelect
          value={option}
          handleChange={(e) => {
            setOption(e.target.value);
          }}
        />
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
        <Link href={`/quiz/${encodeURIComponent(option)}`}>
          <Button id="signup">{lang ? "Go!" : "गो!"}</Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default function Select() {
  return <Layout body={<Body />} />;
}

const Title = styled.h1`
  line-height: 2.5rem;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
`;
