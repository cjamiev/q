import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import PageHeader from './PageHeader';
import { QuickAccess } from './QuickAccess';
import Navigation from './Navigation';
import './page.css';

const NAV_ITEMS = Object.values(ROUTES);
const ErrorPage = { label: 'Page Not Found' };

const Page = ({ children }) => {
  const location = useLocation();
  const currentPage = NAV_ITEMS.find((item) => item.url === location.pathname) || ErrorPage;

  return (
    <div className='page-layout'>
      <Navigation />
      <div className='page-wrapper'>
        <div className='page-content'>
          <PageHeader
            title={currentPage.label}
          />
          <QuickAccess />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
