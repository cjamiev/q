import Page from '../../layout';
import { Clips } from './Clips';
import { Timer } from './Timer';
import './clipboard.css';

const Clipboard = () => {
  return (
    <Page>
      <div className='clipboard-sections'>
        <Clips />
        <Timer />
      </div>
    </Page>
  );
};

export default Clipboard;
