import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";  
import * as bcrypt from "bcrypt";  

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter })

async function main() {

  // ──────────────────────────────────────────
  // FOUNDERS
  // ──────────────────────────────────────────

  const founder1 = await prisma.user.upsert({
    where: { email: 'alice@startupmatch.com' },
    update: {},
    create: {
      email: 'alice@startupmatch.com',
      password: await bcrypt.hash('password123', 10),  // ← hasher
      name: 'Alice Martin',
      bio: 'Fondatrice FinTech, je cherche un dev mobile pour construire mon MVP.',
      role: 'FOUNDER',
    },
  })

  const founder2 = await prisma.user.upsert({
    where: { email: 'thomas@startupmatch.com' },
    update: {},
    create: {
      email: 'thomas@startupmatch.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Thomas Durand',
      bio: 'CEO HealthTech, je cherche un développeur backend expérimenté.',
      role: 'FOUNDER',
    },
  })

  const founder3 = await prisma.user.upsert({
    where: { email: 'sarah@startupmatch.com' },
    update: {},
    create: {
      email: 'sarah@startupmatch.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Sarah Leblanc',
      bio: 'Fondatrice EdTech, je cherche un dev fullstack pour une plateforme e-learning.',
      role: 'FOUNDER',
    },
  })

  // ──────────────────────────────────────────
  // DEVELOPERS
  // ──────────────────────────────────────────

  const dev1 = await prisma.user.upsert({
    where: { email: 'bob@startupmatch.com' },
    update: {},
    create: {
      email: 'bob@startupmatch.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Bob Dupont',
      bio: 'Dev mobile React Native + Flutter. 4 ans experience.',
      role: 'DEVELOPER',
    },
  })

  const dev2 = await prisma.user.upsert({
    where: { email: 'kevin@startupmatch.com' },
    update: {},
    create: {
      email: 'kevin@startupmatch.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Kevin Moreau',
      bio: 'Dev backend NestJS + PostgreSQL. Architectures scalables.',
      role: 'DEVELOPER',
    },
  })

  const dev3 = await prisma.user.upsert({
    where: { email: 'julie@startupmatch.com' },
    update: {},
    create: {
      email: 'julie@startupmatch.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Julie Bernard',
      bio: 'Fullstack Next.js + Node.js. Projets EdTech et HealthTech.',
      role: 'DEVELOPER',
    },
  })

  // ──────────────────────────────────────────
  // MISSIONS
  // ──────────────────────────────────────────

  const mission1 = await prisma.mission.upsert({
    where: { id: 'mission-1' },
    update: {},
    create: {
      id: 'mission-1',
      title: 'Dev mobile React Native pour app FinTech',
      description: 'App de paiement mobile B2C. Cherche dev React Native avec expérience en intégration API.',
      status: 'OPEN',
      founderId: founder1.id,
    },
  })

  const mission2 = await prisma.mission.upsert({
    where: { id: 'mission-2' },
    update: {},
    create: {
      id: 'mission-2',
      title: 'Dev backend pour plateforme HealthTech',
      description: 'Plateforme de suivi médical. Cherche dev backend NestJS avec expérience en sécurité des données.',
      status: 'OPEN',
      founderId: founder2.id,
    },
  })

  const mission3 = await prisma.mission.upsert({
    where: { id: 'mission-3' },
    update: {},
    create: {
      id: 'mission-3',
      title: 'Dev fullstack pour e-learning EdTech',
      description: 'Plateforme e-learning nouvelle génération. Cherche dev fullstack Next.js avec expérience UX.',
      status: 'OPEN',
      founderId: founder3.id,
    },
  })

  // ──────────────────────────────────────────
  // MISSION SWIPES
  // ──────────────────────────────────────────

  await prisma.missionSwipe.upsert({
    where: { developerId_missionId: { developerId: dev1.id, missionId: mission1.id } },
    update: {},
    create: { developerId: dev1.id, missionId: mission1.id, direction: 'LIKE', status: 'PENDING' },
  })

  await prisma.missionSwipe.upsert({
    where: { developerId_missionId: { developerId: dev2.id, missionId: mission2.id } },
    update: {},
    create: { developerId: dev2.id, missionId: mission2.id, direction: 'LIKE', status: 'PENDING' },
  })

  await prisma.missionSwipe.upsert({
    where: { developerId_missionId: { developerId: dev3.id, missionId: mission3.id } },
    update: {},
    create: { developerId: dev3.id, missionId: mission3.id, direction: 'LIKE', status: 'PENDING' },
  })

  await prisma.missionSwipe.upsert({
    where: { developerId_missionId: { developerId: dev1.id, missionId: mission2.id } },
    update: {},
    create: { developerId: dev1.id, missionId: mission2.id, direction: 'DISLIKE' },
  })

  // ──────────────────────────────────────────
  // PROFILE SWIPES
  // ──────────────────────────────────────────

  await prisma.profileSwipe.upsert({
    where: { founderId_developerId: { founderId: founder1.id, developerId: dev1.id } },
    update: {},
    create: { founderId: founder1.id, developerId: dev1.id, direction: 'LIKE', status: 'ACCEPTED' },
  })

  await prisma.profileSwipe.upsert({
    where: { founderId_developerId: { founderId: founder2.id, developerId: dev2.id } },
    update: {},
    create: { founderId: founder2.id, developerId: dev2.id, direction: 'LIKE', status: 'PENDING' },
  })

  await prisma.profileSwipe.upsert({
    where: { founderId_developerId: { founderId: founder3.id, developerId: dev1.id } },
    update: {},
    create: { founderId: founder3.id, developerId: dev1.id, direction: 'DISLIKE' },
  })

  // ──────────────────────────────────────────
  // MATCHES
  // ──────────────────────────────────────────

  await prisma.match.upsert({
    where: { developerId_missionId: { developerId: dev1.id, missionId: mission1.id } },
    update: {},
    create: { developerId: dev1.id, founderId: founder1.id, missionId: mission1.id },
  })

  console.log('🎉 Seeding completed!')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })