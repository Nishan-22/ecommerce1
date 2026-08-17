import { NextRequest, NextResponse } from "next/server";
import { ESEWA_CONFIG } from "@/lib/esewa";

function decodeResponseData(encoded: string | null): {
  transactionUuid?: string;
  totalAmount?: number;
  refId?: string;
  status?: string;
} {
  if (!encoded) return {};
  try {
    const json = JSON.parse(
      Buffer.from(encoded, "base64").toString("utf-8")
    );
    return {
      transactionUuid: json.transaction_uuid,
      totalAmount: json.total_amount,
      refId: json.ref_id,
      status: json.status,
    };
  } catch {
    return {};
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const data = decodeResponseData(searchParams.get("data"));

  const transactionUuid =
    data.transactionUuid || searchParams.get("transaction_uuid");
  const totalAmount =
    data.totalAmount ?? Number(searchParams.get("total_amount"));

  if (!transactionUuid || !totalAmount) {
    return NextResponse.json(
      { error: "Missing verification parameters", verified: false },
      { status: 400 }
    );
  }

  try {
    const url = new URL(ESEWA_CONFIG.statusUrl);
    url.searchParams.set("product_code", ESEWA_CONFIG.productCode);
    url.searchParams.set("total_amount", String(totalAmount));
    url.searchParams.set("transaction_uuid", transactionUuid);

    const res = await fetch(url.toString());
    const result = await res.json();

    const verified = result.status === "COMPLETE";

    return NextResponse.json({
      verified,
      status: result.status,
      refId: result.ref_id,
      transactionUuid,
      totalAmount,
    });
  } catch (error) {
    console.error("eSewa verify error:", error);
    return NextResponse.json(
      { error: "Verification failed", verified: false },
      { status: 500 }
    );
  }
}