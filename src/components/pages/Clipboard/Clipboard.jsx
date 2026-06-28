import Page from '../../layout';
import { Clips } from './Clips';
import { Timer } from './Timer';
import { Links } from './Links';
import './clipboard.css';

const Clipboard = () => {
  return (
    <Page>
      <div className='clipboard-sections'>
        <Clips />
        <Timer />
        <Links />
      </div>
    </Page>
  );
};

export default Clipboard;
