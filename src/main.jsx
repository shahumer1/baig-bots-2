import { createRoot } from 'react-dom/client';
import { Page } from './components/Page.jsx';
import { getSavedTheme } from './theme/theme.js';
import './theme/colors.css';
import './styles.css';

document.documentElement.dataset.theme = getSavedTheme();
createRoot(document.getElementById('root')).render(<Page />);
