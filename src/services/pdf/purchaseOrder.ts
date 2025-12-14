
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CartItem } from '../../types/wholesale';

export const generatePurchaseOrderPDF = (cart: CartItem[], total: number, buyerName: string = "Buyer") => {
  const doc: any = new jsPDF();
  const date = new Date().toLocaleDateString();
  const poNumber = `PO-${Date.now().toString().slice(-6)}`;

  // Header
  doc.setFontSize(24);
  doc.setFont("times", "bold");
  doc.text("FASHION OS // PURCHASE ORDER", 20, 30);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`PO #: ${poNumber}`, 20, 45);
  doc.text(`DATE: ${date}`, 20, 50);
  doc.text(`BUYER: ${buyerName}`, 20, 55);
  doc.text(`TERMS: Net 60 (Subject to Approval)`, 20, 60);

  doc.text("VENDOR:", 140, 45);
  doc.text("FashionOS Studio", 140, 50);
  doc.text("London, UK", 140, 55);
  doc.text("wholesale@fashionos.co", 140, 60);

  // Table
  const tableData = cart.map(item => [
    item.sku,
    item.name,
    item.category,
    item.casePack.toString(),
    item.quantity.toString(),
    `$${item.wholesalePrice}`,
    `$${(item.wholesalePrice * item.quantity).toLocaleString()}`
  ]);

  doc.autoTable({
    startY: 70,
    head: [['SKU', 'ITEM', 'CATEGORY', 'CASE', 'QTY', 'UNIT PRICE', 'TOTAL']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [0, 0, 0] },
    styles: { fontSize: 9 }
  });

  // Totals
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`SUBTOTAL: $${total.toLocaleString()}`, 140, finalY);
  doc.text(`SHIPPING: TBD`, 140, finalY + 7);
  doc.setFontSize(14);
  doc.text(`EST. TOTAL: $${total.toLocaleString()}`, 140, finalY + 15);

  // Footer
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150);
  doc.text("This Purchase Order is subject to FashionOS Wholesale Terms & Conditions.", 20, 280);

  doc.save(`FashionOS_${poNumber}.pdf`);
};
