import { CareerChecklistItem } from "./CareerChecklistItem";

/**
 * Atomic/Compound component: Render an array of strings into clean checklist items
 * Eliminates redundant <ul> and <li> loops in consumer code.
 * @param {object} props
 * @param {string[]} props.items
 * @param {string} [props.className]
 */
export function CareerChecklist({ items = [], className = "" }) {
  if (!items || items.length === 0) return null;

  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <CareerChecklistItem key={index} text={item} />
      ))}
    </ul>
  );
}
