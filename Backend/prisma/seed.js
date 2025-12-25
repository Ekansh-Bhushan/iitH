const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  /* ================== USERS ================== */
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "ekansh@greenledger.com" },
      update: {},
      create: {
        name: "Ekansh Bhushan",
        email: "ekansh@greenledger.com",
        householdSize: 3,
        city: "Delhi",
      },
    }),

    prisma.user.upsert({
      where: { email: "atlas@greenledger.com" },
      update: {},
      create: {
        name: "Atlas Verma",
        email: "atlas@greenledger.com",
        householdSize: 2,
        city: "Bangalore",
      },
    }),

    prisma.user.upsert({
      where: { email: "riya@greenledger.com" },
      update: {},
      create: {
        name: "Riya Sharma",
        email: "riya@greenledger.com",
        householdSize: 4,
        city: "Mumbai",
      },
    }),
  ]);

  const [ekansh, atlas, riya] = users;

  console.log("✅ Demo users ready:", users.map(u => u.email));

  /* ================== RESOURCES ================== */
  await prisma.resource.createMany({
    data: [
      { id: 1, name: "Electricity", unit: "kWh", co2Factor: 0.82 },
      { id: 2, name: "Water", unit: "Liters", co2Factor: 0.0003 },
      { id: 3, name: "Fuel", unit: "INR", co2Factor: 0.002 },
      { id: 4, name: "Waste", unit: "Kg", co2Factor: 0.5 },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Resources seeded");

  /* ================== BENCHMARKS ================== */
  await prisma.benchmark.createMany({
    data: [
      { resourceId: 1, householdSize: 3, avgValue: 220, region: "India" },
      { resourceId: 2, householdSize: 3, avgValue: 9000, region: "India" },
      { resourceId: 3, householdSize: 3, avgValue: 3000, region: "India" },
      { resourceId: 4, householdSize: 3, avgValue: 25, region: "India" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Benchmarks seeded");

  /* ================== USAGE DATA (ONLY FOR EKANSH) ================== */

  // Month 1 – Normal usage
  await prisma.usage.upsert({
    where: {
      userId_resourceId_month_year: {
        userId: ekansh.id,
        resourceId: 1,
        month: 5,
        year: 2025,
      },
    },
    update: {},
    create: {
      userId: ekansh.id,
      resourceId: 1,
      month: 5,
      year: 2025,
      value: 200,
      source: "MANUAL",
    },
  });

  await prisma.usage.upsert({
    where: {
      userId_resourceId_month_year: {
        userId: ekansh.id,
        resourceId: 2,
        month: 5,
        year: 2025,
      },
    },
    update: {},
    create: {
      userId: ekansh.id,
      resourceId: 2,
      month: 5,
      year: 2025,
      value: 8500,
      source: "MANUAL",
    },
  });

  // Month 2 – Inefficient usage
  const electricityJune = await prisma.usage.upsert({
    where: {
      userId_resourceId_month_year: {
        userId: ekansh.id,
        resourceId: 1,
        month: 6,
        year: 2025,
      },
    },
    update: {},
    create: {
      userId: ekansh.id,
      resourceId: 1,
      month: 6,
      year: 2025,
      value: 280,
      source: "MANUAL",
    },
  });

  const waterJune = await prisma.usage.upsert({
    where: {
      userId_resourceId_month_year: {
        userId: ekansh.id,
        resourceId: 2,
        month: 6,
        year: 2025,
      },
    },
    update: {},
    create: {
      userId: ekansh.id,
      resourceId: 2,
      month: 6,
      year: 2025,
      value: 12000,
      source: "MANUAL",
    },
  });

  console.log("✅ Usage data seeded");

  /* ================== FLAGS ================== */
  await prisma.wasteFlag.createMany({
    data: [
      {
        usageId: electricityJune.id,
        type: "SPIKE",
        reason: "Electricity usage increased more than 15% month-over-month",
        severity: "HIGH",
      },
      {
        usageId: electricityJune.id,
        type: "INEFFICIENCY",
        reason: "Electricity usage exceeds regional benchmark",
        severity: "MEDIUM",
      },
      {
        usageId: waterJune.id,
        type: "INEFFICIENCY",
        reason: "Water usage exceeds regional benchmark",
        severity: "MEDIUM",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Waste flags seeded");
  console.log("🎯 DATABASE SEED COMPLETE – DEMO READY");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
