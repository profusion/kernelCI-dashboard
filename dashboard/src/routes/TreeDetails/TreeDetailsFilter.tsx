import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';

import FilterDrawer from '@/components/Filter/Drawer';
import FilterSummarySection from '@/components/Filter/SummarySection';
import FilterCheckboxSection, {
  ICheckboxSection,
} from '@/components/Filter/CheckboxSection';
import {
  TreeDetails as TreeDetailsType,
  TreeDetailsBuild,
} from '@/types/tree/TreeDetails';

type TFilterObjKeys =
  | keyof Omit<TreeDetailsBuild, 'test_status' | 'misc'>
  | 'status';

export type TFilterObj = Partial<{
  [key in TFilterObjKeys]: { [key: string]: boolean };
}>;

interface ITreeDetailsFilter {
  onFilter: (filter: TFilterObj) => void;
  filter: TFilterObj;
}

type TFilterApplied = { [key: string]: boolean };

export const createFilters = (data: TreeDetailsType): TFilterObj => {
  const status: TFilterApplied = { TRUE: false, FALSE: false };
  const git_repository_branch: TFilterApplied = {};
  const config_name: TFilterApplied = {};
  const architecture: TFilterApplied = {};

  if (data)
    data.builds.forEach(b => {
      if (b.git_repository_branch)
        git_repository_branch[b.git_repository_branch] = false;
      if (b.config_name) config_name[b.config_name] = false;
      if (b.architecture) architecture[b.architecture] = false;
    });

  return { status, git_repository_branch, config_name, architecture };
};

const TreeDetailsFilter = ({
  onFilter,
  filter,
}: ITreeDetailsFilter): JSX.Element => {
  const intl = useIntl();
  const localFilterRef = useRef<TFilterObj>(filter);

  useEffect(() => {
    localFilterRef.current = filter;
  }, [filter]);

  const onClickFilterHandle = useCallback(() => {
    onFilter(localFilterRef.current);
  }, [onFilter, localFilterRef]);

  const checkboxSectionsProps: ICheckboxSection[] = useMemo(() => {
    return [
      {
        title: intl.formatMessage({ id: 'global.branch' }),
        subtitle: intl.formatMessage({ id: 'filter.branchSubtitle' }),
        items: filter.git_repository_branch,
        onClickItem: (branch: string, isChecked: boolean): void => {
          if (localFilterRef.current.git_repository_branch)
            localFilterRef.current.git_repository_branch[branch] = isChecked;
        },
      },
      // {
      //   title: intl.formatMessage({ id: 'global.status' }),
      //   subtitle: intl.formatMessage({ id: 'filter.statusSubtitle' }),
      //   items: Object.keys(statusObj).reduce((acc, k) => {
      //     const newKey = k == 'TRUE' ? 'valid' : 'invalid';
      //     acc[newKey] = statusObj[k];
      //     return acc;
      //   }, {} as TFilterApplied),
      //   onClickItem: (status: string, isChecked: boolean) =>
      //     (statusObj[status == 'valid' ? 'TRUE' : 'FALSE'] = isChecked),
      // },
      // {
      //   title: intl.formatMessage({ id: 'global.configs' }),
      //   subtitle: intl.formatMessage({ id: 'filter.configsSubtitle' }),
      //   items: configObj,
      //   onClickItem: (config: string, isChecked: boolean) =>
      //     (configObj[config] = isChecked),
      // },
      // {
      //   title: intl.formatMessage({ id: 'global.architecture' }),
      //   subtitle: intl.formatMessage({ id: 'filter.architectureSubtitle' }),
      //   items: archObj,
      //   onClickItem: (arch: string, isChecked: boolean) =>
      //     (archObj[arch] = isChecked),
      // },
    ];
  }, [intl, filter]);

  const checkboxSectionsComponents = useMemo(
    () =>
      checkboxSectionsProps.map(props => (
        <FilterCheckboxSection key={props.title} {...props} />
      )),
    [checkboxSectionsProps],
  );

  return (
    <FilterDrawer treeURL={treeUrl} onFilter={onClickFilterHandle}>
      <FilterSummarySection {...summarySectionProps} />
      {checkboxSectionsComponents}
    </FilterDrawer>
  );
};

export default TreeDetailsFilter;

const treeUrl =
  'https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git';
const summarySectionProps = {
  title: 'Tree',
  columns: [
    { title: 'Tree', value: 'stable-rc' },
    { title: 'Matainer', value: '' },
    { title: 'Estimate to complete', value: '' },
    {
      title: 'Commit/tag',
      value: '5.15.150-rc1 - 3ab4d9c9e190217ee7e974c70b96795cd2f74611',
    },
  ],
};
