/**
 * BankAccountItem
 * Komponen reusable untuk menampilkan satu baris rekening bank resmi yayasan.
 *
 * @param {object} props
 * @param {{ bank: string, accountNumber: string, accountName: string }} props.account
 * @param {boolean} [props.isFirst=false]
 */
export function BankAccountItem({ account, isFirst = false }) {
  return (
    <div
      className={`space-y-1 ${!isFirst ? "pt-3.5 border-t border-slate-200" : ""}`}
    >
      <div className="font-semibold text-slate-900 text-sm sm:text-base">
        {account.bank}
      </div>
      <div className="font-mono text-base sm:text-lg font-bold text-slate-950 tracking-wider">
        {account.accountNumber}
      </div>
      <div className="text-xs sm:text-sm text-slate-600">
        a.n. {account.accountName}
      </div>
    </div>
  );
}
