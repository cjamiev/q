import { useState } from 'react';
import { copyToClipboard } from '../../../../utils/copy';

const statusMap = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "review": "PR",
  "hold": "Hold",
  "testing": "QA",
  "done": "Done"
};

export const WorkDisplay = ({ work, handleEdit }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const visibleItems = showFavorites ? work.filter(w => w.isFavorite) : work;

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  }

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
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
      <label><input type="checkbox" checked={showFavorites} onChange={toggleFavorites} /> Show Favorites Only </label>
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
        <div className='kanban-work-is-favorite'>{w.isFavorite ? 'Favorite' : ''}</div>
        {showEdit && <button className='kanban-work-edit-btn' onClick={() => { handleEdit(w.id) }}>Edit</button>}
        <button className='kanban-work-copy-btn' onClick={() => { handleCopy(w) }}>Copy</button>
      </div>)
    })}
  </div>)
};
