import Link from "next/link";
import { ComponentProps } from "react";
import { homePagePath } from "../../home/homePageMeta";

export interface NavBarProps {
}

export function NavBar(): JSX.Element {
  return (
    <div className="NavBar bg-blue-900">
      <NavBarLink href={homePagePath()}>Home</NavBarLink>
    </div>
  );
}

function NavBarLink(props: ComponentProps<typeof Link>): JSX.Element {
  const { className, ...otherProps } = props;
  return <Link className={`${className} text-white`} {...otherProps} />
}
