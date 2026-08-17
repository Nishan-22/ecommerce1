import { requireAdmin } from "@/lib/auth";
import { readJsonFile, writeJsonFile } from "@/lib/store";
import type { Product } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const products = await readJsonFile<Product[]>("products.json");
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, price, image, description } = await request.json();

  if (!name || !price) {
    return NextResponse.json(
      { error: "Name and price are required" },
      { status: 400 }
    );
  }

  const products = await readJsonFile<Product[]>("products.json");
  const newProduct: Product = {
    id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    name,
    price: Number(price),
    image: image || undefined,
    description: description || undefined,
  };

  await writeJsonFile("products.json", [...products, newProduct]);

  return NextResponse.json({ product: newProduct }, { status: 201 });
}