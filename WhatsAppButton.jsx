const NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
const MSG = encodeURIComponent("Hi Wok Chushi! I'd like to book a table.");

export default function WhatsAppButton() {
  return (
    <a className="wa" href={`https://wa.me/${NUMBER}?text=${MSG}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      💬
    </a>
  );
}
