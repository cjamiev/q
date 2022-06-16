import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadClipboard } from './clipboardActions';
import { openGlobalModal, clearCommand } from 'components/molecules/Global/globalActions';
import { copyToClipboard } from 'utils/copy';
import Page from 'components/layout';
import ClipboardList from 'components/molecules/ClipboardList';
import Tabs from 'components/atoms/Tabs';
import Text from 'components/atoms/Form/Text';
import ComponentWrapper from 'components/atoms/ComponentWrapper';
import ClipboardForm from 'components/organisms/ClipboardForm';
import { SCClipboardContainer } from './styles';

const ZERO = 0;

const ClipboardTab = (props) => {
  return (
    <SCClipboardContainer>
      {props.clip.map((entry) => {
        return <ClipboardList key={entry.title} header={entry.title} data={entry.data} />;
      })}
    </SCClipboardContainer>
  );
};

const Clipboard = () => {
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.clipboard);
  const { commandResponse } = useSelector((state) => state.global);
  const TABS = Object.keys(records).map((filename) => {
    const name = filename.split('.')[ZERO];

    return { title: name, component: ComponentWrapper(ClipboardTab, { clip: records[name] }) };
  });
  const memoizedData = useMemo(() => {
    const data = [];

    Object.keys(records).forEach((filename) => {
      const name = filename.split('.')[ZERO];
      const tab = records[name];
      const sectionData = tab.map((item) => item.data);
      sectionData.forEach((entry) => {
        entry.forEach((item) => data.push(item));
      });
    });

    return data;
  }, [records]);

  useEffect(() => {
    dispatch(loadClipboard());
  }, [dispatch]);

  useEffect(() => {
    if (commandResponse) {
      const parsedResult = commandResponse.replace(/\\r/g, '').split('\n');
      const renderResult = parsedResult.map((item, index) => {
        return <p key={index}>{item}</p>;
      });
      dispatch(
        openGlobalModal({
          title: 'Command Results',
          message: renderResult,
          beforeClose: () => {
            dispatch(clearCommand());
          },
          buttonList: [
            {
              label: 'Copy',
              classProps: { classColor: 'primary' },
              action: () => {
                copyToClipboard(JSON.stringify(commandResponse));
              }
            }
          ]
        })
      );
    }
  }, [dispatch, commandResponse]);

  const handleFilterChange = ({ selected }) => {
    setFilter(selected);
  };

  const filteredData =
    memoizedData.length > ZERO &&
    memoizedData.filter((entry) => {
      return entry.some((item) => {
        return item.label.toUpperCase().includes(filter.toUpperCase());
      });
    });

  return (
    <Page sidePanelContent={<ClipboardForm records={records} />} isSidePanelWide={true}>
      <Text placeholder="Filter by label" selected={filter} onChange={handleFilterChange} />
      {TABS.length > ZERO && !filter && <Tabs data={TABS} />}
      {filter && <ClipboardList header={`filtered by ${filter}`} data={filteredData || []} />}
    </Page>
  );
};

export default Clipboard;
