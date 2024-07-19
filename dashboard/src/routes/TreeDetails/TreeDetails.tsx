import { useParams } from 'react-router-dom';

import { useEffect, useState, useRef, useCallback } from 'react';

import { useTreeDetails } from '@/api/TreeDetails';
import TreeDetailsTab from '@/components/Tabs/TreeDetailsTab';
import { IListingItem } from '@/components/ListingItem/ListingItem';
import { ISummaryItem } from '@/components/Summary/Summary';
import { AccordionItemBuilds, Results } from '@/types/tree/TreeDetails';

import FilterList from '@/components/FilterList/FilterList';

import TreeDetailsFilter, {
  createFilters,
  TFilterObj,
} from './TreeDetailsFilter';

export interface ITreeDetails {
  archs: ISummaryItem[];
  configs: IListingItem[];
  buildsSummary: Results;
  builds: AccordionItemBuilds[];
}

const TreeDetails = (): JSX.Element => {
  const { treeId } = useParams();
  const [filter, setFilter] = useState<TFilterObj | Record<string, never>>({});
  const { data } = useTreeDetails(treeId ?? '');

  const [treeDetailsData, setTreeDetailsData] = useState<ITreeDetails>();
  const isInitialDataRef = useRef(false);

  if (!isInitialDataRef.current && data) {
    isInitialDataRef.current = true;
    setFilter(createFilters(data));
  }

  const onClickFilterCleanAll = useCallback(() => setFilter({}), []);

  useEffect(() => {
    if (data) {
      const configsData: IListingItem[] = Object.entries(
        data.summary.configs,
      ).map(([key, value]) => ({
        text: key,
        errors: value.invalid,
        success: value.valid,
      }));

      const archData: ISummaryItem[] = Object.entries(
        data.summary.architectures,
      ).map(([key, value]) => ({
        arch: { text: key, errors: value.invalid, success: value.valid },
        compilers: value.compilers,
      }));

      const buildSummaryData: Results = {
        valid: data.summary.builds.valid,
        invalid: data.summary.builds.invalid,
        null: data.summary.builds.null,
      };

      const buildsData: AccordionItemBuilds[] = Object.entries(data.builds).map(
        ([, value]) => ({
          config: value.config_name,
          date: value.start_time,
          buildTime: value.duration,
          compiler: value.compiler,
          buildErrors: value.test_status?.error_tests ?? 0,
          status: value.valid ? 'valid' : 'invalid',
          testStatus: {
            failTests: value.test_status?.fail_tests ?? 0,
            passTests: value.test_status?.pass_tests ?? 0,
            errorTests: value.test_status?.error_tests ?? 0,
            skipTests: value.test_status?.skip_tests ?? 0,
          },
          buildLogs: value.log_url,
          kernelConfig: value.config_url,
          kernelImage: value.misc ? value.misc['kernel_type'] : undefined,
          dtb: value.misc ? value.misc['dtb'] : undefined,
          systemMap: value.misc ? value.misc['system_map'] : undefined,
          modules: value.misc ? value.misc['modules'] : undefined,
        }),
      );

      setTreeDetailsData({
        archs: archData,
        configs: configsData,
        buildsSummary: buildSummaryData,
        builds: buildsData,
      });
    }
  }, [data]);

  // const filterValues = Object.values(filter).flat();
  const filterValues = ['ola', 'alo'];

  return (
    <div className="flex flex-col pt-8">
      <div className="flex flex-col pb-2">
        <div className="flex justify-end">
          <TreeDetailsFilter filter={filter} onFilter={setFilter} />
        </div>

        <FilterList
          itens={filterValues}
          onClickCleanAll={onClickFilterCleanAll}
          onClickItem={console.log}
          removeOnEmpty
        />
        <TreeDetailsTab treeDetailsData={treeDetailsData} />
      </div>
    </div>
  );
};

export default TreeDetails;
