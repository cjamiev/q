import { useEffect, useState } from 'react';
import Page from '../../layout';
import { WorkDisplay } from './/Work/WorkDisplay';
import { WorkForm } from './/Work/WorkForm';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { LS_WORK_KEY } from '../../../constants/localstorage';
import { copyToClipboard } from '../../../utils/copy';
import './kanban.css';

const Kanban = () => {
  const [selected, setSelected] = useState('');

  const handleEdit = (id) => {
    setSelected(id);
  };

  return (
    <Page>
      <div className='kanban-wrapper'>
        <WorkForm selected={selected} handleEdit={handleEdit} />
        <WorkDisplay handleEdit={handleEdit} />
      </div>
    </Page>
  );
};

export default Kanban;
