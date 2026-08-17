import { NextRequest, NextResponse } from "next/server";
import {
  buildSignature,
  ESEWA_CONFIG,
  EsewaPaymentRequest,
} from "@/lib/esewa";

export async function POST(request: NextRequest) {
  try {
    const body: EsewaPaymentRequest = await request.json();

    if (
      !body.amount ||
      !body.totalAmount ||
      !body.transactionUuid ||
      !body.productName
    ) {
      return NextResponse.json(
        { error: "Missing required payment fields" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
    const successUrl =
      ESEWA_CONFIG.successUrl || `${baseUrl}/payment/success`;
    const failureUrl =
      ESEWA_CONFIG.failureUrl || `${baseUrl}/payment/cancel`;

    const signature = buildSignature({
      totalAmount: body.totalAmount,
      transactionUuid: body.transactionUuid,
      productCode: ESEWA_CONFIG.productCode,
      secretKey: ESEWA_CONFIG.secretKey,
    });

    const formData = {
      amount: body.amount.toFixed(2),
      tax_amount: body.taxAmount.toFixed(2),
      total_amount: body.totalAmount.toFixed(2),
      transaction_uuid: body.transactionUuid,
      product_code: ESEWA_CONFIG.productCode,
      product_service_charge: body.productServiceCharge.toFixed(2),
      product_delivery_charge: body.productDeliveryCharge.toFixed(2),
      success_url: successUrl,
      failure_url: failureUrl,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature,
    };

    return NextResponse.json({
      formData,
      paymentUrl: ESEWA_CONFIG.paymentUrl,
    });
  } catch (error) {
    console.error("eSewa initiate error:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment" },
      { status: 500 }
    );
  }
}