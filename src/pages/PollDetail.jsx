import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PollDetail() {
    const { id } = useParams();
    const [poll, setPoll] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState('');
    const [hasVoted, setHasVoted] = useState(false);
    const [error, setError] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/polls/${id}`);
                if (res.status === 404) {
                    setNotFound(true);
                    return;
                }
                const data = await res.json();
                setPoll(data);
            } catch (err) {
                setError("Erreur réseau lors du chargement.");
            }
        };
        fetchPoll();
    }, [id]);

    const handleVote = async (e) => {
        e.preventDefault();
        if (!selectedChoice) {
            setError("Veuillez sélectionner un choix !");
            return;
        }
        setError(null);

        try {
            const res = await fetch(`http://localhost:3001/api/polls/${id}/votes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ choiceId: selectedChoice }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.message);
            } else {
                setPoll(data);
                setHasVoted(true);
            }
        } catch (err) {
            setError("Erreur réseau lors du vote.");
        }
    };

    if (notFound) {
        return (
            <div className="card">
                <h2>Sondage introuvable</h2>
                <p>Le sondage demandé n'existe pas ou a été supprimé.</p>
                <Link to="/" className="btn">⬅️ Retour à la liste</Link>
            </div>
        );
    }

    if (!poll) return <div>Chargement...</div>;

    return (
        <div className="card">
            <h2>{poll.question}</h2>
            {error && <div className="alert-error">{error}</div>}

            {!hasVoted ? (
                <form onSubmit={handleVote}>
                    <div className="radio-group">
                        {poll.choices.map((choice) => (
                            <label key={choice.id} className="radio-option">
                                <input
                                    type="radio"
                                    name="choice"
                                    value={choice.id}
                                    onChange={(e) => setSelectedChoice(e.target.value)}
                                />
                                {choice.label}
                            </label>
                        ))}
                    </div>
                    <button type="submit" className="btn">Voter</button>
                </form>
            ) : (
                <div>
                    <p style={{ color: 'green', fontWeight: 'bold' }}>🎉 Vous avez déjà voté !</p>
                    {poll.choices.map((choice) => (
                        <div key={choice.id} style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{choice.label}</span>
                                <span>{choice.votes} vote(s) ({choice.percent}%)</span>
                            </div>
                            <div className="progress-bar-bg">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${choice.percent}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                    <p><strong>Total des votes :</strong> {poll.totalVotes}</p>
                </div>
            )}

            <div style={{ marginTop: '1.5rem' }}>
                <Link to="/" className="btn btn-secondary">⬅️ Retour à la liste</Link>
            </div>
        </div>
    );
}
