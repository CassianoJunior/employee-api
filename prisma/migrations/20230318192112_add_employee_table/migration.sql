-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "profilePicture" TEXT,
    "hiringDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_cpf_key" ON "employees"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");
