import React from 'react';
import Card from 'components/atoms/Card';
import Button from 'components/atoms/Button';
import { SCTabWrapper, SCLinkSectionWrapper, SCFavoriteLinkWrapper, SCSongAndSearchSectionWrapper, SCListWrapper, SCNextLinkBtnWrapper, SCLinkCardWrapper, SCSongAndSearchCardWrapper, SCCountWrapper } from './styles';
import useLocalStorage from 'hooks/useLocalStorage';
import { copyToClipboard } from 'utils/copy';
import { youtubeList, googleSearchList, youtubeSongList } from 'constants/searchlist';

const LS_SEARCH_VISITED = 'searchVisited';
const LS_SONGS_VISITED = 'songsVisited';
const DEFAULT_LIST = [];
const YOUTUBE_PREFIX = 'https://www.youtube.com/watch?v=';
const GOOGLE_SEARCH_PREFIX = 'https://www.google.com/search?q=';
const NOT_FOUND_INDEX = -1;
const ZERO = 0;

const GoogleSearchList = () => {
  const [previouslyVisitedSearches, setPreviouslyVisitedSearches] = useLocalStorage(LS_SEARCH_VISITED, DEFAULT_LIST, true);

  const renderSearches = googleSearchList.map((searchItem) => {
    const isAlreadyVisited = previouslyVisitedSearches.some(item => item === searchItem);
    const url = `${GOOGLE_SEARCH_PREFIX}${searchItem}`;
    return <SCSongAndSearchCardWrapper isAlreadyVisited={isAlreadyVisited} key={searchItem}><Card body={<a href={url} target="_blank">{searchItem}</a>} /></SCSongAndSearchCardWrapper>;
  });
  const nextSearchItemIndex = googleSearchList.findIndex(url => {
    return !previouslyVisitedSearches.some(item => item === url);
  });
  const nextSearchItem = googleSearchList[nextSearchItemIndex];
  const nextSearchItemUrl = `${GOOGLE_SEARCH_PREFIX}${nextSearchItem}`;
  const numberOfSearchItemsLeft = nextSearchItemIndex === NOT_FOUND_INDEX ? ZERO : googleSearchList.length - nextSearchItemIndex;

  return (<SCSongAndSearchSectionWrapper>
    <SCNextLinkBtnWrapper>
      <h2>Search List: {numberOfSearchItemsLeft}</h2>
      <SCCountWrapper>
        <h3>{numberOfSearchItemsLeft} left</h3>
        <Button
          key='reset-search-visited'
          label='Reset'
          onClick={() => {
            setPreviouslyVisitedSearches([]);
          }}
        />
      </SCCountWrapper>
      {numberOfSearchItemsLeft ? <Button
        isPrimary
        key='next-search'
        label='Next Search'
        onClick={() => {
          const updatedList = previouslyVisitedSearches.concat([nextSearchItem]);
          setPreviouslyVisitedSearches(updatedList);
          copyToClipboard(nextSearchItem);
          window.open(nextSearchItemUrl, '_blank');
        }}
      /> : <></>}
    </SCNextLinkBtnWrapper>
    <SCListWrapper>
      {renderSearches}
    </SCListWrapper>
  </SCSongAndSearchSectionWrapper>);
};

const YoutubeSongList = () => {
  const [previouslyVisitedSongs, setPreviouslyVisitedSongs] = useLocalStorage(LS_SONGS_VISITED, DEFAULT_LIST, true);
  const renderSongs = youtubeSongList.map((url) => {
    const isAlreadyVisited = previouslyVisitedSongs.some(i => i === url);
    const uniqueSegment = url.replace(YOUTUBE_PREFIX,'');
    return <SCSongAndSearchCardWrapper isAlreadyVisited={isAlreadyVisited} key={url}><Card body={<a href={url} target="_blank">{uniqueSegment}</a>} /></SCSongAndSearchCardWrapper>;
  });
  const nextSongItemIndex = youtubeSongList.findIndex(url => {
    return !previouslyVisitedSongs.some(item => item === url);
  });
  const nextSongItemUrl = youtubeSongList[nextSongItemIndex];
  const numberOfSongItemsLeft = nextSongItemIndex === NOT_FOUND_INDEX ? ZERO : youtubeSongList.length - nextSongItemIndex;

  return (<SCSongAndSearchSectionWrapper>
    <SCNextLinkBtnWrapper>
      <h2>Youtube Songs</h2>
      <SCCountWrapper>
        <h3>{numberOfSongItemsLeft} left</h3>
        <Button
          key='reset-song-visited'
          label='Reset'
          onClick={() => {
            setPreviouslyVisitedSongs([]);
          }}
        />
      </SCCountWrapper>
      {numberOfSongItemsLeft ? <Button
        isPrimary
        key='next-youtube-song'
        label='Next Song'
        onClick={() => {
          const updatedList = previouslyVisitedSongs.concat([nextSongItemUrl]);
          setPreviouslyVisitedSongs(updatedList);
          copyToClipboard(nextSongItemUrl);
          window.open(nextSongItemUrl, '_blank');
        }}
      /> : <></>}
    </SCNextLinkBtnWrapper>
    <SCListWrapper>
      {renderSongs}
    </SCListWrapper>
  </SCSongAndSearchSectionWrapper>);
};

export const FavoriteLinks = () => {
  return ( <SCLinkSectionWrapper>
    {youtubeList.map(({ href, name, tag}) => {
      return (<SCFavoriteLinkWrapper key="name" onClick={() => {
        window.open(href, '_blank');
      }}>
        <SCLinkCardWrapper isAlreadyVisited={false}><Card body={<span>{tag}: <a href={href} target="_blank">{name}</a></span>} /></SCLinkCardWrapper>
      </SCFavoriteLinkWrapper>);
    })}
  </SCLinkSectionWrapper>);
};

export const HomeLinks = () => {
  return (
    <SCTabWrapper>
      <FavoriteLinks />
      {googleSearchList.length ? <GoogleSearchList /> : <></>}
      {youtubeSongList.length ? <YoutubeSongList /> : <></>}
    </SCTabWrapper>
  );
};
