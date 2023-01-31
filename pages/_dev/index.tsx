import { NiceLink } from "../../src/domains/nice/NiceLink";

function Page(): JSX.Element {
  return (
    <ul className="ml-8 list-disc">
      <li>
        <NiceLink href="/_dev/components/CommandPalette/">
          Command palette
        </NiceLink>
      </li>
    </ul>
  );
}

export default Page;
