import { useState } from 'react';
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

const WorkForm = () => {
  const [work, setWork] = useLocalStorage(LS_WORK_KEY, [], true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [urlLabel, setUrlLabel] = useState('');
  const [status, setStatus] = useState('not-started');
  const [links, setLinks] = useState([]);

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

    setWork(work.concat(newWorkItem));

    setTitle('');
    setDescription('');
    setStatus('not-started');
    setUrl('');
    setUrlLabel('');
    setLinks([]);
  }

  return (
    <div className='kanban-form-wrapper'>
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

const WorkDisplay = () => {
  const [work, setWork] = useLocalStorage(LS_WORK_KEY, [], true);

  return (<div className='kanban-work-wrapper'>
    {work.map(w => {
      return (<div key={w.title} className='kanban-work-card'>
        <h3>{w.title}</h3>
        <div className='kanban-work-description'>{w.description}</div>
        <div className='kanban-work-links'>
          {w.links.map(l => {
            return (<a key={l.url} href={l.url} target="_blank">{l.label || l.url}</a>)
          })}
        </div>
        <div className='kanban-work-status' data-status={w.status}>{statusMap[w.status]}</div>
      </div>)
    })}
  </div>)
};

const Kanban = () => {
  return (
    <Page>
      <WorkForm />
      <WorkDisplay />
    </Page>
  );
};

export default Kanban;

/*
Post Editable, Export:Convert to Markdown
*/