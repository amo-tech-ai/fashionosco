
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { fileToBase64 } from '../../utils/fileHelpers';

// Helper to normalize data structure whether coming from Wizard or Dashboard
const normalizeData = (input: any) => {
    // If it's a Campaign object from dashboard, the wizard state is in `data`
    if (input.data && input.title) {
        return { ...input.data, ...input }; 
    }
    return input; // It's likely direct wizard state
};

export const generateCallSheetPDF = async (rawData: any) => { 
  const state = normalizeData(rawData);
  const doc: any = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;

  // --- Header ---
  doc.setFontSize(24);
  doc.setFont("times", "bold");
  doc.text("FASHION OS // CALL SHEET", margin, 30);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  
  const title = state.title || (state.shootType ? `${state.shootType.toUpperCase()} SHOOT` : 'PRODUCTION');
  const dateStr = state.date ? new Date(state.date).toLocaleDateString() : 'Date TBD';
  const locationStr = state.location === 'studio' ? 'FashionOS Studios, London' : (state.location || 'On Location');

  doc.text(`CAMPAIGN: ${title}`, margin, 40);
  doc.text(`DATE: ${dateStr}`, margin, 45);
  doc.text(`LOCATION: ${locationStr}`, margin, 50);

  // --- Right Header (Team Placeholder) ---
  const rightCol = pageWidth - margin - 60;
  doc.text("PRODUCER: FashionOS Studio", rightCol, 40);
  doc.text("PHOTOGRAPHER: TBD", rightCol, 45);
  doc.text(`CALL TIME: ${state.timeSlot || '09:00 AM'}`, rightCol, 50);

  // --- Creative Vision Section ---
  let yPos = 65;
  
  doc.setDrawColor(200);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  doc.setFontSize(12);
  doc.setFont("times", "bold");
  doc.setTextColor(0);
  doc.text("CREATIVE DIRECTION", margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const vibeText = `Vibe: ${state.vibe || 'Not specified'} | Tone: ${state.aiAnalysis?.keywords?.slice(0,4).join(', ') || 'N/A'}`;
  doc.text(vibeText, margin, yPos);
  yPos += 6;

  // Suggestion text wrapped
  if (state.aiAnalysis?.suggestion) {
    const splitTitle = doc.splitTextToSize(`Notes: ${state.aiAnalysis.suggestion}`, pageWidth - (margin * 2));
    doc.text(splitTitle, margin, yPos);
    yPos += (splitTitle.length * 5) + 5;
  }

  // --- Moodboard Images ---
  if (state.moodBoardImages && state.moodBoardImages.length > 0) {
     yPos += 5;
     doc.setFontSize(10);
     doc.setFont("helvetica", "bold");
     doc.text("Moodboard:", margin, yPos);
     yPos += 5;

     const imageSize = 35;
     const gap = 5;
     let xPos = margin;

     // Process first 4 images
     const imagesToProcess = state.moodBoardImages.slice(0, 4);
     
     for (const item of imagesToProcess) {
       let base64 = "";
       try {
         if (item instanceof File) {
            base64 = await fileToBase64(item);
         } else if (typeof item === 'string') {
            // Check if it's a URL or base64
            if (item.startsWith('http')) {
                // Wrap fetch in try/catch to avoid CORS crash
                try {
                    const resp = await fetch(item);
                    if (!resp.ok) throw new Error('Network error');
                    const blob = await resp.blob();
                    base64 = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.readAsDataURL(blob);
                    });
                } catch (err) {
                    console.warn("Could not fetch remote image for PDF (CORS likely):", item);
                    // No base64, skips drawing
                }
            } else {
                base64 = item;
            }
         }

         if (base64) {
            // Determine type (Default to JPEG for simplicity if base64 header missing)
            const type = base64.includes('png') ? 'PNG' : 'JPEG';
            doc.addImage(base64, type, xPos, yPos, imageSize, imageSize, undefined, 'FAST');
            xPos += imageSize + gap;
         }
       } catch (e) {
         console.warn("Skipping invalid image in PDF gen", e);
       }
     }
     yPos += imageSize + 10;
  }

  // --- Color Palette ---
  if (state.aiAnalysis?.colors && state.aiAnalysis.colors.length > 0) {
    // If we didn't have images, add extra space
    if (!state.moodBoardImages || state.moodBoardImages.length === 0) yPos += 5;
    
    doc.setFont("helvetica", "bold");
    doc.text("Palette:", margin, yPos + 4);
    let xPos = margin + 20;
    state.aiAnalysis.colors.slice(0, 6).forEach((color: string) => {
      doc.setFillColor(color);
      doc.rect(xPos, yPos, 10, 10, 'F');
      doc.setDrawColor(220); // Border for light colors
      doc.rect(xPos, yPos, 10, 10, 'S');
      xPos += 15;
    });
    yPos += 15;
  }

  // --- Shot List Table ---
  if (state.shotList && state.shotList.length > 0) {
      yPos += 10;
      doc.setFontSize(12);
      doc.setFont("times", "bold");
      doc.setTextColor(0);
      doc.text("SHOT LIST", margin, yPos);
      yPos += 5;

      const tableData = state.shotList.map((shot: any, index: number) => [
        (index + 1).toString(),
        shot.priority?.toUpperCase() || '-',
        shot.name,
        shot.description,
        shot.props || '-',
        shot.angle || '-'
      ]);

      doc.autoTable({
        startY: yPos,
        head: [['#', 'PRIORITY', 'SHOT NAME', 'DESCRIPTION', 'PROPS', 'ANGLE']],
        body: tableData,
        theme: 'grid',
        headStyles: { 
          fillColor: [26, 26, 26], 
          textColor: 255, 
          fontStyle: 'bold',
          fontSize: 8 
        },
        styles: { 
          fontSize: 8, 
          cellPadding: 3, 
          overflow: 'linebreak' 
        },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 20 },
          2: { cellWidth: 35, fontStyle: 'bold' },
          3: { cellWidth: 'auto' }, 
          4: { cellWidth: 30 },
          5: { cellWidth: 25 }
        }
      });
  }

  // --- Footer ---
  const pageCount = doc.internal.getNumberOfPages();
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount} | Generated by FashionOS AI`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }

  // Save
  doc.save(`FashionOS_CallSheet_${title.replace(/ /g, '_')}.pdf`);
};
