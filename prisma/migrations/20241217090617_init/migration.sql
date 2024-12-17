-- CreateTable
CREATE TABLE "Lov" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "shared" BOOLEAN NOT NULL DEFAULT false,
    "issuer" TEXT,
    "book" TEXT,

    CONSTRAINT "Lov_pkey" PRIMARY KEY ("key") 
);
