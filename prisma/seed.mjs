import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { CATEGORIES } from "../src/data/categories.js";
import { CAMPAIGNS } from "../src/data/campaigns.js";
import { AUDIT_REPORTS } from "../src/data/reports.js";
import { ARTICLES } from "../src/data/articles.js";
import { INSTAGRAM_POSTS } from "../src/data/instagramPosts.js";

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

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

    // Seed Sample Recent Donors if any
    if (camp.recentDonors && Array.isArray(camp.recentDonors)) {
      for (let i = 0; i < camp.recentDonors.length; i++) {
        const donor = camp.recentDonors[i];
        const invoiceId = `INV-${camp.id}-${donor.id}`;
        await prisma.donation.upsert({
          where: { invoiceId },
          update: {},
          create: {
            invoiceId,
            campaignId: createdCampaign.id,
            amount: donor.amount,
            totalAmount: donor.amount,
            paymentChannel: "QRIS",
            donorName: donor.name,
            donorPhone: "081234567890",
            isAnonymous: donor.name.toLowerCase().includes("hamba allah"),
            prayer: donor.prayer || null,
            status: "PAID",
            paidAt: new Date(donor.date),
            expiredAt: new Date(new Date(donor.date).getTime() + 24 * 60 * 60 * 1000),
            createdAt: new Date(donor.date),
          },
        });
      }
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
    await prisma.article.upsert({
      where: { slug: art.slug },
      update: {
        title: art.title,
        category: art.category,
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
        category: art.category,
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
