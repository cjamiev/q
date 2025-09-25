import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../components/atoms/Button';
import { CloseSVG } from '../../../components/atoms/Icons/CloseSVG';
import { noop } from '../../../utils/noop';
import { SCModal, SCModalHeader, SCModalTitle, SCModalBody, SCModalFooter } from './styles';

const Modal = (props) => {
  const dispatch = useDispatch();
  const { title, message, editable = false, dispatchAction, beforeClose = noop, close = noop, buttonList = [] } = props;
  const [content, setContent] = useState(message);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setContent(message);
  }, [message]);

  const renderButtons = buttonList.map((item) => {
    if (item.label) {
      return (
        <Button
          isprimary={item.isPrimary}
          key={item.label}
          label={item.label}
          {...item.classProps}
          onClick={() => {
            item.action();
            beforeClose();
            close();
          }}
        />
      );
    }

    return null;
  });

  if (dispatchAction) {
    renderButtons.push(
      <Button
        key={dispatchAction.label}
        label={dispatchAction.label}
        disabled={err}
        onClick={() => {
          dispatch(dispatchAction.action(dispatchAction.parse(content)));
          beforeClose();
          close();
        }}
      />
    );
  }

  const handleContentChange = ({ target: { value } }) => {
    setContent(value);
  };


  const renderBody = editable ? (
    <SCModalBody className="scrollbar">
      <textarea ariaLabel="Modal text area" value={content} jsonType={true} onChange={handleContentChange} />
    </SCModalBody>
  ) : (
    <SCModalBody className="scrollbar">{content}</SCModalBody>
  );
  const renderTitle = (
    <SCModalHeader>
      <SCModalTitle>{title}</SCModalTitle>
    </SCModalHeader>
  );
  const renderFooter = <SCModalFooter>{renderButtons}</SCModalFooter>;

  return (
    <SCModal>
      <CloseSVG
        transform="scale(0.5)"
        ariaLabel="Close Modal"
        width="45"
        onClick={() => {
          beforeClose();
          close();
        }}
      />
      {renderTitle}
      {renderBody}
      {renderFooter}
    </SCModal>
  );
};

export default Modal;
