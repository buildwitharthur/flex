-- CreateEnum
CREATE TYPE "ContactSource" AS ENUM ('WEBSITE', 'MANUAL');

-- DropIndex
DROP INDEX "contacts_type_idx";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "company",
DROP COLUMN "type",
ADD COLUMN     "source" "ContactSource" NOT NULL;

-- DropEnum
DROP TYPE "ContactType";

-- CreateIndex
CREATE UNIQUE INDEX "contacts_phone_key" ON "contacts"("phone");

-- CreateIndex
CREATE INDEX "contacts_source_idx" ON "contacts"("source");

