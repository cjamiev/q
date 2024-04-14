import styled from 'styled-components';

export const SCTabWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  `;

export const SCLinkSectionWrapper = styled.div`
  flex: 5;
  display: flex;
  flex-wrap: wrap;
  margin: 3px;
`;

export const SCFavoriteLinkWrapper = styled.div`
  cursor: pointer;
`;

export const SCSongAndSearchSectionWrapper = styled.div`
  flex: 3;
  margin: 3px;
`;

export const SCListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SCNextLinkBtnWrapper = styled.div`
  display: block;
  margin-bottom: 10px;

  button {
    width: 250px;
  }
`;

export const SCLinkCardWrapper = styled.div`
> div {
    background-color: #e1dfdf;
    height: 50px;
    width: 300px;
  }

  > div > div {
    text-align: center;
    margin: 0;
  }
`;

export const SCSongAndSearchCardWrapper = styled.div`
> div {
    background-color: ${(props) => (props.isAlreadyVisited ? 'black' : 'white')};
    height: 40px;
    width: 180px;
  }

  > div > div {
    text-align: center;
    margin: 0;
  }
`;

export const SCCountWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;

  button {
    width: 80px;
    min-height: unset;
    height: 25px;
    font-size: 14px;
    margin-left: 5px;
  }
`;
