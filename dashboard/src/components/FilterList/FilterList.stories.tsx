import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { IntlProvider } from 'react-intl';
import { flatten } from 'flat';

import { LOCALES } from '../../locales/constants';

import { messages } from '../../locales/messages';

import FilterList from './FilterList';

const ActionsData = {
  onClickItem: fn(),
  onClickCleanAll: fn(),
};

const meta: Meta<typeof FilterList> = {
  title: 'FilterList',
  component: FilterList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    ...ActionsData,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    itens: ['linux-5.15.y', 'Status:failed', 'Status: Warnings'],
  },
  decorators: [
    (story): JSX.Element => (
      <IntlProvider
        messages={flatten(messages[LOCALES.EN_US])}
        locale={LOCALES.EN_US}
      >
        {story()}
      </IntlProvider>
    ),
  ],
};

export const MultipleLines: Story = {
  args: {
    itens: [
      'linux-5.15.y',
      'Status:failed',
      'Status: Warnings',
      'Status:failed',
      'Status: Warnings',
    ],
  },
  decorators: [
    (story): JSX.Element => (
      <IntlProvider
        messages={flatten(messages[LOCALES.EN_US])}
        locale={LOCALES.EN_US}
      >
        <div className="w-[500px]">{story()}</div>
      </IntlProvider>
    ),
  ],
};
