import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGlobal } from 'components/molecules/Global/globalActions';
import { loadHome, updateHome } from './homeActions';
import Page from 'components/layout';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Form/Text';
import Tabs from 'components/atoms/Tabs';
import TimerForm from 'components/atoms/Form/TimerForm';
import ComponentWrapper from 'components/atoms/ComponentWrapper';
import { HomeTodo } from 'components/molecules/HomeTodo';
import { HomeTimer } from 'components/molecules/HomeTimer';

const Home = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const [timers, setTimers] = useState([]);
  const [selectedTask, setSelectedTask] = useState({ text: '', notes: [], urls: [] });
  const [selectedTimer, setSelectedTimer] = useState({ id: -1, name: '', time: new Date() });
  const records = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(loadHome());
  }, [dispatch]);

  useEffect(() => {
    setTimers(records.timers);
    setTasks(records.todos);
  }, [records]);

  const handleTaskItemChange = (newItem) => {
    const matched = tasks.find((item) => item.text === newItem.text);
    const updatedTasks = matched
      ? tasks.map((item) => (item.text === newItem.text ? newItem : item))
      : tasks.concat(newItem);

    setTasks(updatedTasks);
    dispatch(updateHome({ todos: updatedTasks, timers }));
  };

  const handleTasksChange = (updatedTasks) => {
    setTasks(updatedTasks);
    dispatch(updateHome({ todos: updatedTasks, timers }));
  };

  const handleEditTask = (item) => {
    setSelectedTask(item);
  };

  const handleTimeItemChange = (newTimer) => {
    const matched = timers.find((item) => item.name === newTimer.name);
    const updatedTimers = matched
      ? timers.map((item) => (item.name === newTimer.name ? newTimer : item))
      : timers.concat(newTimer);
    setTimers(updatedTimers);
    dispatch(updateGlobal(updatedTimers));
    dispatch(updateHome({ todos: tasks, timers: updatedTimers }));
    setSelectedTimer({ name: '', time: new Date() });
  };

  const handleRemoveTimer = (timerToRemove) => {
    const updatedTimers = timers.filter((item) => item.name !== timerToRemove);
    setTimers(updatedTimers);
    dispatch(updateGlobal(updatedTimers));
    dispatch(updateHome({ todos: tasks, timers: updatedTimers }));
  };

  const handleEditTimer = (name, time) => {
    setSelectedTimer({ name, time });
  };

  const TABS = [
    {
      title: 'To do',
      component: ComponentWrapper(HomeTodo, {
        tasks,
        selectedTask,
        onChange: handleTasksChange,
        onEditTask: handleEditTask,
        onChangeItem: handleTaskItemChange
      })
    },
    {
      title: 'Timers',
      component: ComponentWrapper(HomeTimer, {
        timers,
        selectedTimer,
        onChangeTimer: handleTimeItemChange,
        onRemoveTimer: handleRemoveTimer,
        onEditTimer: handleEditTimer
      })
    }
  ];

  return (
    <Page>
      <Tabs data={TABS} />
    </Page>
  );
};

export default Home;
