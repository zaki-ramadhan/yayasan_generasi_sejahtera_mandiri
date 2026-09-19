import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { CATEGORIES } from "../src/data/categories.js";
import { CAMPAIGNS } from "../src/data/campaigns.js";
import { AUDIT_REPORTS } from "../src/data/reports.js";
import { ARTICLES, validateArticleCategories } from "../src/data/articles.js";
import { INSTAGRAM_POSTS } from "../src/data/instagramPosts.js";

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const INDONESIAN_NAMES = [
  "Budi Santoso", "Siti Rahmawati", "dr. Maya Anggraini", "H. Hendra Wijaya",
  "Muhammad Rizky", "Dewi Lestari", "Agus Pratama", "Prof. H. Bambang Soediro",
  "Keluarga Ibu Sri", "Dra. Hj. Nurul Hidayah", "Rina Kartika", "Irfan Hakim",
  "dr. Tirta Wijaya", "Farhan Maulana", "Anisa Rahma", "Keluarga Besar Bpk. Sukardi",
  "Ahmad Fauzi", "Nurul Aini", "Eko Prasetyo", "Wahyu Hidayat", "Tri Utami",
  "Dedi Supriadi", "Fitri Handayani", "Indra Kusuma", "Lestari Widya", "Arief Wibowo",
  "Ratna Sari", "Bayu Pratama", "Nita Anggraini", "Hadi Purwanto", "Sri Mulyani",
  "Rizka Amalia", "Fajar Nugraha", "Dimas Anggara", "Yuni Shara", "Bambang Pamungkas",
  "Maya Safitri", "Rudi Hartono", "Suryadi", "Endang Susilowati", "Aditya Pratama"
];

const AVATARS = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
];

const DOMAINS = ["gmail.com", "yahoo.co.id", "outlook.com", "holding.co.id", "pt-berkah.co.id"];

function generateAllDonationsForCampaign(camp, campaignId) {
  const targetCount = camp.donorCount;
  const targetSum = camp.collectedAmount;
  const recentDonors = camp.recentDonors || [];
  const recentSum = recentDonors.reduce((acc, d) => acc + d.amount, 0);

  const neededCount = Math.max(0, targetCount - recentDonors.length);
  const neededSum = Math.max(0, targetSum - recentSum);

  const items = [];
  if (neededCount > 0) {
    const avg = neededSum / neededCount;
    let currentSum = 0;

    const today = new Date("2026-09-17T12:00:00Z");
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 45);

    for (let i = 0; i < neededCount - 1; i++) {
      let amount = Math.max(25000, Math.round((avg * (0.5 + Math.random() * 0.9)) / 25000) * 25000);
      if (currentSum + amount >= neededSum - (neededCount - 1 - i) * 25000) {
        amount = 25000;
      }
      currentSum += amount;

      const progress = i / neededCount;
      const itemDate = new Date(startDate.getTime() + progress * (today.getTime() - startDate.getTime() - 24 * 3600 * 1000));

      const isAnon = i % 4 === 0;
      let name = "Hamba Allah";
      let email = "hamba.allah***@gmail.com";
      let avatar = null;

      if (!isAnon) {
        name = INDONESIAN_NAMES[i % INDONESIAN_NAMES.length];
        const dom = DOMAINS[i % DOMAINS.length];
        const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, ".");
        email = `${cleanName}${i > 40 ? i : ""}@${dom}`;
        avatar = AVATARS[i % AVATARS.length];
      }

      items.push({
        invoiceId: `INV-${camp.id}-hist-${i + 1}`,
        campaignId,
        donationType: "CAMPAIGN",
        amount,
        totalAmount: amount,
        paymentChannel: i % 2 === 0 ? "QRIS" : "BCA_VA",
        donorName: name,
        donorEmail: email,
        donorPhone: "081234567890",
        donorAvatar: avatar,
        isAnonymous: isAnon,
        prayer: isAnon ? "Semoga berkah dan bermanfaat." : "",
        status: "PAID",
        paidAt: itemDate,
        expiredAt: new Date(itemDate.getTime() + 24 * 3600 * 1000),
        createdAt: itemDate,
      });
    }

    const remainder = neededSum - currentSum;
    const lastDate = new Date(startDate.getTime() + 0.95 * (today.getTime() - startDate.getTime() - 24 * 3600 * 1000));
    const lastName = INDONESIAN_NAMES[neededCount % INDONESIAN_NAMES.length];
    const lastEmail = `${lastName.toLowerCase().replace(/[^a-z0-9]/g, ".")}@gmail.com`;
    const lastAvatar = AVATARS[neededCount % AVATARS.length];

    items.push({
      invoiceId: `INV-${camp.id}-hist-${neededCount}`,
      campaignId,
      donationType: "CAMPAIGN",
      amount: remainder,
      totalAmount: remainder,
      paymentChannel: "QRIS",
      donorName: lastName,
      donorEmail: lastEmail,
      donorPhone: "081234567890",
      donorAvatar: lastAvatar,
      isAnonymous: false,
      prayer: "Bismillah semoga berkah untuk sesama.",
      status: "PAID",
      paidAt: lastDate,
      expiredAt: new Date(lastDate.getTime() + 24 * 3600 * 1000),
      createdAt: lastDate,
    });
  }

  // Map recent donors
  const recentItems = recentDonors.map((d, idx) => ({
    invoiceId: `INV-${camp.id}-${d.id || `rec-${idx}`}`,
    campaignId,
    donationType: "CAMPAIGN",
    amount: d.amount,
    totalAmount: d.amount,
    paymentChannel: "QRIS",
    donorName: d.name,
    donorEmail: d.email || (d.isAnonymous ? "hamba.allah***@gmail.com" : `${d.name.toLowerCase().replace(/[^a-z0-9]/g, ".")}@gmail.com`),
    donorPhone: "081234567890",
    donorAvatar: d.isAnonymous ? null : (d.avatar || AVATARS[idx % AVATARS.length]),
    isAnonymous: Boolean(d.isAnonymous),
    prayer: d.prayer || null,
    status: "PAID",
    paidAt: new Date(d.date),
    expiredAt: new Date(new Date(d.date).getTime() + 24 * 60 * 60 * 1000),
    createdAt: new Date(d.date),
  }));

  return [...items, ...recentItems];
}

