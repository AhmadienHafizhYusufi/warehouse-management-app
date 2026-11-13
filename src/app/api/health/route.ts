import mongoose from "mongoose";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Koneksi database belum siap");
    }

    await db.admin().command({ ping: 1 });
    const hello = await db.admin().command({ hello: 1 });

    return Response.json({
      status: "ok",
      database: db.databaseName,
      replicaSet: hello.setName ?? null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ status: "error", message }, { status: 503 });
  }
}
