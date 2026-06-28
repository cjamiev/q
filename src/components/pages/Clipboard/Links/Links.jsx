import { useState } from 'react';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { LS_LINKS_KEY } from '../../../../constants/localstorage';
import { unique } from '../../../../utils/arrayHelper';
import { capitalizeFirstLetter } from '../../../../utils/stringHelper';
import './links.css';


const LinkGroup = ({ entries, showEdit, deleteLinkItem, swapPositions }) => {
  return (entries.sort((a, b) => a.position - b.position).map((item, index) => {
    const { title, url, position } = item;
    return (<div key={title} className="links-item__container">
      <a className="links-item_href" href={url} target="_blank">{title}</a>
      {showEdit ? <div>
        <button className='links-item_moveup-btn' disabled={index === 0} onClick={() => swapPositions(position, entries[index - 1].position)}>Up</button>
        <button className='links-item_movedown-btn' disabled={index === entries.length - 1} onClick={() => swapPositions(position, entries[index + 1].position)}>Down</button>
        <button className='links-item_remove-btn' onClick={() => deleteLinkItem(title)}>Remove</button>
      </div> : null}
    </div>)
  }));
};

export const Links = () => {
  const [links, setLinks] = useLocalStorage(LS_LINKS_KEY, [], true);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const uniqueTypes = unique(links.map(l => l.type));

  const handleTitleChange = ({ target: { value } }) => {
    setTitle(value);
  };

  const handleUrlChange = ({ target: { value } }) => {
    setUrl(value);
  };

  const handleTypeChange = ({ target: { value } }) => {
    setType(value);
  };

  const addNewLinkItem = () => {
    setLinks(links.concat({ title, url, type: capitalizeFirstLetter(type.toLocaleLowerCase()), position: links.length }));
    setTitle('');
    setUrl('');
    setType('');
  }

  const swapPositions = (positionA, positionB) => {
    const updatedLinks = links.map((item) => {
      if (item.position === positionA) {
        return {
          ...item,
          position: positionB
        }
      } else if (item.position === positionB) {
        return {
          ...item,
          position: positionA
        }
      }
      return item;
    });
    setLinks(updatedLinks);
  }

  const deleteLinkItem = (d) => {
    const updatedLinks = links.filter(l => l.title !== d).map((item, index) => {
      return {
        ...item,
        position: index
      }
    })
    setLinks(updatedLinks);
  }

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  }

  const handleUrl = (value) => {
    copyToLinks(value);
    setShowCopySuccess(true);
    setTimeout(() => {
      setShowCopySuccess(false)
    }, 1500);
  }

  return (
    <div>
      <h2>Links</h2>
      <div className='links-new-item'>
        <input type="text" id="copy-label" name="copy-label" placeholder='title' value={title} onChange={handleTitleChange}></input>
        <input type="text" id="copy-value" name="copy-value" placeholder='url' value={url} onChange={handleUrlChange}></input>
        <input type="text" id="copy-type" name="copy-type" placeholder='type' value={type} onChange={handleTypeChange}></input>
        <button className='links-add-btn' onClick={addNewLinkItem}>Add</button>
        <label><input type="checkbox" checked={showEdit} onChange={toggleEdit} /> Edit Mode</label>
      </div>
      <div>
        {uniqueTypes.map(type => {
          const entries = links.filter(l => l.type === type);
          return (<div key={type} className='links-group-wrapper'>
            <h3>{type}</h3>
            <LinkGroup entries={entries} showEdit={showEdit} deleteLinkItem={deleteLinkItem} swapPositions={swapPositions} />
          </div>);
        })}
      </div>
    </div>
  );
};
