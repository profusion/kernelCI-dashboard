import TreeDetailsTab from '@/components/Tabs/TreeDetailsTab';
import FilterButton from '@/components/Button/FilterButton';

const TreeDetails = (): JSX.Element => {
  return (
    <div className="flex flex-col pt-8">
      <div className="flex flex-row pb-2 border-b border-darkGray">
        <TreeDetailsTab />
        <FilterButton />
      </div>
    </div>
  );
};

export default TreeDetails;
