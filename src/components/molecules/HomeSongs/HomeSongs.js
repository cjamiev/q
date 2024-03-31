import React from 'react';
import Card from 'components/atoms/Card';
import Button from 'components/atoms/Button';
import { SCSectionWrapper, SCNextSongBtnWrapper, SCSongCardWrapper } from './styles';
import useLocalStorage from 'hooks/useLocalStorage';
import { youtubesonglist } from 'constants/songlist';

const ZERO = 0;
const LS_SONG_VISITED = 'songsVisited';
const DEFAULT_LIST = [];

export const HomeSongs = () => {
  const [previouslyVisitedList, setPreviouslyVisitedList] = useLocalStorage(LS_SONG_VISITED, DEFAULT_LIST, true);
  const renderSongs = youtubesonglist.map((url) => {
    const uniqueSegment = url.replace('https://www.youtube.com/watch?v=','');
    const isAlreadyVisited = previouslyVisitedList.some(item => item === url);
    return <SCSongCardWrapper isAlreadyVisited={isAlreadyVisited} key={uniqueSegment}><Card body={<a href={url} target="_blank">{uniqueSegment}</a>} /></SCSongCardWrapper>;
  });
  const nextsongIndex = youtubesonglist.findIndex(url => {
    return !previouslyVisitedList.some(item => item === url);
  });
  const nextsong = youtubesonglist[nextsongIndex];
  const numberOfSongsLeft = youtubesonglist.length - nextsongIndex;

  return (
    <div>
      <SCNextSongBtnWrapper>
        <h1>Youtube Songs: {numberOfSongsLeft} left to go</h1>
        <Button
          isPrimary
          key='next-song'
          label='Next Song'
          onClick={() => {
            window.open(nextsong, '_blank');
            const updatedList = previouslyVisitedList.concat([nextsong]);
            setPreviouslyVisitedList(updatedList);
          }}
        />
      </SCNextSongBtnWrapper>
      <SCSectionWrapper>
        {renderSongs}
      </SCSectionWrapper>
    </div>
  );
};
