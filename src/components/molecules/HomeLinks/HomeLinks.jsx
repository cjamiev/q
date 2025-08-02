import React, { useEffect, useState } from 'react';
import {
  SCMusicCardWrapper,
  SCMusicCardLabel,
  SCMusicCardInput,
  SCMusicCardLink,
  SCMusicCardSubmit
} from './styles';
import { musiclist } from '../../../../tmp/musiclist';

const MusicCard = ({ index, link, name, band }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedName = document.getElementById(index + 'name').getAttribute('data-value') ?? name;
    const updatedBand = document.getElementById(index + 'band').getAttribute('data-value') ?? band;
    if (updatedName && updatedBand) {
      localStorage.setItem(index, JSON.stringify({ index, link, name: updatedName, band: updatedBand, rank: 3, isCompleted: true }));
    }
  }

  const onChange = (e, name) => {
    document.getElementById(index + name).setAttribute('data-value', e.target.value);
  }

  return (<SCMusicCardWrapper onSubmit={handleSubmit}>
    <SCMusicCardLink
      className="music-card-link"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      Youtube Song {index}
    </SCMusicCardLink>
    <SCMusicCardLabel>
      Name: <SCMusicCardInput id={index + 'name'} className="music-card-input" type="text" name="name" defaultValue={name} onChange={(e) => { onChange(e, 'name') }} />
    </SCMusicCardLabel>
    <SCMusicCardLabel>
      Band: <SCMusicCardInput id={index + 'band'} className="music-card-input" type="text" name="band" defaultValue={band} onChange={(e) => { onChange(e, 'band') }} />
    </SCMusicCardLabel>
    <SCMusicCardSubmit type="submit">
      Submit
    </SCMusicCardSubmit>
  </SCMusicCardWrapper>)
}

export const HomeLinks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [unfinishedSongs, setUnfinishedSongs] = useState([]);
  const [finishedSongs, setFinishedSongs] = useState([]);

  useEffect(() => {
    if (isLoading) {
      const loadedData = musiclist.map(item => {
        const storageItem = JSON.parse(localStorage.getItem(item.index) ?? '{}');
        return {
          ...item,
          ...storageItem
        }
      });
      const unfinished = loadedData.filter(i => !i.isCompleted);
      const finished = loadedData.filter(i => i.isCompleted);
      setUnfinishedSongs(unfinished);
      setFinishedSongs(finished)
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleFinishedSongs = () => {
    console.log(finishedSongs);
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <div>
        <div>Number of songs left: {unfinishedSongs.length}</div>
        <button onClick={handleFinishedSongs}>Get Finished Data</button>
      </div>
      {unfinishedSongs.map(musicitem => {
        return <MusicCard key={musicitem.index} {...musicitem} />
      })}
    </div>
  );
};