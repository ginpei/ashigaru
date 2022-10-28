import Link from "next/link";
import { homePagePath } from "../../home/homePageMeta";

export interface NavBarProps {
}

export function NavBar(): JSX.Element {
  return (
    <div className="NavBar">
      <Link href={homePagePath()}>Home</Link>
    </div>
  );
}
