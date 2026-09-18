import { Router, Request, Response } from "express";
import * as service from "../service/polls.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const list = await service.getAllPolls();
        res.json(list);
    } catch (err: any) {
        res.status(500).json({ message: "Erreur serveur interne." });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const { question, choices } = req.body;
        const created = await service.createPoll(question, choices);
        res.status(201).json(created);
    } catch (err: any) {
        if (err instanceof service.ValidationError) {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: "Erreur lors de la création du sondage." });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const poll = await service.getPollById(req.params.id);
        res.json(poll);
    } catch (err: any) {
        if (err instanceof service.NotFoundError) {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ message: "Erreur serveur." });
    }
});

router.post("/:id/votes", async (req: Request, res: Response) => {
    try {
        const { choiceId } = req.body;
        const updated = await service.votePoll(req.params.id, choiceId);
        res.json(updated);
    } catch (err: any) {
        if (err instanceof service.NotFoundError) {
            return res.status(404).json({ message: err.message });
        }
        if (err instanceof service.ValidationError) {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: "Erreur lors de l'enregistrement du vote." });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        await service.deletePoll(req.params.id);
        res.status(204).send();
    } catch (err: any) {
        if (err instanceof service.NotFoundError) {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ message: "Erreur lors de la suppression." });
    }
});

export default router;
