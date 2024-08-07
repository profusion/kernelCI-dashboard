import { ReactElement } from 'react';

interface ILinkWithIcon {
  title?: string | ReactElement;
  linkText?: string | ReactElement;
  link?: string;
  icon?: ReactElement;
}

const LinkWithIcon = ({
  title,
  linkText,
  icon,
  link,
}: ILinkWithIcon): JSX.Element => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold">{title}</span>
      <a
        className="flex flex-row gap-1 items-center"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        {linkText}
        {icon}
      </a>
    </div>
  );
};

export default LinkWithIcon;
