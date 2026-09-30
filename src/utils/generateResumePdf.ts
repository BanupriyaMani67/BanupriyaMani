import { jsPDF } from 'jspdf';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export function generateResumePdf(): void {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'letter',
  });

  const p = PORTFOLIO_DATA.personal;
  const margin = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;
  let y = 45;

  // Header: Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(20, 24, 38);
  doc.text(p.name.toUpperCase(), pageWidth / 2, y, { align: 'center' });
  y += 18;

  // Subtitle / Contact Info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(70, 75, 90);
  const contactLine = `${p.email}  |  ${p.linkedinDisplay}  |  ${p.githubDisplay}`;
  doc.text(contactLine, pageWidth / 2, y, { align: 'center' });
  y += 14;

  const locLine = p.location;
  doc.text(locLine, pageWidth / 2, y, { align: 'center' });
  y += 18;

  // Helper for Section Dividers
  const drawSectionHeader = (title: string) => {
    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(25, 30, 45);
    doc.text(title.toUpperCase(), margin, y);
    y += 4;
    doc.setDrawColor(200, 205, 220);
    doc.setLineWidth(0.75);
    doc.line(margin, y, pageWidth - margin, y);
    y += 14;
  };

  // PROFESSIONAL SUMMARY
  drawSectionHeader('PROFESSIONAL SUMMARY');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(50, 55, 70);
  const summaryLines = doc.splitTextToSize(p.summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 12 + 6;

  // TECHNICAL SKILLS
  drawSectionHeader('TECHNICAL SKILLS');
  doc.setFontSize(9.5);
  const skillsCategories = [
    { label: 'Programming Languages', items: 'Java, Python, SQL, JavaScript' },
    { label: 'Frontend', items: 'HTML5, CSS3, React.js, Next.js, TypeScript' },
    { label: 'Backend', items: 'Spring Boot, FastAPI, Flask, REST APIs' },
    { label: 'Databases', items: 'MySQL, PostgreSQL, MongoDB, SQLite, Firebase (NoSQL), Redis' },
    { label: 'Cloud & Tools', items: 'AWS, Git, GitHub, Docker, Postman, VS Code, Buildozer' },
    { label: 'AI & Data', items: 'Generative AI, Prompt Engineering, Machine Learning, Data Analytics, TensorFlow, Scikit-learn, NLP, Pandas, NumPy' },
  ];

  skillsCategories.forEach((sc) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 35, 50);
    doc.text(`${sc.label}: `, margin, y);
    const labelWidth = doc.getTextWidth(`${sc.label}: `);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 65, 80);
    const textLines = doc.splitTextToSize(sc.items, contentWidth - labelWidth);
    doc.text(textLines, margin + labelWidth, y);
    y += textLines.length * 11 + 2;
  });

  // PROJECTS
  drawSectionHeader('PROJECTS');
  PORTFOLIO_DATA.projects.forEach((proj) => {
    // Project title & GitHub link
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(20, 25, 40);
    doc.text(proj.title, margin, y);

    const titleWidth = doc.getTextWidth(proj.title);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 80, 180);
    doc.text(` | ${proj.githubUrl.replace('https://', '')}`, margin + titleWidth, y);
    y += 12;

    // Tech Stack
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(40, 45, 60);
    doc.text('Tech Stack: ', margin, y);
    const tsWidth = doc.getTextWidth('Tech Stack: ');

    doc.setFont('helvetica', 'italic');
    doc.setTextColor(70, 75, 90);
    doc.text(proj.techStack.join(', '), margin + tsWidth, y);
    y += 12;

    // Bullets
    proj.keyHighlights.forEach((highlight) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(50, 55, 70);
      const bulletPrefix = '• ';
      const bulletLines = doc.splitTextToSize(highlight, contentWidth - 14);
      doc.text(bulletPrefix, margin + 4, y);
      doc.text(bulletLines, margin + 14, y);
      y += bulletLines.length * 11 + 3;
    });
    y += 5;
  });

  // EDUCATION
  drawSectionHeader('EDUCATION');
  const edu = PORTFOLIO_DATA.education;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(20, 25, 40);
  doc.text(`${edu.degree} – ${edu.specialization}`, margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 65, 80);
  doc.text(edu.timeline, pageWidth - margin, y, { align: 'right' });
  y += 12;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 45, 60);
  doc.text(`${edu.institution}, ${edu.location}  |  CGPA: ${edu.cgpa} / ${edu.scale}`, margin, y);
  y += 14;

  // CERTIFICATIONS
  drawSectionHeader('CERTIFICATIONS');
  PORTFOLIO_DATA.certifications.forEach((cert) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(50, 55, 70);
    doc.text('•', margin + 4, y);
    
    doc.setFont('helvetica', 'bold');
    doc.text(`${cert.title}`, margin + 14, y);
    const titleW = doc.getTextWidth(`${cert.title}`);

    doc.setFont('helvetica', 'normal');
    doc.text(` — ${cert.issuer}, ${cert.year}`, margin + 14 + titleW, y);
    y += 12;
  });
  y += 4;

  // AREAS OF INTEREST
  drawSectionHeader('AREAS OF INTEREST');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(50, 55, 70);
  doc.text(PORTFOLIO_DATA.personal.areasOfInterest.join('  •  '), margin, y);

  // Save the PDF
  doc.save('Banupriya_Mani_Resume.pdf');
}
