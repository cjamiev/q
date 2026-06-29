import { useState } from 'react';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { LS_WORK_KEY } from '../../../../constants/localstorage';
import { copyToClipboard } from '../../../../utils/copy';

const statusMap = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "review": "PR",
  "hold": "Hold",
  "testing": "QA",
  "done": "Done"
};

export const WorkDisplay = ({ handleEdit }) => {
  const [work, setWork] = useLocalStorage(LS_WORK_KEY, [], true);
  const [showEdit, setShowEdit] = useState(false);
  const [showDone, setShowDone] = useState(false);

  const visibleItems = showDone ? work : work.filter(w => w.status !== 'done');

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  }

  const toggleDone = () => {
    setShowDone(!showDone);
  }

  const handleCopy = (item) => {
    const links = item.links.map(l => {
      return `[${l.label}](${l.url})\n`;
    }).join('');
    copyToClipboard(`# ${item.title}\n${item.description}\n\n${links}`);
  }

  return (<div className='kanban-work-wrapper'>
    <div className='kanban-work-modes'>
      <label><input type="checkbox" checked={showEdit} onChange={toggleEdit} /> Edit Mode </label>
      <label><input type="checkbox" checked={showDone} onChange={toggleDone} /> Show Done </label>
    </div>
    {visibleItems.map(w => {
      return (<div key={w.title} className='kanban-work-card'>
        <h3>{w.title}</h3>
        <pre className='kanban-work-description'>{w.description}</pre>
        <div className='kanban-work-links'>
          {w.links.map(l => {
            return (<a key={l.url} href={l.url} target="_blank">{l.label || l.url}</a>)
          })}
        </div>
        <div className='kanban-work-status' data-status={w.status}>{statusMap[w.status]}</div>
        {showEdit && <button className='kanban-work-edit-btn' onClick={() => { handleEdit(w.id) }}>Edit</button>}
        <button className='kanban-work-copy-btn' onClick={() => { handleCopy(w) }}>Copy</button>
      </div>)
    })}
  </div>)
};
