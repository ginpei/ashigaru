import Link from "next/link";
import { ComponentProps } from "react";
import { homePagePath } from "../../home/homePageMeta";

export interface ShaperNavBarProps {}

export function ShaperNavBar(): JSX.Element {
  return (
    <div className="ShaperNavBar bg-ginpei px-4" style={{ lineHeight: "2rem" }}>
      <ShaperNavBarLink href={homePagePath()}>Home</ShaperNavBarLink>
    </div>
  );
}

function ShaperNavBarLink(props: ComponentProps<typeof Link>): JSX.Element {
  const { className, ...otherProps } = props;
  return (
    <Link
      className={`${className} text-white no-underline hover:underline`}
      {...otherProps}
    />
  );
}