import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import TreeDetailsTab from '@/components/Tabs/TreeDetailsTab';
import FilterButton from '@/components/Button/FilterButton';
import { useTreeDetail } from '@/api/TreeDetails';

import { TreeDetails as TreeDetailsType } from '@/types/tree/TreeDetails';
import { IListingComponentItem } from '@/components/ListingComponentItem/ListingComponentItem';
import ListingComponentCardsGroup from '@/components/GroupCards/GroupListingComponentCard';
import { ISummary, ISummaryItem } from '@/components/Summary/Summary';
import { IListingComponent } from '@/components/Cards/ListingComponentCard/ListingComponentCard';

const TreeDetails = (): JSX.Element => {
  const { treeId } = useParams();
  const { data } = useTreeDetail(treeId ?? '');

  const [configs, setConfigs] = useState<IListingComponentItem[]>();
  const [archictectures, setArchitectures] = useState<ISummaryItem[]>();

  useEffect(() => {
    if (data as TreeDetailsType) {
      const configsData: IListingComponentItem[] = Object.entries(
        (data as TreeDetailsType).summary.configs,
      ).map(([key, value]) => ({
        text: key,
        errors: value.invalid,
        success: value.valid,
      }));
      setConfigs(configsData);

      const archData: ISummaryItem[] = Object.entries(
        (data as TreeDetailsType).summary.architectures,
      ).map(([key, value]) => ({
        arch: { text: key, errors: value.invalid, success: value.invalid },
        compilers: value.compilers,
      }));

      setArchitectures(archData);
    }
  }, [data]);

  return (
    <div className="flex flex-col pt-8">
      <div className="flex flex-row pb-2 border-b border-darkGray">
        <TreeDetailsTab />
        <FilterButton />
      </div>
      <div className="pt-4">
        <ListingComponentCardsGroup
          cards={[
            {
              items: configs ?? [],
              title: 'Configs',
              type: 'listing',
            } as IListingComponent,
            {
              summaryBody: archictectures,
              title: 'Summary',
              summaryHeaders: ['Arch', 'Compilers'],
              type: 'summary',
            } as ISummary,
          ]}
        />
      </div>
    </div>
  );
};

export default TreeDetails;
