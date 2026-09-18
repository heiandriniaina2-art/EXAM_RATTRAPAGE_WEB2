import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PollList() {
    const [polls, setPolls] = useState([]);
    const [error, setError] = useState(null);

    const fetchPolls = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/polls');
            if (!res.ok) throw new Error("Erreur de chargement");
            const data = await res.json();
            setPolls(data);
        } catch (err) {
            setError("Impossible de récupérer les sondages.");
        }
    };

    useEffect(() => {
        fetchPolls();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce sondage ?")) return;

        try {
            const res = await fetch(`http://localhost:3001/api/polls/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setPolls(polls.filter((p) => p.id !== id));
            } else {
                const errData = await res.json();
                alert(errData.message || "Erreur lors de la suppression.");
            }
        } catch (err) {
            alert("Erreur réseau lors de la suppression.");
        }
    };

    return (
        <div>
            <h2>Sondages Récents</h2>
            {error && <div className="alert-error">{error}</div>}

            {polls.length === 0 ? (
                <div className="card">
                    <p> Aucun sondage disponible pour le moment. Créer un </p>
                </div>
            ) : (
                polls.map((poll) => (
                    <div key={poll.id} className="card">
                        <h3>{poll.question}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Créé le : {new Date(poll.createdAt).toLocaleString()} | {poll.choiceCount} choix | {
                            poll.totalVotes
                        } vote(s)
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Link to={`/polls/${poll.id}`} className="btn">
                                Voir le sondage
                            </Link>
                            <button onClick={() => handleDelete(poll.id)} className="btn btn-danger">
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
