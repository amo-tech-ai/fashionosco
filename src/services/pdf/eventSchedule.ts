
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { TimelineItem } from '../../types/event-tools';

export const generateEventSchedulePDF = (timeline: TimelineItem[], eventTitle: string, eventDate: string) => {
  const doc: any = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;

  // --- Header ---
  doc.setFontSize(24);
  doc.setFont("times", "bold");
  doc.text("FASHION OS // PRODUCTION SCHEDULE", margin, 30);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(`EVENT: ${eventTitle.toUpperCase()}`, margin, 40);
  doc.text(`DATE: ${eventDate}`, margin, 45);
  doc.text(`VERSION: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, margin, 50);

  doc.text("PRODUCER: FashionOS Event Team", pageWidth - margin - 60, 40);
  doc.text("CONTACT: production@fashionos.co", pageWidth - margin - 60, 45);

  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(margin, 55, pageWidth - margin, 55);

  // --- Timeline Table ---
  const tableData = timeline.map((item, index) => [
    item.time,
    item.duration,
    item.title.toUpperCase(),
    item.category.toUpperCase(),
    item.description
  ]);

  doc.autoTable({
    startY: 65,
    head: [['TIME', 'DUR', 'SEGMENT', 'DEPT', 'DESCRIPTION']],
    body: tableData,
    theme: 'grid',
    headStyles: { 
      fillColor: [0, 0, 0], 
      textColor: 255, 
      fontStyle: 'bold',
      fontSize: 9 
    },
    styles: { 
      fontSize: 8, 
      cellPadding: 4,
      valign: 'middle'
    },
    columnStyles: {
      0: { cellWidth: 20, fontStyle: 'bold' },
      1: { cellWidth: 15 },
      2: { cellWidth: 40, fontStyle: 'bold' },
      3: { cellWidth: 25 },
      4: { cellWidth: 'auto' }
    },
    didParseCell: function(data: any) {
      if (data.section === 'body' && data.column.index === 3) {
        const cat = data.cell.raw.toLowerCase();
        if (cat === 'runway') data.cell.styles.textColor = [168, 85, 247];
        if (cat === 'hospitality') data.cell.styles.textColor = [249, 115, 22];
        if (cat === 'media') data.cell.styles.textColor = [59, 130, 246];
      }
    }
  });

  // --- Footer ---
  const pageCount = doc.internal.getNumberOfPages();
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`CONFIDENTIAL - FASHIONOS PRODUCTION - PAGE ${i} OF ${pageCount}`, pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });
  }

  doc.save(`Production_Schedule_${eventTitle.replace(/ /g, '_')}.pdf`);
};
