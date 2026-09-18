import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PollCreate() {
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState(['', '']);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChoiceChange = (index, value) => {
        const newChoices = [...choices];
        newChoices[index] = value;
        setChoices(newChoices);
    };

    const addChoice = () => {
        if (choices.length < 5) {
            setChoices([...choices, '']);
        }
    };

    const removeChoice = (index) => {
        if (choices.length > 2) {
            setChoices(choices.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await fetch('http://localhost:3001/api/polls', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question, choices }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Erreur lors de la création.");
            } else {
                navigate(`/polls/${data.id}`);
            }
        } catch (err) {
            setError("Erreur réseau.");
        }
    };

    return (
        <div className="card">
            <h2>Nouveau Sondage</h2>
            {error && <div className="alert-error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <label style={{ fontWeight: 'bold' }}>Question :</label>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Ex: Quel restaurant ce midi ? (5 à 120 car.)"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <label style={{ fontWeight: 'bold' }}>Choix de réponse (2 à 5) :</label>
                {choices.map((choice, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <input
                            type="text"
                            className="input-field"
                            style={{ marginBottom: 0 }}
                            placeholder={`Choix ${index + 1}`}
                            value={choice}
                            onChange={(e) => handleChoiceChange(index, e.target.value)}
                        />
                        {choices.length > 2 && (
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeChoice(index)}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}

                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    {choices.length < 5 && (
                        <button type="button" className="btn btn-secondary" onClick={addChoice}>
                            ➕ Ajouter un choix
                        </button>
                    )}
                    <button type="submit" className="btn">
                        Créer le sondage
                    </button>
                </div>
            </form>
        </div>
    );
}
