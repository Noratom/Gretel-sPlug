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
    if (m.shoulder) msg += `• Shoulder: ${m.shoulder}\n`;
    if (m.bustChest) msg += `• Bust / Chest: ${m.bustChest}\n`;
    if (m.nipToNip) msg += `• Nip-Nip: ${m.nipToNip}\n`;
    if (m.bustPoint) msg += `• Bust Point: ${m.bustPoint}\n`;
    if (m.underbust) msg += `• Underbust: ${m.underbust}\n`;
    if (m.halfCut) msg += `• Half-Cut: ${m.halfCut}\n`;
    if (m.waistNavel) msg += `• Waist / Navel: ${m.waistNavel}\n`;
    if (m.hip) msg += `• Hip: ${m.hip}\n`;
    if (m.thigh) msg += `• Thigh: ${m.thigh}\n`;
    if (m.totalHeight) msg += `• Height: ${m.totalHeight}\n`;
    if (m.totalLength) msg += `• Total Length: ${m.totalLength}\n`;
    if (m.sleeves) msg += `• Sleeves: ${m.sleeves}\n`;
    if (m.sleeveRoundCurve) msg += `• Sleeve Round Curve: ${m.sleeveRoundCurve}\n`;
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
    if (m.shoulder) msg += `• Shoulder: ${m.shoulder}\n`;
    if (m.bustChest) msg += `• Bust / Chest: ${m.bustChest}\n`;
    if (m.nipToNip) msg += `• Nip-Nip: ${m.nipToNip}\n`;
    if (m.bustPoint) msg += `• Bust Point: ${m.bustPoint}\n`;
    if (m.underbust) msg += `• Underbust: ${m.underbust}\n`;
    if (m.halfCut) msg += `• Half-Cut: ${m.halfCut}\n`;
    if (m.waistNavel) msg += `• Waist / Navel: ${m.waistNavel}\n`;
    if (m.hip) msg += `• Hip: ${m.hip}\n`;
    if (m.thigh) msg += `• Thigh: ${m.thigh}\n`;
    if (m.totalHeight) msg += `• Height: ${m.totalHeight}\n`;
    if (m.totalLength) msg += `• Total Length: ${m.totalLength}\n`;
    if (m.sleeves) msg += `• Sleeves: ${m.sleeves}\n`;
    if (m.sleeveRoundCurve) msg += `• Sleeve Round Curve: ${m.sleeveRoundCurve}\n`;
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
