import { useMemo } from 'react';

import ListingComponentItem, {
  IListingComponentItem,
} from '@/components/ListingComponentItem/ListingComponentItem';

export interface IListingComponent {
  items: IListingComponentItem[];
  title: string;
  type: 'listing';
}

interface IListedComponent {
  items: IListingComponentItem[];
}

const ListingComponentContent = ({ items }: IListedComponent): JSX.Element => {
  const content = useMemo(() => {
    return items.map(item => (
      <ListingComponentItem
        key={item.text}
        warnings={item.warnings}
        errors={item.errors}
        success={item.success}
        text={item.text}
      />
    ));
  }, [items]);
  return <div className="flex flex-col gap-2 p-4">{content}</div>;
};

export default ListingComponentContent;
