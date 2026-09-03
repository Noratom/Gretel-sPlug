import { BespokeOrderState, CustomDesignRequestState } from '../types/bespoke';

// Default WhatsApp Phone Number for Gretel's Plug / Air_Luxe
export const DEFAULT_WHATSAPP_NUMBER = '09161273360';

export function cleanPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = '234' + cleaned.slice(1);
  }
  return cleaned || '2349161273360';
}

export function formatWhatsAppMessage(order: BespokeOrderState): string {
  const { design, selectedFabric, sizeMode, standardSize, measurements, clientName, clientPhone, fittingDatePreference } = order;

  if (!design) return '';

  let msg = `✨ *CUSTOM OUTFIT ORDER - AIR_LUXE (GRETEL'S PLUG)* ✨\n\n`;

  msg += `📌 *OUTFIT DETAILS:*\n`;
  msg += `• *Name:* ${design.title}\n`;
  msg += `• *Category:* ${design.category}\n`;
  msg += `• *Price Range:* ${design.priceRange}\n`;
  msg += `• *Estimated Time:* ${design.craftingTime}\n`;

  if (selectedFabric) {
    msg += `• *Fabric Choice:* ${selectedFabric.name} (${selectedFabric.texture})\n`;
  }

  msg += `\n📐 *YOUR SIZING:* ${sizeMode === 'standard' ? `Standard Size [ ${standardSize} ]` : 'CUSTOM BODY MEASUREMENTS'}\n`;

  if (sizeMode === 'custom' && measurements) {
    const m = measurements;
    if (m.bust) msg += `• 1. Bust: ${m.bust}\n`;
    if (m.underBust) msg += `• 2. Under Bust: ${m.underBust}\n`;
    if (m.waist) msg += `• 3. Waist: ${m.waist}\n`;
    if (m.highHip) msg += `• 4. High Hip: ${m.highHip}\n`;
    if (m.hipFull) msg += `• 5. Hip (Full): ${m.hipFull}\n`;
    if (m.shoulderWidth) msg += `• 6. Shoulder Width: ${m.shoulderWidth}\n`;
    if (m.backWidth) msg += `• 7. Back Width: ${m.backWidth}\n`;
    if (m.frontLength) msg += `• 8. Front Length: ${m.frontLength}\n`;
    if (m.backLength) msg += `• 9. Back Length: ${m.backLength}\n`;
    if (m.sleeveLength) msg += `• 10. Sleeve Length: ${m.sleeveLength}\n`;
    if (m.armhole) msg += `• 11. Armhole: ${m.armhole}\n`;
    if (m.bicep) msg += `• 12. Bicep: ${m.bicep}\n`;
    if (m.wrist) msg += `• 13. Wrist: ${m.wrist}\n`;
    if (m.neck) msg += `• 14. Neck: ${m.neck}\n`;
    if (m.waistToHip) msg += `• 15. Waist to Hip: ${m.waistToHip}\n`;
    if (m.waistToKnee) msg += `• 16. Waist to Knee: ${m.waistToKnee}\n`;
    if (m.waistToAnkle) msg += `• 17. Waist to Ankle: ${m.waistToAnkle}\n`;
    if (m.crotchLength) msg += `• 18. Crotch Length: ${m.crotchLength}\n`;
    if (m.outseamLength) msg += `• 19. Outseam Length: ${m.outseamLength}\n`;
    if (m.inseamLength) msg += `• 20. Inseam Length: ${m.inseamLength}\n`;
  }

  if (measurements.additionalNotes) {
    msg += `\n📝 *Special Request / Notes:*\n"${measurements.additionalNotes}"\n`;
  }

  msg += `\n👤 *CUSTOMER INFO:*\n`;
  msg += `• Customer Name: ${clientName || 'Valued Customer'}\n`;
  if (clientPhone) msg += `• Phone: ${clientPhone}\n`;
  if (fittingDatePreference) msg += `• Needed By Date: ${fittingDatePreference}\n`;

  msg += `\nHello Air_Luxe team, I want to order this custom outfit. Please confirm fabric and fitting details!`;

  return encodeURIComponent(msg);
}

