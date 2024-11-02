import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout } from "@/layouts/RootLayout";
import Dashboard from "@/dashboard.tsx";
import Settings from './settings';
import Profile from "@/profile.tsx";
import Tickets from "@/tickets.tsx";

function App() {
    return (
        <Router>
            <RootLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </RootLayout>
        </Router>
    );
}

export default App;