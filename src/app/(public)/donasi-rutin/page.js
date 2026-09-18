import { getCampaigns } from "@/services/campaignService";
import { RoutineDonationForm } from "@/components/routine-donation/RoutineDonationForm";

export const metadata = {
  title: "Donasi Rutin Otomatis (Sedekah Subuh & Bulanan) - YGSM",
  description: "Atur jadwal sedekah subuh, infak jumat, atau donasi bulanan rutin untuk santri tahfidz dan yatim dhuafa.",
};

export default async function DonasiRutinPage() {
  const campaigns = await getCampaigns();

  return <RoutineDonationForm campaigns={campaigns} />;
}
