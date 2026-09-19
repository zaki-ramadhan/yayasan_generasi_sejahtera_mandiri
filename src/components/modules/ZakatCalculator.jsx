"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getStoredUser } from "@/services/authService";
import { ZakatProfesiTab } from "@/components/zakat/ZakatProfesiTab";
import { ZakatMaalTab } from "@/components/zakat/ZakatMaalTab";
import { ZakatFidyahTab } from "@/components/zakat/ZakatFidyahTab";
import { ZakatInfakTab } from "@/components/zakat/ZakatInfakTab";

// Harga acuan emas per gram tahun 2026 (standar acuan BAZNAS)
const GOLD_PRICE_PER_GRAM = 1350000;
const NISAB_GOLD_ANNUAL_GRAMS = 85;
const NISAB_ANNUAL = GOLD_PRICE_PER_GRAM * NISAB_GOLD_ANNUAL_GRAMS; // Rp 114.750.000 / thn
const NISAB_MONTHLY = Math.round(NISAB_ANNUAL / 12); // ~Rp 9.562.500 / bln
const FIDYAH_RATE_PER_DAY = 45000; // Rp 45.000 per porsi makan dhuafa

export function ZakatCalculator() {
  const router = useRouter();

  // 1. State Zakat Penghasilan
  const [incomeMonthly, setIncomeMonthly] = useState(12000000);
  const [otherIncomeMonthly, setOtherIncomeMonthly] = useState(0);
  const [debtMonthly, setDebtMonthly] = useState(2000000);

  // 2. State Zakat Maal / Tabungan
  const [savingsTotal, setSavingsTotal] = useState(150000000);
  const [goldGrams, setGoldGrams] = useState(0);
  const [shortDebt, setShortDebt] = useState(0);

  // 3. State Fidyah
  const [fidyahDays, setFidyahDays] = useState(7);

  // 4. State Infak Bebas
  const [infakAmount, setInfakAmount] = useState(100000);

  // Kalkulasi 1: Zakat Penghasilan
  const { netIncome, zakatIncomeAmount, isIncomeNisabMet } = useMemo(() => {
    const net = Math.max(0, incomeMonthly + otherIncomeMonthly - debtMonthly);
    const isMet = net >= NISAB_MONTHLY;
    const zakat = isMet ? Math.round(net * 0.025) : 0;
    return { netIncome: net, zakatIncomeAmount: zakat, isIncomeNisabMet: isMet };
  }, [incomeMonthly, otherIncomeMonthly, debtMonthly]);

  // Kalkulasi 2: Zakat Maal
  const { netMaal, zakatMaalAmount, isMaalNisabMet } = useMemo(() => {
    const goldValue = goldGrams * GOLD_PRICE_PER_GRAM;
    const net = Math.max(0, savingsTotal + goldValue - shortDebt);
    const isMet = net >= NISAB_ANNUAL;
    const zakat = isMet ? Math.round(net * 0.025) : 0;
    return { netMaal: net, zakatMaalAmount: zakat, isMaalNisabMet: isMet };
  }, [savingsTotal, goldGrams, shortDebt]);

  // Kalkulasi 3: Fidyah
  const fidyahTotal = useMemo(() => {
    return Math.max(0, fidyahDays * FIDYAH_RATE_PER_DAY);
  }, [fidyahDays]);

  const handlePay = (amt, zakatType) => {
    if (amt <= 0) return;
    const targetUrl = `/campaign/zakat-penghasilan-pemberdayaan-mustahik/donate?amount=${amt}&type=${zakatType}`;
    const user = getStoredUser();

    if (!user) {
      router.push(
        `/login?redirect=${encodeURIComponent(targetUrl)}&reason=donation_requires_login`
      );
      return;
    }

    router.push(targetUrl);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="penghasilan" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto h-auto p-1.5 bg-slate-100 rounded-xl gap-1">
          <TabsTrigger value="penghasilan" className="rounded-lg text-xs sm:text-sm py-2 px-3">
            Zakat Penghasilan
          </TabsTrigger>
          <TabsTrigger value="maal" className="rounded-lg text-xs sm:text-sm py-2 px-3">
            Zakat Maal / Emas
          </TabsTrigger>
          <TabsTrigger value="fidyah" className="rounded-lg text-xs sm:text-sm py-2 px-3">
            Fidyah Puasa
          </TabsTrigger>
          <TabsTrigger value="infak" className="rounded-lg text-xs sm:text-sm py-2 px-3">
            Sedekah Bebas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="penghasilan" className="space-y-6 pt-4">
          <ZakatProfesiTab
            nisabMonthly={NISAB_MONTHLY}
            incomeMonthly={incomeMonthly}
            setIncomeMonthly={setIncomeMonthly}
            otherIncomeMonthly={otherIncomeMonthly}
            setOtherIncomeMonthly={setOtherIncomeMonthly}
            debtMonthly={debtMonthly}
            setDebtMonthly={setDebtMonthly}
            netIncome={netIncome}
            zakatIncomeAmount={zakatIncomeAmount}
            isIncomeNisabMet={isIncomeNisabMet}
            onPay={handlePay}
          />
        </TabsContent>

        <TabsContent value="maal" className="space-y-6 pt-4">
          <ZakatMaalTab
            nisabAnnual={NISAB_ANNUAL}
            savingsTotal={savingsTotal}
            setSavingsTotal={setSavingsTotal}
            goldGrams={goldGrams}
            setGoldGrams={setGoldGrams}
            shortDebt={shortDebt}
            setShortDebt={setShortDebt}
            netMaal={netMaal}
            zakatMaalAmount={zakatMaalAmount}
            isMaalNisabMet={isMaalNisabMet}
            onPay={handlePay}
          />
        </TabsContent>

        <TabsContent value="fidyah" className="space-y-6 pt-4">
          <ZakatFidyahTab
            fidyahRatePerDay={FIDYAH_RATE_PER_DAY}
            fidyahDays={fidyahDays}
            setFidyahDays={setFidyahDays}
            fidyahTotal={fidyahTotal}
            onPay={handlePay}
          />
        </TabsContent>

        <TabsContent value="infak" className="space-y-6 pt-4">
          <ZakatInfakTab
            infakAmount={infakAmount}
            setInfakAmount={setInfakAmount}
            onPay={handlePay}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
