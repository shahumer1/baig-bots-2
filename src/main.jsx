import { createRoot } from 'react-dom/client';
import { Page } from './components/Page.jsx';
import { getSavedTheme } from './theme/theme.js';
import './theme/colors.css';
import './styles.css';
import './inner-pages.css';
import './inner-hero.css';
import './custom-software.css';
import './service-experience.css';
import './service-growth.css';

document.documentElement.dataset.theme = getSavedTheme();
createRoot(document.getElementById('root')).render(<Page />);
