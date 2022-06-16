import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openGlobalModal } from 'components/molecules/Global/globalActions';
import { decrementElementIndex, incrementElementIndex } from 'utils/arrayHelper';
import { getEllipsisForLongText } from 'utils/stringHelper';
import { ArrowSVG } from 'components/atoms/Icons/ArrowSVG';
import { TrashSVG } from 'components/atoms/Icons';
import { PenSVG } from 'components/atoms/Icons/PenSVG';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Form/Text';
import ItemCreator from 'components/atoms/Form/ItemCreator';
import { noop } from 'utils/noop';
import { SCTodoTab, SCCreateFormFieldSet, SCTodoWrapper, SCTodoTitleWrapper, SCTodoList } from './styles';

const ZERO = 0;
const MAX_LENGTH = 18;

export const HomeTodo = ({ tasks, selectedTask, onChangeItem, onChange, onEditTask }) => {
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState('');
  const [taskNotes, setTaskNotes] = useState([]);
  const [taskUrls, setTaskUrls] = useState([]);

  useEffect(() => {
    if (selectedTask.text) {
      setTaskText(selectedTask.text);
      setTaskNotes(selectedTask.notes);
      setTaskUrls(selectedTask.urls);
    }
  }, [selectedTask]);

  const handleTextChange = ({ selected }) => {
    setTaskText(selected);
  };

  const handleNotesChange = (updatedNotes) => {
    setTaskNotes(updatedNotes);
  };

  const handleUrlsChange = (updatedUrls) => {
    setTaskUrls(updatedUrls);
  };

  const removeItem = (id) => {
    const updatedItems = tasks.filter((item) => item.id !== id);

    onChange(updatedItems);
  };

  const moveItemUp = (id) => {
    const index = tasks.findIndex((item) => item.id === id);
    const updatedItems = decrementElementIndex(tasks, index);

    onChange(updatedItems);
  };

  const moveItemDown = (id) => {
    const index = tasks.findIndex((item) => item.id === id);
    const updatedItems = incrementElementIndex(tasks, index);

    onChange(updatedItems);
  };

  const confirmDeleteTask = (taskName, taskId) => {
    dispatch(
      openGlobalModal({
        title: 'Confirmation Modal',
        message: `Are you sure you want to delete '${taskName}'`,
        buttonList: [
          {
            label: 'Confirm',
            isPrimary: true,
            action: () => {
              removeItem(taskId);
            }
          },
          {
            label: 'Cancel',
            isSecondary: true,
            action: noop
          }
        ]
      })
    );
  };

  return (
    <SCTodoTab>
      <form>
        <SCCreateFormFieldSet>
          <legend> Add Tasks </legend>
          <Text data-testid="todo-task" placeholder="Task" selected={taskText} onChange={handleTextChange} />
          <ItemCreator placeholder="Note" data={taskNotes} onChange={handleNotesChange} />
          <ItemCreator placeholder="Url" data={taskUrls} onChange={handleUrlsChange} />
          <Button
            data-testid="todo-add-btn"
            isPrimary
            label="Submit"
            onClick={(e) => {
              e.preventDefault();
              if (!taskText.length) {
                return;
              }

              const newItem = {
                text: taskText,
                notes: taskNotes,
                urls: taskUrls,
                id: Date.now()
              };
              setTaskText('');
              setTaskNotes([]);
              setTaskUrls([]);

              onChangeItem(newItem);
            }}
          />
        </SCCreateFormFieldSet>
      </form>
      {tasks.length > ZERO ? (
        tasks.map(({ id, text, notes, urls }) => (
          <SCTodoWrapper key={id}>
            <SCTodoTitleWrapper>
              <h2>{text}</h2>
              <TrashSVG
                width="27"
                height="27"
                onClick={() => {
                  confirmDeleteTask(text, id);
                }}
              />
              <ArrowSVG
                conditions={{ orientation: 'LEFT' }}
                ariaLabel="Move Up"
                width="27"
                height="27"
                onClick={() => {
                  moveItemUp(id);
                }}
              />
              <ArrowSVG
                conditions={{ orientation: 'RIGHT' }}
                ariaLabel="Move Down"
                width="27"
                height="27"
                onClick={() => {
                  moveItemDown(id);
                }}
              />
              <PenSVG
                ariaLabel="Edit"
                width="27"
                height="27"
                onClick={() => {
                  onEditTask({ id, text, notes, urls });
                }}
              />
            </SCTodoTitleWrapper>
            <SCTodoList>
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
              {urls.map((url) => (
                <a key={url} href={url} target="_blank">
                  <label>{getEllipsisForLongText(url, MAX_LENGTH)}</label>
                </a>
              ))}
            </SCTodoList>
          </SCTodoWrapper>
        ))
      ) : (
        <p> No tasks to display </p>
      )}
    </SCTodoTab>
  );
};
