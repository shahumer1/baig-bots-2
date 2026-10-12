import { createRoot } from 'react-dom/client';
import { Page } from './components/Page.jsx';
import './theme/colors.css';
import './styles.css';

createRoot(document.getElementById('root')).render(<Page />);
