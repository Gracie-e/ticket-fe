import './App.css'
import { Tickets } from './components/tickets/Tickets';
import './index.css'
import {RootLayout} from "@/layouts/RootLayout.tsx";

function App() {
    return (
        <RootLayout>
            <Tickets />
        </RootLayout>
    );
}

export default App;