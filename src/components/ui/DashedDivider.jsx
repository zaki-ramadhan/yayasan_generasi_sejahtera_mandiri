/**
 * Reusable ticket perforation dashed divider
 * Reused across Invoice receipts, payment instructions, and editorial document sections
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string} [props.strokeColor="#cbd5e1"]
 * @param {number} [props.strokeWidth=1.5]
 * @param {string} [props.dashArray="8 6"]
 */
export function DashedDivider({
  className = "",
  strokeColor = "#cbd5e1",
  strokeWidth = 1.5,
  dashArray = "8 6",
}) {
  return (
    <div className={`w-full overflow-hidden flex items-center ${className}`}>
      <svg className="w-full h-0.5 block" preserveAspectRatio="none">
        <line
          x1="0"
          y1="1"
          x2="100%"
          y2="1"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
        />
      </svg>
    </div>
  );
}
