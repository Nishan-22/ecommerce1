import { getSession, requireAdmin } from "@/lib/auth";
import { readJsonFile, writeJsonFile } from "@/lib/store";
import { NextRequest, NextResponse } from "next/server";

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  transactionUuid: string;
  refId: string;
  status: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: string;
}

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await readJsonFile<Order[]>("orders.json");
  return NextResponse.json({ orders });
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { transactionUuid, refId, status, customer, items, subtotal, shipping, tax, total } =
    body;

  if (!transactionUuid || !customer || !items || !total) {
    return NextResponse.json(
      { error: "Missing order data" },
      { status: 400 }
    );
  }

  const orders = await readJsonFile<Order[]>("orders.json");
  const order: Order = {
    id: orders.length ? Math.max(...orders.map((o) => o.id)) + 1 : 1,
    transactionUuid,
    refId: refId || "",
    status: status || "COMPLETE",
    customer,
    items,
    subtotal: Number(subtotal) || 0,
    shipping: Number(shipping) || 0,
    tax: Number(tax) || 0,
    total: Number(total),
    createdAt: new Date().toISOString(),
  };

  await writeJsonFile("orders.json", [...orders, order]);

  return NextResponse.json({ order }, { status: 201 });
}