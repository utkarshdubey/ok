import InfoBox from "@/components/InfoBox";
import Sparkles from "@/components/Sparkles/Sparkles";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import styled from "styled-components";
import React from "react";
import Link from "next/link";
import { score as ScoreAtom } from "@/state/atoms";
import { useRecoilState } from "recoil";
import useSound from "use-sound";

const Body = () => {

  const soundUrl = "/sounds/fanfare.mp3";
  const [play, { stop }] = useSound(soundUrl, { volume: 0.5 });
  play();
  
  const [score, setScore] = useRecoilState(ScoreAtom);
  React.useEffect(() => {
    
    if(!localStorage.getItem("score")) {
      localStorage.setItem("score", Number(0 + score).toString());
    } else {
      const previousScore = Number(localStorage.getItem("score"));
      localStorage.setItem("score", Number(previousScore + score).toString());
      setScore(Number(previousScore + score));
    }
  }, [])
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
      <div>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Sparkles>
            <Title>Keep going!</Title>
          </Sparkles>
        </motion.div>
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
          <InfoBox title={"Your score"} />
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Score>{score}</Score>
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Link href="/select">
            <Button>Go back</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

const ScoreComponent = () => {
  return <Layout body={<Body />} />;
};

const Title = styled.h1`
  line-height: 2.5rem;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
`;

const Score = styled.h1`
  line-height: 2.5rem;
  font-size: 5rem;
  font-weight: 600;
  text-align: center;
`;

export default ScoreComponent;
