import React from 'react';
import { ClipboardDisplayContent } from '../../../components/atoms/ClipboardDisplayContent';

const List = React.memo(({ header, data, handleClick }) => {
  const renderContent = data.map((entry, index) => {
    const renderEntry = entry.map(({ type, label, value }) => {
      return <ClipboardDisplayContent key={`${type}-${label}-${value}`} type={type} label={label} value={value} />;
    });

    const className = handleClick ? 'list__content clickable' : 'list__content';

    return (
      <div key={index} className={className} onClick={() => handleClick && handleClick(index, entry)}>
        {renderEntry}
      </div>
    );
  });

  return (
    <div className="list">
      {header && <div className="list__header">{header}</div>}
      {renderContent}
    </div>
  );
});

export default List;
