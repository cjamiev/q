import Alert from './Alert/Alert';
import './page-header.css';

const PageHeader = ({ title }) => {
  return (
    <div className='page-header'>
      <h1 className='page-header-title'>{title}</h1>
      <Alert />
    </div>
  );
};

export default PageHeader;
