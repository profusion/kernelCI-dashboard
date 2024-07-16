import { useMemo } from 'react';

import ListingComponentContent, {
  IListingComponent,
} from '../Cards/ListingComponentCard/ListingComponentCard';
import Summary, { ISummary } from '../Summary/Summary';
import BaseCard from '../Cards/BaseCard';

interface IListingComponentCardsGroup {
  cards: (IListingComponent | ISummary)[];
}

interface ICardContent {
  card: IListingComponent | ISummary;
}

const ListingComponentCardsGroup = ({
  cards,
}: IListingComponentCardsGroup): JSX.Element => {
  const cardsList = useMemo(() => {
    return cards.map(card => (
      <BaseCard
        key={card.title}
        title={card.title}
        content={<CardContent card={card} />}
      />
    ));
  }, [cards]);
  return <div className="grid grid-cols-2 gap-8">{cardsList}</div>;
};

const CardContent = ({ card }: ICardContent): JSX.Element => {
  if (card.type === 'listing' && card.items) {
    return <ListingComponentContent key={card.title} items={card.items} />;
  } else if (card.type === 'summary' && card.summaryBody) {
    return (
      <Summary
        key=""
        summaryHeaders={card?.summaryHeaders}
        summaryBody={card?.summaryBody}
      />
    );
  } else {
    return <></>;
  }
};

export default ListingComponentCardsGroup;
