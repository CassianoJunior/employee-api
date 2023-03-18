-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "salary" REAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");
