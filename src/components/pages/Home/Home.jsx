import Page from '../../../components/layout';
import Tabs from '../../../components/atoms/Tabs';
import ComponentWrapper from '../../../components/atoms/ComponentWrapper';
import { HomeTest } from '../../../components/molecules/HomeTest';
import { HomeTodo } from '../../../components/molecules/HomeTodo';
import { HomeTimer } from '../../../components/molecules/HomeTimer';

const Home = () => {
  const TABS = [
    {
      title: 'Test',
      component: ComponentWrapper(HomeTest, {})
    },
    {
      title: 'Notes',
      component: ComponentWrapper(HomeTodo, {})
    },
    {
      title: 'Timers',
      component: ComponentWrapper(HomeTimer, {})
    }
  ];

  return (
    <Page>
      <Tabs data={TABS} />
    </Page>
  );
};

export default Home;
