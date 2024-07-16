import Tabs, { ITabItem } from '@/components/Tabs/Tabs';

const TreeDetailsTab = (): JSX.Element => {
  return <Tabs tabs={treeDetailsTab} defaultTab={treeDetailsTab[0]} />;
};

const bootsTab: ITabItem = {
  name: 'Boots',
  content: <></>,
  disabled: true,
};

const testsTab: ITabItem = {
  name: 'Tests',
  content: <></>,
  disabled: true,
};

const buildsTab: ITabItem = {
  name: 'Builds',
  content: <></>,
  disabled: false,
};

const treeDetailsTab = [buildsTab, bootsTab, testsTab];

export default TreeDetailsTab;
