// @ts-ignore
import * as repo from "../repositorie/polls.repository";
import type { Poll, DetailedPoll, SummaryPoll } from "../model/poll";

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export function formatDetailedPoll(poll: Poll): DetailedPoll {
    const totalVotes = poll.choices.reduce((sum, c) => sum + c.votes, 0);

    const choicesWithPercent = poll.choices.map((choice) => {
        const percent = totalVotes === 0 ? 0 : Math.round((choice.votes / totalVotes) * 100);
        return {
            ...choice,
            percent,
        };
    });

    return {
        id: poll.id,
        question: poll.question,
        createdAt: poll.createdAt,
        totalVotes,
        choices: choicesWithPercent,
    };
}

export async function getAllPolls(): Promise<SummaryPoll[]> {
    const polls = await repo.listPolls();

    (
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return sorted.map((p) => ({
        id: p.id,
        question: p.question,
        createdAt: p.createdAt,
        choiceCount: p.choices.length,
        totalVotes: p.choices.reduce((sum, c) => sum + c.votes, 0),
    }));
}

export async function getPollById(id: string): Promise<DetailedPoll> {
    const poll = await repo.getPoll(id);
    if (!poll) {
        throw new NotFoundError("Sondage introuvable.");
    }
    return formatDetailedPoll(poll);
}

export async function createPoll(questionRaw: any, choicesRaw: any): Promise<DetailedPoll> {
    if (typeof questionRaw !== "string") {
        // @ts-ignore
        throw new ValidationError


        const poll = await repo.getPoll(pollId);
        if (!poll) {
            throw new NotFoundError("Sondage introuvable.");
        }

        const exists = poll.choices.some((c) => c.id === choiceId);
        if (!exists) {
            throw new ValidationError("Le choix spécifié n'appartient pas à ce sondage.");
        }

        const updatedPoll = await repo.incrementVote(pollId, choiceId);
        if (!updatedPoll) {
            throw new NotFoundError("Sondage introuvable.");
        }

        return formatDetailedPoll(updatedPoll);
    }

    export async function deletePoll(id: string): Promise<void> {
        const success = await repo.removePoll(id);
        if (!success) {
            throw new NotFoundError("Sondage introuvable.");
        }
    }
