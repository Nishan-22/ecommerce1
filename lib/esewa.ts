import crypto from "crypto";

export const ESEWA_CONFIG = {
  // eSewa sandbox (test) endpoint. Switch to production when you have a live
  // merchant account: https://esewa.com.np/api/epay/v2/form
  paymentUrl:
    process.env.ESEWA_PAYMENT_URL ||
    "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
  statusUrl:
    process.env.ESEWA_STATUS_URL ||
    "https://rc.esewa.com.np/api/epay/transaction/status/",
  productCode: process.env.ESEWA_PRODUCT_CODE || "EPAYTEST",
  secretKey:
    process.env.ESEWA_SECRET_KEY || "8gBm/:&EnhH.1/q",
  successUrl: process.env.ESEWA_SUCCESS_URL,
  failureUrl: process.env.ESEWA_FAILURE_URL,
};

export interface EsewaPaymentRequest {
  amount: number;
  taxAmount: number;
  totalAmount: number;
  transactionUuid: string;
  productServiceCharge: number;
  productDeliveryCharge: number;
  productName: string;
}

export function generateTransactionUuid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function buildSignature({
  totalAmount,
  transactionUuid,
  productCode,
  secretKey,
}: {
  totalAmount: number;
  transactionUuid: string;
  productCode: string;
  secretKey: string;
}): string {
  const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
  return crypto
    .createHmac("sha256", secretKey)
    .update(message)
    .digest("base64");
}