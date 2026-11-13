import { auth } from "@/lib/auth";

async function main() {
  const name = process.env.SEED_ADMIN_NAME;
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error(
      "SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, dan SEED_ADMIN_PASSWORD wajib diisi di .env.local",
    );
  }

  const result = await auth.api.createUser({
    body: { name, email, password, role: "admin" },
  });

  console.log(`Admin berhasil dibuat: ${result.user.email}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Gagal membuat admin:", error.message ?? error);
    process.exit(1);
  });
