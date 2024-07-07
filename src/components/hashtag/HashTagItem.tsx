type HashtagProps = {
  company: string;
  onSelectCompany: (company: string) => void;
};

export default function HashTagItem({
  company,
  onSelectCompany,
}: HashtagProps) {
  return (
    <li key={company}>
      <button onClick={() => onSelectCompany(company)}>#{company}</button>
    </li>
  );
}