async function main() {
  console.log("🌱 Memulai seeding database PostgreSQL...");

  // 1. Seed Categories (Skip 'all')
  console.log("📁 Menanam data Kategori...");
  const validCategories = CATEGORIES.filter((c) => c.id !== "all");
  for (const cat of validCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      },
    });
  }

  // 2. Seed Campaigns & Updates
  console.log("🎯 Menanam data Program Campaign & Update Penyaluran...");
  for (const camp of CAMPAIGNS) {
    const createdCampaign = await prisma.campaign.upsert({
      where: { slug: camp.slug },
      update: {
        title: camp.title,
        categoryId: camp.categoryId,
        targetAmount: camp.targetAmount,
        collectedAmount: camp.collectedAmount,
        donorCount: camp.donorCount,
        endDate: new Date(camp.endDate),
        isUrgent: camp.isUrgent ?? false,
        isFeatured: camp.isFeatured ?? false,
        location: camp.location || null,
        excerpt: camp.excerpt || null,
        story: camp.story,
        bannerUrl: camp.bannerUrl || null,
      },
      create: {
        id: camp.id,
        title: camp.title,
        slug: camp.slug,
        categoryId: camp.categoryId,
        targetAmount: camp.targetAmount,
        collectedAmount: camp.collectedAmount,
        donorCount: camp.donorCount,
        endDate: new Date(camp.endDate),
        isUrgent: camp.isUrgent ?? false,
        isFeatured: camp.isFeatured ?? false,
        location: camp.location || null,
        excerpt: camp.excerpt || null,
        story: camp.story,
        bannerUrl: camp.bannerUrl || null,
      },
    });

    // Seed Campaign Updates if any
    if (camp.updates && Array.isArray(camp.updates)) {
      for (const upd of camp.updates) {
        await prisma.campaignUpdate.upsert({
          where: { id: upd.id },
          update: {
            title: upd.title,
            content: upd.content,
            disbursedAmount: upd.disbursedAmount,
            date: new Date(upd.date),
          },
          create: {
            id: upd.id,
            campaignId: createdCampaign.id,
            title: upd.title,
            content: upd.content,
            disbursedAmount: upd.disbursedAmount,
            date: new Date(upd.date),
          },
        });
      }
    }

    // Seed authentic donations matching exact donorCount and collectedAmount
    const campaignDonations = generateAllDonationsForCampaign(camp, createdCampaign.id);
    await prisma.donation.deleteMany({ where: { campaignId: createdCampaign.id } });

    const batchSize = 500;
    for (let i = 0; i < campaignDonations.length; i += batchSize) {
      const batch = campaignDonations.slice(i, i + batchSize);
      await prisma.donation.createMany({ data: batch });
    }
  }

  // 3. Seed Audit Reports
  console.log("📑 Menanam data Laporan Audit KAP...");
  for (const rep of AUDIT_REPORTS) {
    await prisma.auditReport.upsert({
      where: { id: rep.id },
      update: {
        year: rep.year,
        title: rep.title,
        auditorName: rep.auditorName,
        opinionStatus: rep.opinionStatus,
        totalFundsIn: rep.totalFundsIn,
        totalFundsOut: rep.totalFundsOut,
        beneficiaryCount: rep.beneficiaryCount,
        operationalRatio: rep.operationalRatio || null,
        summary: rep.summary || null,
        pdfUrl: rep.pdfUrl || null,
      },
      create: {
        id: rep.id,
        year: rep.year,
        title: rep.title,
        auditorName: rep.auditorName,
        opinionStatus: rep.opinionStatus,
        totalFundsIn: rep.totalFundsIn,
        totalFundsOut: rep.totalFundsOut,
        beneficiaryCount: rep.beneficiaryCount,
        operationalRatio: rep.operationalRatio || null,
        summary: rep.summary || null,
        pdfUrl: rep.pdfUrl || null,
      },
    });
  }

  // 4. Seed Articles
  console.log("📰 Menanam data Artikel & Literasi...");
  for (const art of ARTICLES) {
    const validCategories = validateArticleCategories(art.categories || [art.category]);
    await prisma.article.upsert({
      where: { slug: art.slug },
      update: {
        title: art.title,
        category: validCategories[0],
        categories: validCategories,
        tags: art.tags || [],
        excerpt: art.excerpt,
        content: art.content,
        author: art.author,
        bannerUrl: art.bannerUrl || null,
        imageSource: art.imageSource || null,
        imageSourceUrl: art.imageSourceUrl || null,
        likeCount: art.likeCount || 0,
        dislikeCount: art.dislikeCount || 0,
        publishedAt: new Date(art.publishedAt),
      },
      create: {
        id: art.id,
        title: art.title,
        slug: art.slug,
        category: validCategories[0],
        categories: validCategories,
        tags: art.tags || [],
        excerpt: art.excerpt,
        content: art.content,
        author: art.author,
        bannerUrl: art.bannerUrl || null,
        imageSource: art.imageSource || null,
        imageSourceUrl: art.imageSourceUrl || null,
        likeCount: art.likeCount || 0,
        dislikeCount: art.dislikeCount || 0,
        publishedAt: new Date(art.publishedAt),
      },
    });
  }

  // 5. Seed Instagram Posts
  console.log("📸 Menanam data 12 Postingan Dokumentasi Instagram...");
  for (const ig of INSTAGRAM_POSTS) {
    await prisma.instagramPost.upsert({
      where: { id: ig.id },
      update: {
        caption: ig.caption,
        imageUrl: ig.imageUrl,
        altText: ig.alt,
        postUrl: ig.postUrl || "https://www.instagram.com",
        likeCount: ig.likes || 0,
        commentCount: ig.comments || 0,
      },
      create: {
        id: ig.id,
        caption: ig.caption,
        imageUrl: ig.imageUrl,
        altText: ig.alt,
        postUrl: ig.postUrl || "https://www.instagram.com",
        likeCount: ig.likes || 0,
        commentCount: ig.comments || 0,
      },
    });
  }

  console.log("✅ Seeding database selesai dengan sempurna!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
