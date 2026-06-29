import { useEffect, useState } from 'react';
import Page from '../../layout';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { LS_WORK_KEY } from '../../../constants/localstorage';
import './kanban.css';

const statusMap = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "review": "PR",
  "hold": "Hold",
  "testing": "QA",
  "done": "Done"
};

const WorkForm = ({ selected, handleEdit }) => {
  const [work, setWork] = useLocalStorage(LS_WORK_KEY, [], true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [urlLabel, setUrlLabel] = useState('');
  const [status, setStatus] = useState('not-started');
  const [links, setLinks] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const matched = work.find(w => w.title === selected);
    if (matched) {
      setTitle(matched.title);
      setDescription(matched.description);
      setStatus(matched.status);
      setLinks(matched.links);
      setShow(true);
    }
  }, [selected])

  const handleTitleChange = ({ target: { value } }) => {
    setTitle(value);
  };

  const handleDescriptionChange = ({ target: { value } }) => {
    setDescription(value);
  };

  const handleUrlChange = ({ target: { value } }) => {

    setUrl(value);
  };

  const handleUrlLabelChange = ({ target: { value } }) => {
    setUrlLabel(value);
  };

  const handleAddLinksChange = ({ target: { value } }) => {
    setLinks(links.concat({ url, label: urlLabel }));
    setUrl('');
    setUrlLabel('');
  };

  const handleRemoveLinkChange = (value) => {
    setLinks(links.filter(l => l.url !== value));
  }

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSave = () => {
    const newWorkItem = {
      title,
      description,
      status,
      links
    };

    const matched = work.find(w => w.title === title);
    if (matched) {
      const updated = work.map(w => {
        if (w.title === title) {
          return newWorkItem;
        }
        else {
          return w;
        }
      });
      setWork(updated);
    } else {
      setWork(work.concat(newWorkItem));
    }

    setTitle('');
    setDescription('');
    setStatus('not-started');
    setUrl('');
    setUrlLabel('');
    setLinks([]);
    handleEdit('');
  }

  const toggleSidebar = () => {
    setShow(!show);
  }

  if (!show) {
    return (<div className='kanban-form-wrapper_collapsed'>
      <button className='kanban-form-show-btn kanban-form-show-btn_collapsed' onClick={toggleSidebar}>O</button>
    </div>);
  }

  return (
    <div className='kanban-form-wrapper'>
      <button className='kanban-form-show-btn' onClick={toggleSidebar}>X</button>
      <h2>Add Work Item</h2>
      <input className="kanban-form_title" type="text" id="copy-label" name="copy-label" placeholder='title' value={title} onChange={handleTitleChange}></input>
      <textarea
        className='kanban-form_description'
        value={description}
        onChange={handleDescriptionChange}
        placeholder='description'
      ></textarea>
      <select
        className='kanban-form__status'
        value={status}
        onChange={handleStatusChange}
      >
        <option value="not-started">Not Started</option>
        <option value="in-progress">In Progress</option>
        <option value="review">PR</option>
        <option value="hold">Hold</option>
        <option value="testing">QA</option>
        <option value="done">Done</option>
      </select>
      <div className='kanban-form__url-container'>
        <div className='kanban-form__url-add'>
          <input type="text" id="url" name="url" placeholder='url' value={url} onChange={handleUrlChange}></input>
          <input type="text" id="label" name="label" placeholder='label' value={urlLabel} onChange={handleUrlLabelChange}></input>
          <button onClick={handleAddLinksChange}>Add</button>
        </div>
        {links.length > 0 && <div className='kanban_url-list'>
          {links.map(l => {
            return (<div key={l.url}>
              <a href={l.url} target="_blank">{l.label || l.url}</a>
              <button onClick={() => handleRemoveLinkChange(l.url)}>Remove</button>
            </div>)
          })}
        </div>}
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

const WorkDisplay = ({ handleEdit }) => {
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


  return (<div className='kanban-work-wrapper'>
    <label><input type="checkbox" checked={showEdit} onChange={toggleEdit} /> Edit Mode</label>
    <label><input type="checkbox" checked={showDone} onChange={toggleDone} /> Show Done</label>
    {visibleItems.map(w => {
      return (<div key={w.title} className='kanban-work-card'>
        <h3>{w.title}</h3>
        <div className='kanban-work-description'>{w.description}</div>
        <div className='kanban-work-links'>
          {w.links.map(l => {
            return (<a key={l.url} href={l.url} target="_blank">{l.label || l.url}</a>)
          })}
        </div>
        <div className='kanban-work-status' data-status={w.status}>{statusMap[w.status]}</div>
        {showEdit && <button className='kanban-work-edit-btn' onClick={() => { handleEdit(w.title) }}>Edit</button>}
      </div>)
    })}
  </div>)
};

const Kanban = () => {
  const [selected, setSelected] = useState('');

  const handleEdit = (title) => {
    console.log(title)
    setSelected(title);
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

/*
Post Editable, Export:Convert to Markdown
*/