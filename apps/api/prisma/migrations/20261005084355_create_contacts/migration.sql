-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('PARTNER', 'MEMBER');

-- CreateEnum
CREATE TYPE "ContactStage" AS ENUM ('NEW', 'CONTACTED', 'NEGOTIATION', 'COMPLETED', 'LOST');

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "type" "ContactType" NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "stage" "ContactStage" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contacts_type_idx" ON "contacts"("type");

-- CreateIndex
CREATE INDEX "contacts_stage_idx" ON "contacts"("stage");

-- CreateIndex
CREATE INDEX "contacts_createdAt_idx" ON "contacts"("createdAt");
