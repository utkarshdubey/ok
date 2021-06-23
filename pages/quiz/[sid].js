import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import questionData from "@/static/Questions.json";
import Quiz from "@/components/Quiz";

import React from "react";

export async function getServerSideProps(ctx) {
    const { sid } = ctx.query;
    return {
      props: {
        id: sid,
      },
    };
  }

const Body = ({ id }) => {
    console.log(id)
  const router = useRouter();
  const { sid } = router.query;
  const questions = questionData[sid.toLowerCase()];

  return <Quiz stateName={sid} questions={questions} />;
};

export default function StateQuiz() {
  return <Layout body={<Body />} />;
}
