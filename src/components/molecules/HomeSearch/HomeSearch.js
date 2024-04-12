import React from 'react';
import Card from 'components/atoms/Card';
import Button from 'components/atoms/Button';
import { SCSectionWrapper, SCNextLinkBtnWrapper, SCLinkCardWrapper } from './styles';
import useLocalStorage from 'hooks/useLocalStorage';
import { copyToClipboard } from 'utils/copy';
import { hyperlinklist } from 'constants/searchlist';

const LS_LINKS_VISITED = 'linksVisited';
const DEFAULT_LIST = [];
const YOUTUBE_PREFIX = 'https://www.youtube.com/watch?v=';
const GOOGLE_SEARCH_PREFIX = 'https://www.google.com/search?q=';

export const HomeSearch = () => {
  const [previouslyVisitedList, setPreviouslyVisitedList] = useLocalStorage(LS_LINKS_VISITED, DEFAULT_LIST, true);
  const renderLinks = hyperlinklist.map((item) => {
    //const uniqueSegment = url.replace(YOUTUBE_PREFIX,'');
    const isAlreadyVisited = previouslyVisitedList.some(i => i === item);
    const url = `${GOOGLE_SEARCH_PREFIX}${item}`;
    return <SCLinkCardWrapper isAlreadyVisited={isAlreadyVisited} key={item}><Card body={<a href={url} target="_blank">{item}</a>} /></SCLinkCardWrapper>;
  });
  const nextItemIndex = hyperlinklist.findIndex(url => {
    return !previouslyVisitedList.some(item => item === url);
  });
  const nextItem = hyperlinklist[nextItemIndex];
  const nextItemUrl = `${GOOGLE_SEARCH_PREFIX}${nextItem}`;
  const numberOfItemsLeft = hyperlinklist.length - nextItemIndex;

  return (
    <div>
      <SCNextLinkBtnWrapper>
        <h1>{numberOfItemsLeft} items to go through</h1>
        <Button
          isPrimary
          key='next-link'
          label='Next Link'
          onClick={() => {
            const updatedList = previouslyVisitedList.concat([nextItem]);
            setPreviouslyVisitedList(updatedList);
            copyToClipboard(nextItem);
            window.open(nextItemUrl, '_blank');
          }}
        />
      </SCNextLinkBtnWrapper>
      <SCSectionWrapper>
        {renderLinks}
      </SCSectionWrapper>
    </div>
  );
};
