import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

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

const NAVY = "#0F172A";
const SKY = "#0EA5E9";
const SKY_LIGHT = "#BAE6FD";
const ICE = "#F0F9FF";
const SLATE = "#475569";

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: NAVY,
    padding: 40,
    paddingTop: 0,
  },
  // Header
  header: {
    backgroundColor: NAVY,
    marginHorizontal: -40,
    padding: 30,
    paddingHorizontal: 40,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {},
  companyName: {
    fontSize: 18,
    fontWeight: 700,
    color: "white",
    marginBottom: 6,
  },
  companyAC: {
    color: SKY,
  },
  companyDetail: {
    fontSize: 8,
    color: SKY_LIGHT,
    marginBottom: 2,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  invoiceLabel: {
    fontSize: 22,
    fontWeight: 700,
    color: SKY,
    marginBottom: 4,
  },
  invoiceDetail: {
    fontSize: 9,
    color: SKY_LIGHT,
    marginBottom: 2,
  },
  // Client / Job Info
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoBlock: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 7,
    fontWeight: 700,
    color: SKY,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 10,
    color: NAVY,
    marginBottom: 2,
  },
  infoValueBold: {
    fontSize: 11,
    fontWeight: 700,
    color: NAVY,
    marginBottom: 2,
  },
  infoValueLight: {
    fontSize: 9,
    color: SLATE,
  },
  // Table
  tableHeader: {
    flexDirection: "row",
    backgroundColor: SKY,
    borderRadius: 4,
    padding: 8,
    marginBottom: 2,
  },
  tableHeaderText: {
    color: "white",
    fontWeight: 700,
    fontSize: 8,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  tableRowAlt: {
    backgroundColor: ICE,
  },
  colQty: { width: "8%" },
  colDesc: { width: "52%" },
  colPrice: { width: "20%", textAlign: "right" },
  colTotal: { width: "20%", textAlign: "right" },
  cellText: {
    fontSize: 9,
  },
  // Total
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    paddingRight: 8,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: NAVY,
    marginRight: 16,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 700,
    color: NAVY,
  },
  // Notes
  notesSection: {
    marginTop: 24,
    padding: 12,
    backgroundColor: ICE,
    borderRadius: 6,
  },
  notesLabel: {
    fontSize: 7,
    fontWeight: 700,
    color: SKY,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  notesText: {
    fontSize: 9,
    color: SLATE,
    lineHeight: 1.5,
  },
  // Footer
  footer: {
    marginTop: "auto",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    alignItems: "center",
  },
  footerPayment: {
    fontSize: 9,
    fontWeight: 700,
    color: NAVY,
    marginBottom: 8,
    textAlign: "center",
  },
  footerPayable: {
    fontSize: 8,
    color: SLATE,
    marginBottom: 6,
  },
  footerThankYou: {
    fontSize: 11,
    fontWeight: 700,
    color: SKY,
    letterSpacing: 1,
  },
});

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${month}/${day}/${year}`;
}

export default function QuotePDFDocument({ data }: { data: QuoteData }) {
  const total = data.lineItems.reduce(
    (sum, item) => sum + item.qty * item.unitPrice,
    0
  );

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.companyName}>
              MGM <Text style={s.companyAC}>A/C</Text> APPLIANCES
            </Text>
            <Text style={s.companyDetail}>Phone: (305) 720-8273</Text>
            <Text style={s.companyDetail}>Email: sales@mgm-ac-appliances.com</Text>
            <Text style={s.companyDetail}>781 SE 5TH PL HIALEAH FL 33010</Text>
          </View>
          <View style={s.headerRight}>
            <Text style={s.invoiceLabel}>QUOTE</Text>
            {data.invoiceNumber && (
              <Text style={s.invoiceDetail}>#INV-{data.invoiceNumber}</Text>
            )}
            <Text style={s.invoiceDetail}>Date: {formatDate(data.date)}</Text>
          </View>
        </View>

        {/* Client & Job Info */}
        <View style={s.infoRow}>
          <View style={s.infoBlock}>
            <Text style={s.infoLabel}>Bill To</Text>
            {data.clientName && (
              <Text style={s.infoValueBold}>{data.clientName}</Text>
            )}
            {data.clientAddress && (
              <Text style={s.infoValue}>{data.clientAddress}</Text>
            )}
            {data.businessType && (
              <Text style={s.infoValueLight}>({data.businessType})</Text>
            )}
          </View>
          <View style={[s.infoBlock, { alignItems: "flex-end" }]}>
            <Text style={s.infoLabel}>Job Details</Text>
            {data.technicianName && (
              <Text style={s.infoValue}>Technician: {data.technicianName}</Text>
            )}
            <Text style={s.infoValue}>Service: {data.jobType}</Text>
          </View>
        </View>

        {/* Line Items Table */}
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderText, s.colQty]}>Qty</Text>
          <Text style={[s.tableHeaderText, s.colDesc]}>Description</Text>
          <Text style={[s.tableHeaderText, s.colPrice]}>Unit Price</Text>
          <Text style={[s.tableHeaderText, s.colTotal]}>Total</Text>
        </View>

        {data.lineItems
          .filter((item) => item.description)
          .map((item, i) => (
            <View
              key={i}
              style={[s.tableRow, i % 2 === 1 ? s.tableRowAlt : {}]}
            >
              <Text style={[s.cellText, s.colQty]}>{item.qty}</Text>
              <Text style={[s.cellText, s.colDesc]}>{item.description}</Text>
              <Text style={[s.cellText, s.colPrice]}>
                {formatCurrency(item.unitPrice)}
              </Text>
              <Text style={[s.cellText, s.colTotal]}>
                {formatCurrency(item.qty * item.unitPrice)}
              </Text>
            </View>
          ))}

        {/* Total */}
        <View style={s.totalRow}>
          <Text style={s.totalLabel}>TOTAL:</Text>
          <Text style={s.totalValue}>{formatCurrency(total)}</Text>
        </View>

        {/* Notes */}
        {data.notes && (
          <View style={s.notesSection}>
            <Text style={s.notesLabel}>Notes</Text>
            <Text style={s.notesText}>{data.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerPayment}>
            A 25% deposit is required upon acceptance of this quote. The remaining balance is due upon completion of the work.
          </Text>
          <Text style={s.footerPayable}>
            Make all checks payable to: MGM AC APPLIANCES
          </Text>
          <Text style={s.footerThankYou}>THANK YOU FOR YOUR BUSINESS!</Text>
        </View>
      </Page>
    </Document>
  );
}
