import Link from "next/link";
import { ComponentProps } from "react";
import { homePagePath } from "../../home/homePageMeta";

export interface NavBarProps {}

export function NavBar(): JSX.Element {
  return (
    <div className="NavBar h-8 bg-ginpei px-4" style={{ lineHeight: "2rem" }}>
      <NavBarLink href={homePagePath()}>Home</NavBarLink>
    </div>
  );
}

function NavBarLink(props: ComponentProps<typeof Link>): JSX.Element {
  const { className, ...otherProps } = props;
  return <Link className={`${className} text-white`} {...otherProps} />;
}
