import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  SCTitle,
  SCMusicCardSection,
  SCMusicCardWrapper,
  SCMusicCardLabel,
  SCMusicCardInput,
  SCMusicCardLink,
  SCMusicCardSubmit,
  SCDataBtn
} from './styles';
import { musiclist } from '../../../../tmp/musiclist';
import { createAlert } from '../../layout/Alert/alertActions';

const THREE_SECOND = 3000;

const MusicCard = ({ index, link, name, band, rank }) => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedName = document.getElementById(index + 'name').getAttribute('data-value').trim() ?? name;
    const updatedBand = document.getElementById(index + 'band').getAttribute('data-value').trim() ?? band;
    if (updatedName && updatedBand) {
      localStorage.setItem(index, JSON.stringify({ index, link, name: updatedName, band: updatedBand, rank, isCompleted: true }));
      dispatch(createAlert({ content: `Submitted ${updatedName}`, timer: THREE_SECOND, status: 'success' }));
    }
  }

  const onChange = (e, name) => {
    document.getElementById(index + name).setAttribute('data-value', e.target.value);
  }

  return (<SCMusicCardWrapper onSubmit={handleSubmit}>
    <SCMusicCardLink
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      Song {index}
    </SCMusicCardLink>
    <SCMusicCardLabel>
      Name: <SCMusicCardInput id={index + 'name'} type="text" name="name" defaultValue={name} onChange={(e) => { onChange(e, 'name') }} />
    </SCMusicCardLabel>
    <SCMusicCardLabel>
      Band: <SCMusicCardInput id={index + 'band'} type="text" name="band" defaultValue={band} onChange={(e) => { onChange(e, 'band') }} />
    </SCMusicCardLabel>
    <SCMusicCardLabel>Rank: {rank}</SCMusicCardLabel>
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
    console.log(finishedSongs.map(song => {
      return {
        id: song.name + song.band,
        name: song.name,
        album: '',
        band: song.band,
        rank: Number(song.rank),
        link: song.link,
        tags: '',
      }
    }));
  }

  return (
    <div>
      <div>
        <SCDataBtn onClick={handleFinishedSongs}>Get Finished Data</SCDataBtn>
        <SCTitle> Remaining {unfinishedSongs.length} items </SCTitle>
      </div>
      <SCMusicCardSection>
        {unfinishedSongs.map(musicitem => {
          return <MusicCard key={musicitem.index} {...musicitem} />
        })}
      </SCMusicCardSection>
    </div>
  );
};