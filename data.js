export const SITE = {
  name: 'Wok Chushi',
  tagline: 'The Chinese Food Chain',
  address: 'Wok Chushi, Main Road, Your City',
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  hours: ['Mon – Thu: 12:00 PM – 11:00 PM', 'Fri – Sun: 12:00 PM – 11:30 PM'],
};

export const NAV = [
  ['About', '#about'], ['Services', '#services'], ['Offers', '#offers'],
  ['Gallery', '#gallery'], ['FAQ', '#faq'], ['Contact', '#contact'],
];

export const STATS = [
  ['60+', 'Signature dishes'], ['10 min', 'Average serve time'], ['4.6★', 'Guest rating'],
];

export const SERVICES = [
  ['Dine-in', 'Comfortable seating for couples, families and groups.'],
  ['Takeaway & Order', 'Hot, sealed and ready when you arrive.'],
  ['Parties & Events', 'Birthdays, office lunches and celebrations for up to 50 guests.'],
];

// Fallback used if the API is unreachable
export const FALLBACK_OFFERS = [
  { id: 1, tag: 'Lunch', title: 'Weekday Lunch Combo', description: 'Soup, main and drink at a set price, Mon–Fri till 4 PM.' },
  { id: 2, tag: 'Groups', title: 'Family Feast', description: 'A sharing platter for four with starters, mains and dessert.' },
  { id: 3, tag: 'Happy hour', title: 'Dim Sum Hour', description: 'Selected dim sum baskets at special prices, 5–7 PM daily.' },
];

export const GALLERY = [
  ['/images/gallery-kungpao.jpg', 'Kung Pao chicken with red chillies and cashews in a black bowl'],
  ['/images/gallery-interior.jpg', 'Wok Chushi dining room with red lanterns and gold details'],
  ['/images/gallery-dimsum.jpg', 'Bamboo steamers of fresh dim sum with red chopsticks'],
];

export const FAQS = [
  ['Do I need to book in advance?', 'Walk-ins are welcome, but booking guarantees your table, especially on weekends and evenings.'],
  ['Do you have vegetarian options?', 'Yes — a wide range of vegetarian noodles, rice, dim sum and starters. Tell us about any dietary needs in the special requests box.'],
  ['Can I book for a large group?', 'We host groups of up to 50 guests. Choose your guest count in the form or message us on WhatsApp.'],
  ['How will I know my booking is confirmed?', 'We will contact you on the phone number you provide (and by email if given) to confirm your table.'],
];

export const TIME_SLOTS = ['12:30 PM', '1:30 PM', '2:30 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];
export const BRANCHES = ['Main Branch'];
