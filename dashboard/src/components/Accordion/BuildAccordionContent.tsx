import { MdFolderOpen } from 'react-icons/md';

import { useMemo } from 'react';

import { FormattedMessage } from 'react-intl';

import { AccordionItemBuilds } from '@/types/tree/TreeDetails';

import StatusChartMemoized, { Colors } from '../StatusChart/StatusCharts';

import LinksGroup from '../LinkGroup/LinkGroup';

import { IAccordionItems } from './Accordion';

export interface IBuildAccordionContent {
  testStatus: {
    failTests: number;
    errorTests: number;
    passTests: number;
    skipTests: number;
  };
  kernelImage?: string;
  buildLogs?: string;
  kernelConfig?: string;
  dtb?: string;
  systemMap?: string;
  modules?: string;
}

export interface ILinksGroup {
  kernelImage?: string;
  buildLogs?: string;
  kernelConfig?: string;
  dtb?: string;
  systemMap?: string;
  modules?: string;
}

const AccordionBuildContent = ({
  accordionData,
}: IAccordionItems): JSX.Element => {
  const contentData = accordionData as AccordionItemBuilds;
  const chartElements = useMemo(() => {
    return contentData.testStatus?.passTests ||
      contentData.testStatus?.skipTests ||
      contentData.testStatus?.errorTests ||
      contentData.testStatus?.failTests
      ? [
          {
            value: contentData.testStatus?.passTests ?? 0,
            label: <FormattedMessage id="buildAccordion.testSuccess" />,
            color: Colors.Green,
          },
          {
            value:
              (contentData.testStatus?.failTests ?? 0) +
              (contentData.testStatus?.errorTests ?? 0),
            label: <FormattedMessage id="buildAccordion.testFailed" />,
            color: Colors.Red,
          },
          {
            value: contentData.testStatus?.skipTests ?? 0,
            label: <FormattedMessage id="buildAccordion.testSkiped" />,
            color: Colors.Gray,
          },
        ]
      : [
          {
            value: 1,
            label: <FormattedMessage id="global.none" />,
            color: Colors.Gray,
            showValue: false,
          },
        ];
  }, [
    contentData.testStatus?.errorTests,
    contentData.testStatus?.failTests,
    contentData.testStatus?.passTests,
    contentData.testStatus?.skipTests,
  ]);

  const links = useMemo(
    () => [
      contentData.kernelImage
        ? {
            title: <FormattedMessage id="buildAccordion.kernelImage" />,
            icon: <MdFolderOpen className="text-lightBlue" />,
            linkText: <span>{`kernel/${contentData.kernelImage}`}</span>,
          }
        : undefined,
      contentData.kernelConfig
        ? {
            title: <FormattedMessage id="buildAccordion.kernelConfig" />,
            icon: <MdFolderOpen className="text-lightBlue" />,
            link: contentData.kernelConfig,
            linkText: <FormattedMessage id="buildAccordion.kernelConfigPath" />,
          }
        : undefined,
      contentData.dtb
        ? {
            title: <FormattedMessage id="buildAccordion.dtb" />,
            icon: <MdFolderOpen className="text-lightBlue" />,
            link: contentData.dtb,
            linkText: <FormattedMessage id="buildAccordion.dtbs" />,
          }
        : undefined,
      contentData.buildLogs
        ? {
            title: <FormattedMessage id="buildAccordion.buildLogs" />,
            icon: <MdFolderOpen className="text-lightBlue" />,
            link: contentData.buildLogs,
            linkText: <FormattedMessage id="buildAccordion.logs" />,
          }
        : undefined,
      contentData.systemMap
        ? {
            title: <FormattedMessage id="buildAccordion.systemMap" />,
            icon: <MdFolderOpen className="text-lightBlue" />,
            link: contentData.systemMap,
            linkText: <FormattedMessage id="buildAccordion.systemMapPath" />,
          }
        : undefined,
      contentData.modules
        ? {
            title: <FormattedMessage id="buildAccordion.modules" />,
            icon: <MdFolderOpen className="text-lightBlue" />,
            link: contentData.modules,
            linkText: <FormattedMessage id="buildAccordion.modulesZip" />,
          }
        : undefined,
    ],
    [
      contentData.buildLogs,
      contentData.dtb,
      contentData.kernelConfig,
      contentData.kernelImage,
      contentData.modules,
      contentData.systemMap,
    ],
  );

  return (
    <div className="flex flex-row justify-between">
      <div className="min-w-[400px]">
        <StatusChartMemoized
          type="chart"
          title={<FormattedMessage id="buildAccordion.testStatus" />}
          elements={chartElements}
        />
      </div>
      <LinksGroup links={links} />
    </div>
  );
};

export default AccordionBuildContent;
