"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { pdf } from "@react-pdf/renderer";
import QuotePDFDocument from "./QuotePDFDocument";
import LoginScreen from "./LoginScreen";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

type LineItem = {
  qty: number;
  description: string;
  unitPrice: number;
};

type QuoteData = {
  invoiceNumber: string;
  date: string;
  clientName: string;
  clientAddress: string;
  businessType: string;
  technicianName: string;
  jobType: string;
  lineItems: LineItem[];
  notes: string;
};

const SERVICE_OPTIONS = [
  "Installation",
  "Repair",
  "Maintenance",
  "Commercial",
  "Emergency Service",
  "Residential",
];

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export default function QuotePageContent() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [form, setForm] = useState<QuoteData>({
    invoiceNumber: "",
    date: getToday(),
    clientName: "",
    clientAddress: "",
    businessType: "",
    technicianName: "",
    jobType: "Installation",
    lineItems: [{ qty: 1, description: "", unitPrice: 0 }],
    notes: "",
  });

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("mgm_admin_auth");
    setAuthenticated(stored === "true");
    setAuthChecked(true);
  }, []);

  if (!authChecked) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-sky-50">
        <div className="text-slate-400 text-sm">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onSuccess={() => setAuthenticated(true)} />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: string) => {
    setForm((prev) => {
      const items = [...prev.lineItems];
      if (field === "description") {
        items[index] = { ...items[index], description: value };
      } else {
        items[index] = { ...items[index], [field]: parseFloat(value) || 0 };
      }
      return { ...prev, lineItems: items };
    });
  };

  const addLineItem = () => {
    setForm((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, { qty: 1, description: "", unitPrice: 0 }],
    }));
  };

  const removeLineItem = (index: number) => {
    setForm((prev) => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index),
    }));
  };

  const getLineTotal = (item: LineItem) => item.qty * item.unitPrice;
  const getTotal = () => form.lineItems.reduce((sum, item) => sum + getLineTotal(item), 0);

  const inputClass =
    "border-[1.5px] border-slate-200 focus:border-sky-500 rounded-xl px-4 py-3 text-sm text-slate-900 bg-sky-50 focus:bg-white outline-none transition-colors w-full";
  const labelClass =
    "text-[0.7rem] font-bold text-slate-700 uppercase tracking-wide mb-1.5 block";

  return (
    <section className="bg-sky-50 py-12 px-4 md:px-8 min-h-[60vh]">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <p className="text-xs font-bold text-sky-500 uppercase tracking-[2px] mb-2">
            Admin Tool
          </p>
          <h1
            className="font-black text-slate-900 text-3xl tracking-[-1px]"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Quote Generator
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-sky-500/10 shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 md:p-10">
          {/* Invoice Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className={labelClass}>Invoice Number</label>
              <input
                name="invoiceNumber"
                type="text"
                value={form.invoiceNumber}
                onChange={handleChange}
                placeholder="INV-001"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Client Info */}
          <h3
            className="font-bold text-slate-900 text-lg mb-4"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Client Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass}>Client Name</label>
              <input
                name="clientName"
                type="text"
                value={form.clientName}
                onChange={handleChange}
                placeholder="Client name"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Business Type</label>
              <input
                name="businessType"
                type="text"
                value={form.businessType}
                onChange={handleChange}
                placeholder="e.g. Restaurant"
                className={inputClass}
              />
            </div>
          </div>
          <div className="mb-8">
            <label className={labelClass}>Client Address</label>
            <input
              name="clientAddress"
              type="text"
              value={form.clientAddress}
              onChange={handleChange}
              placeholder="Full address"
              className={inputClass}
            />
          </div>

          {/* Job Info */}
          <h3
            className="font-bold text-slate-900 text-lg mb-4"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Job Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className={labelClass}>Technician Name</label>
              <input
                name="technicianName"
                type="text"
                value={form.technicianName}
                onChange={handleChange}
                placeholder="Technician name"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Job Type</label>
              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
                className={inputClass}
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Line Items */}
          <h3
            className="font-bold text-slate-900 text-lg mb-4"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Line Items
          </h3>

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[60px_1fr_120px_120px_40px] gap-3 mb-2 px-1">
            <span className={labelClass}>Qty</span>
            <span className={labelClass}>Description</span>
            <span className={labelClass}>Unit Price</span>
            <span className={labelClass}>Total</span>
            <span></span>
          </div>

          {/* Line Item Rows */}
          {form.lineItems.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[60px_1fr_120px_120px_40px] gap-3 mb-3 items-start"
            >
              <div>
                <label className={`${labelClass} md:hidden`}>Qty</label>
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) => updateLineItem(i, "qty", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={`${labelClass} md:hidden`}>Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateLineItem(i, "description", e.target.value)}
                  placeholder="Service description"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={`${labelClass} md:hidden`}>Unit Price</label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={item.unitPrice || ""}
                  onChange={(e) => updateLineItem(i, "unitPrice", e.target.value)}
                  placeholder="0.00"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={`${labelClass} md:hidden`}>Total</label>
                <div className="border-[1.5px] border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-900 bg-slate-50">
                  ${getLineTotal(item).toFixed(2)}
                </div>
              </div>
              <div className="flex items-end md:items-center h-full">
                {form.lineItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLineItem(i)}
                    className="text-red-400 hover:text-red-600 text-lg font-bold transition-colors cursor-pointer p-2"
                    title="Remove line item"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addLineItem}
            className="text-sky-500 hover:text-sky-700 text-sm font-semibold mt-2 mb-8 transition-colors cursor-pointer"
          >
            + Add Line Item
          </button>

          {/* Notes */}
          <div className="mb-6">
            <label className={labelClass}>Payment Terms / Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Payment terms, special notes..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Total */}
          <div className="flex justify-end mb-8">
            <div className="text-right">
              <span className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-wide block mb-1">
                Total
              </span>
              <span
                className="text-3xl font-black text-slate-900"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                ${getTotal().toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex-1 border-2 border-sky-500 text-sky-500 hover:bg-sky-50 font-bold py-3.5 rounded-xl transition-colors cursor-pointer"
            >
              {showPreview ? "Hide Preview" : "Preview"}
            </button>
            <button
              type="button"
              onClick={async () => {
                const blob = await pdf(<QuotePDFDocument data={form} />).toBlob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `MGM-Quote-${form.invoiceNumber || "draft"}.pdf`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex-1 bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold py-3.5 rounded-xl shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:shadow-[0_8px_28px_rgba(14,165,233,0.4)] hover:-translate-y-px transition-all cursor-pointer"
            >
              Download PDF
            </button>
          </div>
        </div>

        {showPreview && (
          <div className="mt-8 rounded-2xl border border-sky-500/10 shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden">
            <PDFViewer
              width="100%"
              height={700}
              showToolbar={false}
              style={{ border: "none" }}
            >
              <QuotePDFDocument data={form} />
            </PDFViewer>
          </div>
        )}
      </div>
    </section>
  );
}
