export type Choice = {
    id: string;
    label: string;
    votes: number;
};

export type Poll = {
    id: string;
    question: string;
    createdAt: string;
    choices: Choice[];
};

export type DetailedChoice = Choice & {
    percent: number;
};

export type DetailedPoll = Omit<Poll, "choices"> & {
    totalVotes: number;
    choices: DetailedChoice[];
};

export type SummaryPoll = {
    id: string;
    question: string;
    createdAt: string;
    choiceCount: number;
    totalVotes: number;
};