export function formatCustomDesignWhatsAppMessage(request: CustomDesignRequestState): string {
  let msg = `🎨 *MY OWN CUSTOM DESIGN REQUEST - AIR_LUXE (GRETEL'S PLUG)* 🎨\n\n`;
  msg += `Hello! I have a picture of an outfit design I want you to make for me.\n\n`;

  msg += `📌 *REQUEST DETAILS:*\n`;
  msg += `• *Outfit Description:* ${request.description || 'Custom Outfit Design'}\n`;
  if (request.fabricPreference) msg += `• *Fabric & Color Choice:* ${request.fabricPreference}\n`;
  if (request.budgetRange) msg += `• *Budget:* ${request.budgetRange}\n`;
  if (request.neededDate) msg += `• *Target Delivery Date:* ${request.neededDate}\n`;

  msg += `\n📐 *FIT & SIZING:* ${request.sizeMode === 'standard' ? `Standard Size [ ${request.standardSize} ]` : 'CUSTOM MEASUREMENTS'}\n`;

  if (request.sizeMode === 'custom' && request.measurements) {
    const m = request.measurements;
    if (m.bust) msg += `• 1. Bust: ${m.bust}\n`;
    if (m.underBust) msg += `• 2. Under Bust: ${m.underBust}\n`;
    if (m.waist) msg += `• 3. Waist: ${m.waist}\n`;
    if (m.highHip) msg += `• 4. High Hip: ${m.highHip}\n`;
    if (m.hipFull) msg += `• 5. Hip (Full): ${m.hipFull}\n`;
    if (m.shoulderWidth) msg += `• 6. Shoulder Width: ${m.shoulderWidth}\n`;
    if (m.backWidth) msg += `• 7. Back Width: ${m.backWidth}\n`;
    if (m.frontLength) msg += `• 8. Front Length: ${m.frontLength}\n`;
    if (m.backLength) msg += `• 9. Back Length: ${m.backLength}\n`;
    if (m.sleeveLength) msg += `• 10. Sleeve Length: ${m.sleeveLength}\n`;
    if (m.armhole) msg += `• 11. Armhole: ${m.armhole}\n`;
    if (m.bicep) msg += `• 12. Bicep: ${m.bicep}\n`;
    if (m.wrist) msg += `• 13. Wrist: ${m.wrist}\n`;
    if (m.neck) msg += `• 14. Neck: ${m.neck}\n`;
    if (m.waistToHip) msg += `• 15. Waist to Hip: ${m.waistToHip}\n`;
    if (m.waistToKnee) msg += `• 16. Waist to Knee: ${m.waistToKnee}\n`;
    if (m.waistToAnkle) msg += `• 17. Waist to Ankle: ${m.waistToAnkle}\n`;
    if (m.crotchLength) msg += `• 18. Crotch Length: ${m.crotchLength}\n`;
    if (m.outseamLength) msg += `• 19. Outseam Length: ${m.outseamLength}\n`;
    if (m.inseamLength) msg += `• 20. Inseam Length: ${m.inseamLength}\n`;
  }

  msg += `\n👤 *CUSTOMER INFO:*\n`;
  msg += `• Name: ${request.clientName || 'Valued Customer'}\n`;
  if (request.clientPhone) msg += `• Phone: ${request.clientPhone}\n`;

  msg += `\n*(I will attach/send my design photo right after this message on WhatsApp)*`;

  return encodeURIComponent(msg);
}

export function openWhatsAppOrder(order: BespokeOrderState, phoneNumber: string = DEFAULT_WHATSAPP_NUMBER) {
  const encodedText = formatWhatsAppMessage(order);
  const cleanPhone = cleanPhoneNumber(phoneNumber);
  const url = `https://wa.me/${cleanPhone}?text=${encodedText}`;
  window.open(url, '_blank');
}

export function openCustomDesignWhatsAppRequest(request: CustomDesignRequestState, phoneNumber: string = DEFAULT_WHATSAPP_NUMBER) {
  const encodedText = formatCustomDesignWhatsAppMessage(request);
  const cleanPhone = cleanPhoneNumber(phoneNumber);
  const url = `https://wa.me/${cleanPhone}?text=${encodedText}`;
  window.open(url, '_blank');
}

export function openWhatsAppGeneralInquiry(phoneNumber: string = DEFAULT_WHATSAPP_NUMBER, queryText?: string) {
  const defaultText = queryText 
    ? `Hello Air_Luxe (Gretel's Plug), I am inquiring about: ${queryText}`
    : `Hello Air_Luxe (Gretel's Plug), I would like to make a custom outfit order or ask about a design.`;
  const cleanPhone = cleanPhoneNumber(phoneNumber);
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultText)}`;
  window.open(url, '_blank');
}
