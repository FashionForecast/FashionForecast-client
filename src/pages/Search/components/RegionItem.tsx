type RegionItemProps = {
  region: string;
  keyword: string;
};

const RegionItem = ({ region, keyword }: RegionItemProps) => {
  const [before, match, after] = splitText(region, keyword);

  return (
    <li>
      <button type='button'>
        {before}
        <strong>{match}</strong>
        {after}
      </button>
    </li>
  );
};

export default RegionItem;

function splitText(region: string, keyword: string) {
  const index = region.indexOf(keyword);

  const before = region.slice(0, index);
  const after = region.slice(index + keyword.length);

  return [before, keyword, after];
}
