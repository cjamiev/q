import Page from '../../../components/layout';
import Tabs from '../../../components/atoms/Tabs';
import ComponentWrapper from '../../../components/atoms/ComponentWrapper';
import { HomeTest } from '../../../components/molecules/HomeTest';
import { HomeTodo } from '../../../components/molecules/HomeTodo';

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
  ];

  return (
    <Page>
      <Tabs data={TABS} />
    </Page>
  );
};

export default Home;
