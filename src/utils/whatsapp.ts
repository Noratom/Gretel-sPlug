import { BespokeOrderState, CustomDesignRequestState } from '../types/bespoke';

// Default WhatsApp Phone Number for Gretel's Plug
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

  let msg = `✨ *CUSTOM OUTFIT ORDER - GRETEL'S PLUG* ✨\n\n`;

  msg += `📌 *OUTFIT DETAILS:*\n`;
  msg += `• *Name:* ${design.title}\n`;
  msg += `• *Category:* ${design.category}\n`;
  msg += `• *Price Range:* ${design.priceRange}\n`;
  msg += `• *Estimated Time:* ${design.craftingTime}\n`;

  if (selectedFabric) {
    msg += `• *Fabric Choice:* ${selectedFabric.name} (${selectedFabric.texture})\n`;
  }

  msg += `\n📐 *YOUR SIZING:* ${sizeMode === 'standard' ? `Standard Size [ ${standardSize} ]` : 'CUSTOM BODY MEASUREMENTS'}\n`;

  if (sizeMode === 'custom') {
    if (measurements.bustChest) msg += `• Bust / Chest: ${measurements.bustChest}\n`;
    if (measurements.waist) msg += `• Waist: ${measurements.waist}\n`;
    if (measurements.hips) msg += `• Hips: ${measurements.hips}\n`;
    if (measurements.shoulderWidth) msg += `• Shoulder Width: ${measurements.shoulderWidth}\n`;
    if (measurements.sleeveLength) msg += `• Sleeve Length: ${measurements.sleeveLength}\n`;
    if (measurements.totalHeight) msg += `• Height: ${measurements.totalHeight}\n`;
    if (measurements.desiredOutfitLength) msg += `• Outfit Length / Heels: ${measurements.desiredOutfitLength}\n`;
  }

  if (measurements.additionalNotes) {
    msg += `\n📝 *Special Request / Notes:*\n"${measurements.additionalNotes}"\n`;
  }

  msg += `\n👤 *CUSTOMER INFO:*\n`;
  msg += `• Customer Name: ${clientName || 'Valued Customer'}\n`;
  if (clientPhone) msg += `• Phone: ${clientPhone}\n`;
  if (fittingDatePreference) msg += `• Needed By Date: ${fittingDatePreference}\n`;

  msg += `\nHello Gretel's Plug, I want to order this custom outfit. Please confirm fabric and fitting details!`;

  return encodeURIComponent(msg);
}

export function formatCustomDesignWhatsAppMessage(request: CustomDesignRequestState): string {
  let msg = `🎨 *MY OWN CUSTOM DESIGN REQUEST - GRETEL'S PLUG* 🎨\n\n`;
  msg += `Hello Gretel's Plug! I have a picture of an outfit design I want you to make for me.\n\n`;

  msg += `📌 *REQUEST DETAILS:*\n`;
  msg += `• *Outfit Description:* ${request.description || 'Custom Outfit Design'}\n`;
  if (request.fabricPreference) msg += `• *Fabric & Color Choice:* ${request.fabricPreference}\n`;
  if (request.budgetRange) msg += `• *Budget:* ${request.budgetRange}\n`;
  if (request.neededDate) msg += `• *Target Delivery Date:* ${request.neededDate}\n`;

  msg += `\n📐 *FIT & SIZING:* ${request.sizeMode === 'standard' ? `Standard Size [ ${request.standardSize} ]` : 'CUSTOM MEASUREMENTS'}\n`;

  if (request.sizeMode === 'custom' && request.measurements) {
    const m = request.measurements;
    if (m.bustChest) msg += `• Bust / Chest: ${m.bustChest}\n`;
    if (m.waist) msg += `• Waist: ${m.waist}\n`;
    if (m.hips) msg += `• Hips: ${m.hips}\n`;
    if (m.totalHeight) msg += `• Height: ${m.totalHeight}\n`;
    if (m.desiredOutfitLength) msg += `• Outfit Length: ${m.desiredOutfitLength}\n`;
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
    ? `Hello Gretel's Plug, I am inquiring about: ${queryText}`
    : `Hello Gretel's Plug, I would like to make a custom outfit order or ask about a design.`;
  const cleanPhone = cleanPhoneNumber(phoneNumber);
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultText)}`;
  window.open(url, '_blank');
}
