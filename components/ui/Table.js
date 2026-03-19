/**
 * Table Component
 * Composant pour afficher des données tabulaires
 * Striped, hoverable, sortable
 */

export function Table({
  columns = [],
  data = [],
  striped = true,
  hoverable = true,
  className = '',
}) {
  return (
    <div className="overflow-x-auto border border-border rounded-lg">
      <table className={`w-full ${className}`}>
        <thead>
          <tr className="bg-background border-b border-border">
            {columns.map((column, idx) => (
              <th
                key={idx}
                className="px-6 py-4 text-left text-sm font-semibold text-text"
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={`border-b border-border ${
                  striped && rowIdx % 2 === 1 ? 'bg-background' : 'bg-white'
                } ${hoverable ? 'hover:bg-background transition-colors' : ''}`}
              >
                {columns.map((column, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-6 py-4 text-sm text-text-secondary"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-8 text-center text-text-secondary"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/**
 * TableRow Component
 * Pour usage manuel de tableau
 */
export function TableRow({ children, className = '' }) {
  return <tr className={`border-b border-border ${className}`}>{children}</tr>;
}

/**
 * TableHead Component
 */
export function TableHead({ children, className = '' }) {
  return (
    <th
      className={`px-6 py-4 text-left text-sm font-semibold text-text bg-background ${className}`}
    >
      {children}
    </th>
  );
}

/**
 * TableCell Component
 */
export function TableCell({ children, className = '' }) {
  return (
    <td className={`px-6 py-4 text-sm text-text-secondary ${className}`}>
      {children}
    </td>
  );
}

export default Table;
