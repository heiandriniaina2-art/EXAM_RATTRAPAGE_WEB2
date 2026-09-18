import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
// @ts-ignore
import type { Poll } from "../model/poll";

const DATA_FILE = path.resolve(process.cwd(), "data/polls.json");
type Store = { polls: Poll[] };

async function readStore(): Promise<Store> {
    const raw = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Store;
}

async function writeStore(store: Store): Promise<void> {
    await writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
}
export async function listPolls(): Promise<Poll[]> {
    const store = await readStore();
    return store.polls;
}
export async function getPoll(id: string): Promise<Poll | undefined> {
    const store = await readStore();
    return store.polls.find((poll) => poll.id === id);
}
export async function insertPoll(poll: Poll): Promise<void> {
    const store = await readStore();
    store.polls.push(poll);
    await writeStore(store);
}
