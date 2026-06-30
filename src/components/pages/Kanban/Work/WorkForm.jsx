import { useEffect, useState } from 'react';

export const WorkForm = ({ work, onHandleWorkChange, selected, handleEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [urlLabel, setUrlLabel] = useState('');
  const [status, setStatus] = useState('not-started');
  const [isFavorite, setIsFavorite] = useState(false);
  const [links, setLinks] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    const matched = work.find(w => w.id === selected);
    if (matched) {
      setTitle(matched.title);
      setDescription(matched.description);
      setStatus(matched.status);
      setLinks(matched.links);
      setId(matched.id);
      setIsFavorite(matched.isFavorite);
      setShow(true);
    } else {
      setId(work.length + 1);
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

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  }

  const handleSave = () => {
    const newWorkItem = {
      title,
      description,
      status,
      isFavorite,
      links,
      id
    };

    const matched = work.find(w => w.id === id);
    if (matched) {
      const updated = work.map(w => {
        if (w.id === id) {
          return newWorkItem;
        }
        else {
          return w;
        }
      });
      onHandleWorkChange(updated);
    } else {
      onHandleWorkChange(work.concat(newWorkItem));
    }

    setTitle('');
    setDescription('');
    setStatus('not-started');
    setUrl('');
    setUrlLabel('');
    setLinks([]);
    handleEdit('');
    setShow(false);
  }

  const handleClear = () => {
    setTitle('');
    setDescription('');
    setStatus('not-started');
    setUrl('');
    setUrlLabel('');
    setLinks([]);
    setId(work.length + 1);
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
          <button className='kanban-form-btn' onClick={handleAddLinksChange}>Add</button>
        </div>
        {links.length > 0 && <div className='kanban_url-list'>
          {links.map(l => {
            return (<div key={l.url}>
              <a href={l.url} target="_blank">{l.label || l.url}</a>
              <button className='kanban-form-btn' onClick={() => handleRemoveLinkChange(l.url)}>Remove</button>
            </div>)
          })}
        </div>}
      </div>
      <label><input type="checkbox" checked={isFavorite} onChange={toggleFavorite} /> Is Favorite? </label>
      <div className='kanban-form_btn-wrapper'>
        <button className='kanban-form-btn' onClick={handleSave}>Save</button>
        <button className='kanban-form-btn' onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};