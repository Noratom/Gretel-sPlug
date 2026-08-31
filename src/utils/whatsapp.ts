import { BespokeOrderState } from '../types/bespoke';

// Default WhatsApp Phone Number for Air_Luxe (Gretel's Plug 2020)
export const DEFAULT_WHATSAPP_NUMBER = '2348000000000'; // User can replace or update in settings

export function formatWhatsAppMessage(order: BespokeOrderState): string {
  const { design, selectedFabric, sizeMode, standardSize, measurements, clientName, clientPhone, fittingDatePreference } = order;

  if (!design) return '';

  let msg = `✨ *BESPOKE OUTFIT CONSULTATION REQUEST* ✨\n`;
  msg += `*Brand:* Air_Luxe (Gretel's Plug 2020)\n\n`;

  msg += `📌 *DESIGN DETAILS:*\n`;
  msg += `• *Outfit:* ${design.title}\n`;
  msg += `• *Category:* ${design.category}\n`;
  msg += `• *Est. Price:* ${design.priceRange}\n`;
  msg += `• *Crafting Time:* ${design.craftingTime}\n`;

  if (selectedFabric) {
    msg += `• *Selected Fabric:* ${selectedFabric.name} (${selectedFabric.texture})\n`;
  }

  msg += `\n📐 *FIT & SIZING:* ${sizeMode === 'standard' ? `Standard Size [ ${standardSize} ]` : 'CUSTOM MEASUREMENTS'}\n`;

  if (sizeMode === 'custom') {
    msg += `• Bust/Chest: ${measurements.bustChest || 'N/A'}\n`;
    msg += `• Waist: ${measurements.waist || 'N/A'}\n`;
    msg += `• Hips: ${measurements.hips || 'N/A'}\n`;
    msg += `• Shoulder Width: ${measurements.shoulderWidth || 'N/A'}\n`;
    msg += `• Sleeve Length: ${measurements.sleeveLength || 'N/A'}\n`;
    msg += `• Total Height: ${measurements.totalHeight || 'N/A'}\n`;
    msg += `• Outfit Length: ${measurements.desiredOutfitLength || 'N/A'}\n`;
  }

  if (measurements.additionalNotes) {
    msg += `\n📝 *Customization Request / Notes:*\n"${measurements.additionalNotes}"\n`;
  }

  msg += `\n👤 *CLIENT CONSULTATION INFO:*\n`;
  msg += `• Name: ${clientName || 'Valued Client'}\n`;
  if (clientPhone) msg += `• Phone: ${clientPhone}\n`;
  if (fittingDatePreference) msg += `• Preferred Fitting/Delivery Target: ${fittingDatePreference}\n`;

  msg += `\nHello Air_Luxe team, I would like to initiate custom tailoring for this bespoke outfit. Please confirm fabric availability and consultation booking!`;

  return encodeURIComponent(msg);
}

export function openWhatsAppOrder(order: BespokeOrderState, phoneNumber: string = DEFAULT_WHATSAPP_NUMBER) {
  const encodedText = formatWhatsAppMessage(order);
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${encodedText}`;
  window.open(url, '_blank');
}

export function openWhatsAppGeneralInquiry(phoneNumber: string = DEFAULT_WHATSAPP_NUMBER, queryText?: string) {
  const defaultText = queryText 
    ? `Hello Air_Luxe (Gretel's Plug), I am inquiring about: ${queryText}`
    : `Hello Air_Luxe (Gretel's Plug 2020), I would like to schedule a custom outfit fitting & design consultation.`;
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultText)}`;
  window.open(url, '_blank');
}
