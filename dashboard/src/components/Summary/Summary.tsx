import { useMemo } from 'react';

import BaseTable from '../Table/BaseTable';
import { TableBody, TableCell, TableRow } from '../ui/table';
import ListingComponentItem, {
  IListingComponentItem,
} from '../ListingComponentItem/ListingComponentItem';

export interface ISummary extends ISummaryTable {
  title: string;
  type: 'summary';
}

export interface ISummaryTable {
  summaryHeaders: string[];
  summaryBody: ISummaryItem[];
}

export interface ISummaryItem {
  arch: IListingComponentItem;
  compilers: string[];
}

const Summary = ({
  summaryHeaders,
  summaryBody,
}: ISummaryTable): JSX.Element => {
  const summaryHeadersRow = useMemo(
    () => summaryHeaders.map(header => <span key={header}>{header}</span>),
    [summaryHeaders],
  );

  const summaryBodyRows = useMemo(
    () =>
      summaryBody.map(row => (
        <SummaryItem
          key={row.arch.text}
          arch={row.arch}
          compilers={row.compilers}
        />
      )),
    [summaryBody],
  );

  return (
    <BaseTable
      className="!rounded-[0rem] bg-mediumGray"
      headers={summaryHeadersRow}
      body={<TableBody>{summaryBodyRows}</TableBody>}
    />
  );
};

const SummaryItem = ({ arch, compilers }: ISummaryItem): JSX.Element => {
  const compilersElement = useMemo(
    () =>
      compilers.map(compiler => (
        <span key={compiler} className="line-clamp-1">
          {compiler}
        </span>
      )),
    [compilers],
  );
  return (
    <TableRow>
      <TableCell>
        <ListingComponentItem
          errors={arch.errors}
          warnings={arch.warnings}
          text={arch.text}
          success={arch.success}
        />
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">{compilersElement}</div>
      </TableCell>
    </TableRow>
  );
};

export default Summary;
