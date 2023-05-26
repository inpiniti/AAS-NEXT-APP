-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "access_token" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
