import InfoBox from "@/components/InfoBox";
import Sparkles from "@/components/Sparkles/Sparkles";
import { motion } from "framer-motion";
import styled from "styled-components";
import React from "react";
import { useTimer } from "react-timer-hook";
import {
  language,
  score as ScoreAtom,
  confetti as ConfettiAtom,
} from "@/state/atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import useSound from "use-sound";

function Timer({ seconds }) {
  return (
    <div>
      <TimerShit>{seconds}</TimerShit>
    </div>
  );
}

const Quiz = ({ stateName, questions, changeQuestion }) => {
  const soundUrl = "/sounds/pfff.mp3";
  const [play, { stop }] = useSound(soundUrl, { volume: 0.5 });

  const setConfetti = useSetRecoilState(ConfettiAtom);
  const router = useRouter();

  const [questionLevel, setQuestionLevel] = React.useState(0);
  const [score, setScore] = useRecoilState(ScoreAtom);

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 5);

  const { seconds, minutes, hours, days, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 5);
        restart(time);
        nextQuestion();
      },
    });

  const lang = useRecoilValue(language);
  const nextQuestion = () => {
    if (questionLevel > questions.length - 2) {
      return router.push("/score");
    }

    setQuestionLevel(questionLevel + 1);
  };

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
    <>
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
          <InfoBox
            title={
              questions[questionLevel].image
                ? questions[questionLevel].image
                : `${stateName} - ${questionLevel} out of 6.`
            }
            isLink={questions[questionLevel].image}
          />
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Sparkles>
            <Title>
              {lang
                ? questions[questionLevel].prompt
                : questions[questionLevel].prompt_hindi}
            </Title>
          </Sparkles>
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          {lang
            ? questions[questionLevel].options.map((question, index) => (
                <AnswerChoice
                  key={index}
                  isAnswer={index === questions[questionLevel].correct}
                  onClick={() => {
                    if (index === questions[questionLevel].correct) {
                      setConfetti(true);
                      setTimeout(setConfetti(false), 30000);
                      play();
                    }
                    if (index === questions[questionLevel].correct) {
                      setScore(score + 1);
                      nextQuestion(questionLevel);
                    } else {
                      nextQuestion(questionLevel);
                    }
                  }}
                  onMouseLeave={() => {}}
                >
                  {question}
                </AnswerChoice>
              ))
            : questions[questionLevel].options_hindi.map((question, index) => (
                <AnswerChoice
                  key={index}
                  isAnswer={index === questions[questionLevel].correct}
                  onClick={() => {
                    if (index === questions[questionLevel].correct) {
                      play();
                    }
                    if (index === questions[questionLevel].correct) {
                      setScore(score + 1);
                      nextQuestion(questionLevel);
                    } else {
                      nextQuestion(questionLevel);
                    }
                  }}
                  onMouseLeave={() => {}}
                >
                  {question}
                </AnswerChoice>
              ))}
        </motion.div>
        <Timer seconds={seconds} />
      </div>
    </>
  );
};

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin: 20px 0px;
`;

const TimerShit = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  padding: 20px 20px;
  margin: 0px 10px;
  background: #9796f0;
  color: white;
  background: var(--background-grey);
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const AnswerChoice = styled.button`
  font-weight: 800;
  display: inline-block;
  width: 100%;
  padding: 15px 80px;
  border-width: 0;
  font-size: 0.8rem;
  text-align: center;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
  background: transparent;
  text-decoration: none;
  margin: 10px 0px;
  position: relative;
  border: 4px solid var(--primary);
  border-radius: 20px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  z-index: 20;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background: var(--primary);
    color: white;
  }
  &:focus {
    outline: none;
    box-shadow: none;
    background: ${(props) =>
      props.isAnswer ? "var(--success)" : "var(--danger)"};
    color: white;
    border: 4px solid
      ${(props) => (props.isAnswer ? "var(--success)" : "var(--danger)")};
  }
`;

export default Quiz;
