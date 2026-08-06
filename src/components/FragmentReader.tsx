import { fragments } from "../data/content";

export function FragmentReader() {
  return (
    <ol className="fragment-list" data-reveal>
      {fragments.map((fragment, index) => (
        <li key={fragment}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <blockquote><p>“{fragment}”</p></blockquote>
        </li>
      ))}
    </ol>
  );
}
