import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";
import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
  userAc,
} from "better-auth/plugins/admin/access";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI belum diisi. Cek file .env.local");
}

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

const client = globalForMongo.mongoClient ?? new MongoClient(uri);
globalForMongo.mongoClient = client;

const ac = createAccessControl(defaultStatements);
const adminRole = ac.newRole(adminAc.statements);
const staffRole = ac.newRole(userAc.statements);

export const auth = betterAuth({
  database: mongodbAdapter(client.db(), { client }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  plugins: [
    admin({
      ac,
      roles: { admin: adminRole, staff: staffRole },
      defaultRole: "staff",
      adminRoles: ["admin"],
    }),
    nextCookies(),
  ],
});
