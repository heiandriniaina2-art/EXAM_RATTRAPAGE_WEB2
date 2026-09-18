import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PollList from './pages/PollList';
import PollCreate from './pages/PollCreate';
import PollDetail from './pages/PollDetail';

export default function App() {
    return (
        <div>
            <Navbar />
            <main className="container">
                <Routes>
                    <Route path="/" element={<PollList />} />
                    <Route path="/create" element={<PollCreate />} />
                    <Route path="/polls/:id" element={<PollDetail />} />
                </Routes>
            </main>
        </div>
    );
}