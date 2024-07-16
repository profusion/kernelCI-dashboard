import { MdExpandMore } from 'react-icons/md';

import { FormattedMessage } from 'react-intl';

import { Button } from '../ui/button';

const buttonsClassName =
  'bg-lightGray border border-black text-black rounded-full items-center gap-2 hover:bg-darkGray px-6';

const FilterButton = (): JSX.Element => {
  return (
    <Button className={buttonsClassName}>
      <FormattedMessage id="global.filters" />
      <MdExpandMore />
    </Button>
  );
};

export default FilterButton;
