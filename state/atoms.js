import { atom } from "recoil";


export const language = atom({
    key: "language",
    default: true
});

export const score = atom({
    key: "score",
    default: 0
})

export const confetti = atom({
    key: "confetti",
    default: false
})