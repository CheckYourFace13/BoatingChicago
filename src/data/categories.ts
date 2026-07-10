import type { CategoryPage } from "@/types";

const sharedFaqs = {
  booking: {
    question: "How far in advance should I book a boat in Chicago?",
    answer:
      "For peak summer weekends, holidays, and events like Navy Pier fireworks or the Air & Water Show, book 2–4 weeks ahead. Weekday and shoulder-season trips often have more last-minute availability.",
  },
  captain: {
    question: "Do I need a captain for my Chicago boat rental?",
    answer:
      "Most large party boats and yacht charters include a licensed captain. For smaller rentals, you may need a boating license or hire a captain separately. Always confirm with the provider before booking.",
  },
  weather: {
    question: "What happens if the weather is bad on my booking day?",
    answer:
      "Chicago weather on Lake Michigan can change quickly. Most operators offer rescheduling or refunds for unsafe conditions. Review each provider's weather policy before you pay.",
  },
};

export const categories: CategoryPage[] = [
  {
    slug: "boat-rentals-chicago",
    title: "Boat Rentals Chicago",
    seoTitle: "Boat Rentals Chicago | Lake Michigan Boat Rental Guide 2026",
    seoDescription:
      "Compare the best boat rentals in Chicago on Lake Michigan. Pontoons, speedboats, sailboats & more. Book through trusted partners or get matched with local operators.",
    headline: "Boat Rentals in Chicago on Lake Michigan",
    intro:
      "Chicago's lakefront is built for boating — from Monroe Harbor to Burnham and beyond. Whether you want a pontoon for a lazy Playpen afternoon or a speedboat to cruise the skyline, Boating Chicago connects you with the best rental options on Lake Michigan. Compare affiliate partners, browse local vendors, or tell us what you need and we'll match you fast.",
    bestFor: [
      { title: "First-time renters", description: "Easy captained options with no license required", icon: "🚤" },
      { title: "Playpen days", description: "Pontoons and party-friendly boats for anchoring out", icon: "⚓" },
      { title: "Skyline cruises", description: "Sunset runs past Navy Pier and the Chicago skyline", icon: "🌆" },
      { title: "Small groups", description: "Boats for 2–12 people at every budget level", icon: "👥" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["party-boat-rentals-chicago", "yacht-rentals-chicago", "captains-for-hire-chicago", "chicago-playpen-boat-rentals"],
    faqs: [
      sharedFaqs.booking,
      { question: "Where do Chicago boat rentals depart from?", answer: "Most rentals leave from Monroe Harbor, Burnham Harbor, 31st Street Harbor, Montrose Harbor, and DuSable Harbor. Your booking confirmation will include the exact marina and slip details." },
      sharedFaqs.captain,
      { question: "How much does a boat rental cost in Chicago?", answer: "Expect $200–$800+ for half-day pontoon or speedboat rentals, and $800–$3,000+ for larger party boats. Prices vary by season, boat size, and whether a captain is included." },
      sharedFaqs.weather,
    ],
    vendors: ["sample-chicago-party-boat-partner"],
  },
  {
    slug: "yacht-rentals-chicago",
    title: "Yacht Rentals Chicago",
    seoTitle: "Yacht Rentals Chicago | Luxury Lake Michigan Yacht Charters",
    seoDescription:
      "Rent a yacht in Chicago for birthdays, corporate events, and luxury Lake Michigan cruises. Compare yacht charters, pricing, and book through trusted partners.",
    headline: "Luxury Yacht Rentals & Charters in Chicago",
    intro:
      "Nothing beats a Chicago summer on a yacht — champagne on the deck, the skyline rolling by, and Lake Michigan stretching to the horizon. From intimate sunset sails to full-deck corporate events, yacht charters are the ultimate Chicago boating experience. We help you find the right vessel, crew, and price point without the endless searching.",
    bestFor: [
      { title: "Luxury celebrations", description: "Birthdays, anniversaries, and milestone moments", icon: "🥂" },
      { title: "Corporate entertaining", description: "Impress clients with a private yacht experience", icon: "💼" },
      { title: "Sunset cruises", description: "Golden-hour skyline views from the water", icon: "🌅" },
      { title: "Large groups", description: "Yachts accommodating 20–100+ guests", icon: "🛥️" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["corporate-yacht-charters-chicago", "birthday-boat-rentals-chicago", "boat-rentals-chicago"],
    faqs: [
      sharedFaqs.booking,
      { question: "What's included in a Chicago yacht charter?", answer: "Most charters include the vessel, captain, and crew. Catering, bar packages, decorations, and entertainment are often add-ons. Confirm inclusions before booking." },
      { question: "How much does a yacht rental cost in Chicago?", answer: "Chicago yacht charters typically range from $1,200 for a small yacht (2–4 hours) to $5,000+ for luxury vessels and full-day events. Peak summer weekends command premium pricing." },
      sharedFaqs.captain,
      sharedFaqs.weather,
    ],
    vendors: ["sample-chicago-yacht-partner"],
  },
  {
    slug: "party-boat-rentals-chicago",
    title: "Party Boat Rentals Chicago",
    seoTitle: "Party Boat Rentals Chicago | Lake Michigan Party Boats",
    seoDescription:
      "Rent a party boat in Chicago for groups of 10–50+. Playpen trips, skyline cruises, BYOB options & captains included. Book your Chicago party boat today.",
    headline: "Party Boat Rentals on Lake Michigan",
    intro:
      "Chicago party boats are a summer institution — loud music, cold drinks, sunshine, and the best skyline views in the Midwest. Whether you're planning a casual Playpen hang or a full-blown celebration, party boats come with captains, space for your crew, and the kind of memories that last all winter. Let's find your boat.",
    bestFor: [
      { title: "Big groups", description: "Boats for 15–50+ with room to dance and lounge", icon: "🎉" },
      { title: "Playpen trips", description: "Anchor out with hundreds of other boats on summer weekends", icon: "🏖️" },
      { title: "BYOB celebrations", description: "Bring your own beverages on most party boat rentals", icon: "🍻" },
      { title: "Skyline party cruises", description: "Cruise past Navy Pier and the Loop with your crew", icon: "🌃" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["bachelorette-boat-rentals-chicago", "birthday-boat-rentals-chicago", "chicago-playpen-boat-rentals"],
    faqs: [
      sharedFaqs.booking,
      { question: "Can I bring my own alcohol on a Chicago party boat?", answer: "Most party boat operators allow BYOB. Some offer bar packages instead. Glass bottles are often prohibited — check with your operator and bring cans or plastic." },
      { question: "How many people fit on a party boat?", answer: "Chicago party boats typically accommodate 15–50+ guests depending on the vessel. Always book for your actual headcount — overcrowding violates USCG regulations." },
      { question: "What is the Chicago Playpen?", answer: "The Playpen is a popular anchorage area off Chicago's lakefront near Oak Street Beach where hundreds of boats gather on summer weekends. It's the epicenter of Chicago party boating culture." },
      sharedFaqs.weather,
    ],
    vendors: ["sample-chicago-party-boat-partner"],
    seasonalPromos: ["bachelorette", "memorial-day", "labor-day"],
  },
  {
    slug: "bachelorette-boat-rentals-chicago",
    title: "Bachelorette Boat Rentals Chicago",
    seoTitle: "Bachelorette Boat Rentals Chicago | Party Boat Bachelorette Ideas",
    seoDescription:
      "Plan the ultimate Chicago bachelorette party on a boat! Party boats, yacht charters & Playpen trips for your squad. Book your bachelorette boat rental today.",
    headline: "Bachelorette Party Boat Rentals in Chicago",
    intro:
      "A Chicago bachelorette party on Lake Michigan is the move — sunshine, skyline views, your best friends, and a captain who handles the driving while you handle the celebrating. From decorated party boats to upscale yacht charters, we'll help you find the perfect vessel for the bride's last ride before the tide turns.",
    bestFor: [
      { title: "Squad goals", description: "Boats sized for groups of 8–30+ bachelorette parties", icon: "💍" },
      { title: "Instagram-worthy", description: "Skyline backdrops and deck space for group photos", icon: "📸" },
      { title: "BYOB friendly", description: "Bring champagne, coolers, and decorations", icon: "🥳" },
      { title: "Stress-free", description: "Captain included — just show up and celebrate", icon: "✨" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["party-boat-rentals-chicago", "birthday-boat-rentals-chicago", "yacht-rentals-chicago"],
    faqs: [
      { question: "When should I book a bachelorette boat in Chicago?", answer: "Book 3–6 weeks ahead for summer weekends, especially June through August. Holiday weekends and Air & Water Show dates fill up months in advance." },
      { question: "Can we decorate the boat for the bachelorette party?", answer: "Most operators allow banners, balloons, and themed decorations. Confirm what's permitted and whether they provide setup assistance." },
      { question: "What's the best bachelorette boat size?", answer: "For groups of 8–15, a 30–40 ft party boat works great. Groups of 15–30+ should look at larger vessels with more deck space and a sound system." },
      sharedFaqs.weather,
    ],
    vendors: ["sample-chicago-party-boat-partner"],
    seasonalPromos: ["bachelorette"],
  },
  {
    slug: "birthday-boat-rentals-chicago",
    title: "Birthday Boat Rentals Chicago",
    seoTitle: "Birthday Boat Rentals Chicago | Lake Michigan Birthday Parties",
    seoDescription:
      "Celebrate your birthday on a boat in Chicago! Party boats, yacht charters & Lake Michigan cruises for unforgettable birthday parties. Book today.",
    headline: "Birthday Party Boat Rentals in Chicago",
    intro:
      "Forget the restaurant reservation — celebrate your birthday on Lake Michigan with the Chicago skyline as your backdrop. Birthday boat rentals range from casual pontoon parties to full yacht experiences with catering. Tell us your group size and vibe, and we'll connect you with the perfect birthday boat.",
    bestFor: [
      { title: "Milestone birthdays", description: "30th, 40th, 50th — celebrate big on the water", icon: "🎂" },
      { title: "Mixed-age groups", description: "Boats comfortable for kids, parents, and grandparents", icon: "👨‍👩‍👧‍👦" },
      { title: "Surprise parties", description: "Coordinate dock-side surprises with your captain", icon: "🎁" },
      { title: "Night cruises", description: "Evening skyline views for a magical birthday", icon: "🌙" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["party-boat-rentals-chicago", "yacht-rentals-chicago", "bachelorette-boat-rentals-chicago"],
    faqs: [
      { question: "Can I bring a birthday cake on the boat?", answer: "Yes — most operators allow cakes and food. Some yacht charters offer catering packages. Bring serving supplies and confirm refrigeration if needed." },
      { question: "How long should a birthday boat rental be?", answer: "Half-day (3–4 hours) is perfect for most birthday parties. Full-day rentals work for larger groups wanting Playpen time plus a skyline cruise." },
      sharedFaqs.booking,
      sharedFaqs.weather,
    ],
    vendors: ["sample-chicago-party-boat-partner", "sample-chicago-yacht-partner"],
  },
  {
    slug: "corporate-yacht-charters-chicago",
    title: "Corporate Yacht Charters Chicago",
    seoTitle: "Corporate Yacht Charters Chicago | Team Events on Lake Michigan",
    seoDescription:
      "Book a corporate yacht charter in Chicago for client entertainment, team building & company events on Lake Michigan. Professional crews & custom packages.",
    headline: "Corporate Yacht Charters on Lake Michigan",
    intro:
      "Close the deal or reward your team with a corporate yacht charter on Lake Michigan. Chicago's skyline from the water is an unforgettable setting for client entertainment, team outings, product launches, and company celebrations. We connect businesses with professional charter operators who understand corporate needs — invoicing, catering, AV, and flawless execution.",
    bestFor: [
      { title: "Client entertainment", description: "Impress prospects and partners with a premium experience", icon: "🤝" },
      { title: "Team building", description: "Get the team out of the office and onto the lake", icon: "🏆" },
      { title: "Company celebrations", description: "Holiday parties, milestone events, and summer outings", icon: "🎊" },
      { title: "Brand events", description: "Product launches and media events on the water", icon: "📣" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["yacht-rentals-chicago", "party-boat-rentals-chicago"],
    faqs: [
      { question: "Do corporate yacht charters include catering?", answer: "Most charter companies offer catering packages from light appetizers to full plated dinners. Bar packages and branded materials can often be arranged." },
      { question: "Can we get an invoice for corporate billing?", answer: "Yes — established charter operators routinely provide invoices, W-9s, and corporate billing. Mention this when requesting a quote." },
      { question: "What's the ideal group size for a corporate charter?", answer: "Chicago corporate charters work well for groups of 10–100+. Larger events may require multiple vessels or the biggest yachts in the fleet." },
      sharedFaqs.booking,
    ],
    vendors: ["sample-chicago-yacht-partner"],
    seasonalPromos: ["corporate"],
  },
  {
    slug: "chicago-playpen-boat-rentals",
    title: "Chicago Playpen Boat Rentals",
    seoTitle: "Chicago Playpen Boat Rentals | Playpen Party Boat Guide",
    seoDescription:
      "Rent a boat for the Chicago Playpen — the ultimate Lake Michigan anchorage party. Party boats, pontoons & captains for Playpen weekends. Book early!",
    headline: "Chicago Playpen Boat Rentals",
    intro:
      "The Chicago Playpen is where summer lives — hundreds of boats anchored off Oak Street Beach, music in the air, and the skyline glowing at sunset. If you're planning a Playpen day, you need the right boat, a good captain, and an early reservation. Boating Chicago is your guide to Playpen-ready rentals and the operators who know the scene.",
    bestFor: [
      { title: "Playpen weekends", description: "Boats ideal for anchoring in the Playpen crowd", icon: "⚓" },
      { title: "All-day hangs", description: "Full-day rentals for maximum Playpen time", icon: "☀️" },
      { title: "First-timers", description: "Captains who know Playpen rules and best spots", icon: "🗺️" },
      { title: "Group parties", description: "Party boats with space, sound, and shade", icon: "🎵" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["party-boat-rentals-chicago", "boat-rentals-chicago"],
    faqs: [
      { question: "What is the Chicago Playpen?", answer: "The Playpen is a designated anchorage area on Lake Michigan near Oak Street Beach. On summer weekends, it's packed with boats — think floating block party with swimming, music, and skyline views." },
      { question: "When is the Playpen busiest?", answer: "Memorial Day through Labor Day weekends are peak Playpen season. Saturdays and holiday weekends see the biggest crowds. Arrive early for the best anchorage spots." },
      { question: "Do I need a special boat for the Playpen?", answer: "Any boat with anchoring capability works, but party boats and pontoons are most popular. A captain familiar with Playpen etiquette is highly recommended for first-timers." },
      sharedFaqs.weather,
    ],
    vendors: ["sample-chicago-party-boat-partner"],
    seasonalPromos: ["memorial-day", "labor-day"],
  },
  {
    slug: "navy-pier-fireworks-boat-rentals",
    title: "Navy Pier Fireworks Boat Rentals",
    seoTitle: "Navy Pier Fireworks Boat Rentals | Watch Fireworks from a Boat",
    seoDescription:
      "Watch Navy Pier fireworks from a boat on Lake Michigan! The best views, no crowds. Book your Chicago fireworks boat rental for summer Wednesday & Saturday shows.",
    headline: "Navy Pier Fireworks Boat Rentals",
    intro:
      "Watching Navy Pier fireworks from a boat is one of Chicago's great summer experiences — the bursts reflect off the lake, the skyline glows, and you're nowhere near the pier crowds. Fireworks boat rentals sell out fast for summer Wednesday and Saturday shows, so plan ahead. We'll help you find available boats and captains who position you for the best view.",
    bestFor: [
      { title: "Best views", description: "Unobstructed fireworks over the lake and skyline", icon: "🎆" },
      { title: "Date nights", description: "Romantic evening cruises with fireworks finale", icon: "💕" },
      { title: "Group outings", description: "Share the experience with friends and family", icon: "👨‍👩‍👧" },
      { title: "July 4th", description: "The biggest fireworks show of the year on the water", icon: "🇺🇸" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["party-boat-rentals-chicago", "yacht-rentals-chicago", "air-and-water-show-boat-rentals"],
    faqs: [
      { question: "When are the Navy Pier fireworks?", answer: "Navy Pier typically hosts fireworks on select summer Wednesday and Saturday evenings, plus special shows on July 4th and other holidays. Check Navy Pier's schedule for current dates." },
      { question: "How early should I book a fireworks boat?", answer: "Book 3–4 weeks ahead for regular summer shows and 2–3 months ahead for July 4th. Fireworks cruises are among the most popular Chicago boat bookings." },
      { question: "Where do boats watch the fireworks from?", answer: "Captains position vessels in designated viewing areas on Lake Michigan east of Navy Pier. Your captain handles positioning — just enjoy the show." },
      sharedFaqs.weather,
    ],
    vendors: ["sample-chicago-party-boat-partner", "sample-chicago-yacht-partner"],
    seasonalPromos: ["navy-pier-fireworks", "fourth-of-july"],
  },
  {
    slug: "air-and-water-show-boat-rentals",
    title: "Air & Water Show Boat Rentals",
    seoTitle: "Chicago Air & Water Show Boat Rentals | Best Views from the Water",
    seoDescription:
      "Watch the Chicago Air & Water Show from a boat! Front-row views of the jets over Lake Michigan. Book your Air Show boat rental before they sell out.",
    headline: "Chicago Air & Water Show Boat Rentals",
    intro:
      "The Chicago Air & Water Show draws millions to the lakefront — but the best seats are on the water. Charter a boat for front-row views of the Blue Angels and other performers flying over Lake Michigan. Air Show boat rentals are limited and sell out every year, so booking early isn't optional — it's essential.",
    bestFor: [
      { title: "Front-row views", description: "Better angles than any spot on the beach", icon: "✈️" },
      { title: "Avoid the crowds", description: "Skip packed lakefront traffic and find your spot on the water", icon: "🚤" },
      { title: "Full-day experience", description: "Make a day of it with swimming, food, and the show", icon: "🌊" },
      { title: "Group viewing", description: "Share the experience with 10–40+ friends", icon: "👥" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["navy-pier-fireworks-boat-rentals", "party-boat-rentals-chicago", "yacht-rentals-chicago"],
    faqs: [
      { question: "When is the Chicago Air & Water Show?", answer: "The Chicago Air & Water Show is typically held over a weekend in mid-August along the lakefront. Confirm exact dates on the City of Chicago events calendar each year." },
      { question: "How far in advance should I book?", answer: "Book 2–3 months ahead. Air Show boat charters are the hardest Chicago boating reservation to get — demand far exceeds supply." },
      { question: "Can boats get close to the air show?", answer: "The Coast Guard establishes safety zones during the show. Captains know the legal viewing areas that offer excellent sightlines while keeping everyone safe." },
      sharedFaqs.weather,
    ],
    vendors: ["sample-chicago-yacht-partner", "sample-chicago-party-boat-partner"],
    seasonalPromos: ["air-water-show"],
  },
  {
    slug: "fishing-charters-chicago",
    title: "Fishing Charters Chicago",
    seoTitle: "Fishing Charters Chicago | Lake Michigan Fishing Trips",
    seoDescription:
      "Book a fishing charter in Chicago on Lake Michigan. Salmon, trout, perch & more with experienced captains. Half-day and full-day trips available.",
    headline: "Fishing Charters on Lake Michigan",
    intro:
      "Lake Michigan fishing out of Chicago is world-class — salmon, trout, perch, and more with experienced captains who know these waters. Whether you're a seasoned angler or bringing the family for a first trip, fishing charters include the boat, gear, and expertise. Boating Chicago connects you with top charter operators and booking platforms.",
    bestFor: [
      { title: "Salmon & trout", description: "Peak season runs spring through fall", icon: "🐟" },
      { title: "Family trips", description: "Kid-friendly charters with patient captains", icon: "👨‍👧‍👦" },
      { title: "Corporate outings", description: "Team fishing trips with a competitive edge", icon: "🏅" },
      { title: "Beginners welcome", description: "All gear and instruction included", icon: "🎣" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["captains-for-hire-chicago", "boat-rentals-chicago"],
    faqs: [
      { question: "What fish can you catch in Chicago on Lake Michigan?", answer: "Lake Michigan off Chicago offers chinook and coho salmon, lake trout, steelhead, and perch depending on season. Your captain targets what's biting." },
      { question: "Do I need a fishing license?", answer: "Illinois fishing licenses are required for anglers 16 and older. Some charter packages include license arrangements — confirm when booking." },
      { question: "What's included in a fishing charter?", answer: "Most Chicago fishing charters include the boat, captain, rods, reels, bait, and tackle. Cleaning and packaging your catch may be included or available for a fee." },
      sharedFaqs.weather,
    ],
    vendors: ["sample-chicago-fishing-partner"],
  },
  {
    slug: "captains-for-hire-chicago",
    title: "Captains for Hire Chicago",
    seoTitle: "Captains for Hire Chicago | USCG Licensed Boat Captains",
    seoDescription:
      "Hire a licensed captain in Chicago for your boat rental, event, or private vessel. USCG captains for Lake Michigan and the Chicago River.",
    headline: "Licensed Captains for Hire in Chicago",
    intro:
      "Need a captain for your Chicago boat rental or private vessel? USCG-licensed captains bring local knowledge, safety expertise, and peace of mind to every trip on Lake Michigan. Whether you're renting a boat without a license, hosting an event, or need a delivery captain, Boating Chicago connects you with professional captains across the Chicago area.",
    bestFor: [
      { title: "Bareboat rentals", description: "Rent the boat, hire the captain separately", icon: "🧑‍✈️" },
      { title: "Private vessel owners", description: "Captain services for your own boat", icon: "⛵" },
      { title: "Events & parties", description: "Professional captains for special occasions", icon: "🎉" },
      { title: "Training", description: "Learn local waters with an experienced captain", icon: "📚" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["boat-rentals-chicago", "fishing-charters-chicago"],
    faqs: [
      { question: "How much does a captain cost in Chicago?", answer: "Chicago captains typically charge $75–$150 per hour depending on vessel size and experience. Half-day and full-day rates may be available." },
      { question: "Are captains USCG licensed?", answer: "Always verify your captain holds a valid USCG license appropriate for the vessel and passenger count. Ask for credentials before booking." },
      { question: "Can I hire a captain for my own boat?", answer: "Yes — many captains offer services for private vessel owners including event captaining, deliveries, and local navigation assistance." },
      sharedFaqs.weather,
    ],
    vendors: ["sample-chicago-captain-partner"],
  },
  {
    slug: "chicago-marinas",
    title: "Chicago Marinas",
    seoTitle: "Chicago Marinas | Lake Michigan Marinas & Harbor Guide",
    seoDescription:
      "Find Chicago marinas on Lake Michigan — transient slips, seasonal dockage, fuel & boater services. Complete guide to Chicago harbors and marinas.",
    headline: "Chicago Marinas & Lake Michigan Harbors",
    intro:
      "Chicago's lakefront marina system is one of the largest in the country — from Montrose to Burnham, each harbor has its own character and amenities. Whether you need a transient slip for the weekend, seasonal dockage, or fuel and pump-out services, this guide covers Chicago's key marinas and connects you with local operators.",
    bestFor: [
      { title: "Transient slips", description: "Short-term dockage for visiting boaters", icon: "🔗" },
      { title: "Seasonal dockage", description: "Annual slip rentals at Chicago harbors", icon: "📅" },
      { title: "Boater services", description: "Fuel, pump-out, and maintenance access", icon: "⛽" },
      { title: "New boaters", description: "Find the right home harbor for your vessel", icon: "🗺️" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["boat-storage-chicago", "boat-repair-chicago", "boat-rentals-chicago"],
    faqs: [
      { question: "What are the main Chicago marinas?", answer: "Chicago's lakefront harbors include Montrose, Belmont, Diversey, DuSable, Monroe, Burnham, 31st Street, and 59th Street — each managed under the Chicago Harbors system." },
      { question: "Can I get a transient slip in Chicago?", answer: "Yes — most Chicago harbors offer transient slips, but availability is limited in peak summer. Reserve ahead through Chicago Harbors or private marinas." },
      { question: "How much does a marina slip cost in Chicago?", answer: "Seasonal slip fees vary by harbor and boat size, typically $3,000–$8,000+ per season. Transient rates are usually charged per foot per night." },
    ],
    vendors: ["sample-chicago-marina-partner"],
  },
  {
    slug: "boat-storage-chicago",
    title: "Boat Storage Chicago",
    seoTitle: "Boat Storage Chicago | Winter Storage & Dry Dock Services",
    seoDescription:
      "Find boat storage in Chicago — indoor & outdoor winter storage, dry dock, and shrink wrap services. Protect your vessel through the off-season.",
    headline: "Boat Storage in Chicago",
    intro:
      "Chicago winters are tough on boats — proper storage is essential. From outdoor rack storage to indoor climate-controlled facilities, Chicago-area boat storage options keep your vessel protected from November through spring. Compare local providers and find the right storage solution for your boat and budget.",
    bestFor: [
      { title: "Winter storage", description: "Protect your boat through Chicago's harsh winters", icon: "❄️" },
      { title: "Indoor storage", description: "Climate-controlled options for premium vessels", icon: "🏠" },
      { title: "Shrink wrap", description: "Professional winterization and wrapping services", icon: "📦" },
      { title: "Trailer storage", description: "Options for trailered boats and personal watercraft", icon: "🚛" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["chicago-marinas", "boat-repair-chicago", "boat-detailing-chicago"],
    faqs: [
      { question: "When should I pull my boat for winter in Chicago?", answer: "Most Chicago boaters winterize and store boats by mid-October through early November before the first hard freeze." },
      { question: "How much does boat storage cost in Chicago?", answer: "Outdoor rack storage runs $800–$2,000+ per season. Indoor storage costs more. Shrink wrapping and winterization are typically additional." },
      { question: "What's included in winterization?", answer: "Standard winterization includes engine fogging, antifreeze, fuel stabilizer, and battery maintenance. Shrink wrapping protects the hull and deck." },
    ],
    vendors: ["sample-chicago-marina-partner"],
  },
  {
    slug: "boat-detailing-chicago",
    title: "Boat Detailing Chicago",
    seoTitle: "Boat Detailing Chicago | Mobile Boat Wash & Detailing Services",
    seoDescription:
      "Professional boat detailing in Chicago — wash, wax, interior cleaning & full detail packages. Mobile services at your marina or home port.",
    headline: "Boat Detailing Services in Chicago",
    intro:
      "Keep your boat looking sharp with professional detailing services across Chicago's harbors. Mobile detailers come to your slip for wash, wax, interior cleaning, and full detail packages — perfect for spring commissioning or pre-sale prep. Browse local service providers and request quotes through Boating Chicago.",
    bestFor: [
      { title: "Spring commissioning", description: "Start the season with a fresh, protected hull", icon: "🌸" },
      { title: "Pre-event prep", description: "Look your best for parties and charters", icon: "✨" },
      { title: "Regular maintenance", description: "Scheduled washes to protect your investment", icon: "🔄" },
      { title: "Pre-sale detailing", description: "Maximize value before listing your boat", icon: "💰" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["boat-repair-chicago", "boat-storage-chicago", "chicago-marinas"],
    faqs: [
      { question: "How much does boat detailing cost in Chicago?", answer: "Basic wash and wax runs $150–$300. Full detail packages range from $400–$800+ depending on boat size and condition." },
      { question: "Do detailers come to my marina?", answer: "Most Chicago boat detailers are mobile and service boats at their slip. Confirm marina access policies with your harbor office." },
      { question: "How often should I detail my boat?", answer: "A full detail once or twice per season plus regular washes keeps gelcoat and upholstery in top shape, especially with Lake Michigan's mineral content." },
    ],
    vendors: ["sample-chicago-detailing-partner"],
  },
  {
    slug: "boat-repair-chicago",
    title: "Boat Repair Chicago",
    seoTitle: "Boat Repair Chicago | Marine Mechanics & Boat Service",
    seoDescription:
      "Find boat repair and marine service in Chicago — engine repair, electronics, hull work & more. Trusted local boat mechanics and service yards.",
    headline: "Boat Repair & Marine Service in Chicago",
    intro:
      "When something breaks on the water, you need a trusted Chicago marine mechanic fast. From engine diagnostics and electronics to hull repair and winterization, local boat service providers keep Chicago's fleet running. Boating Chicago connects boat owners with vetted service vendors — and featured listings help the best shops get found first.",
    bestFor: [
      { title: "Engine repair", description: "Inboard, outboard, and sterndrive specialists", icon: "🔧" },
      { title: "Electronics", description: "GPS, fish finders, and marine audio installs", icon: "📡" },
      { title: "Hull & fiberglass", description: "Gelcoat, fiberglass, and structural repairs", icon: "🛠️" },
      { title: "Seasonal service", description: "Commissioning, winterization, and tune-ups", icon: "📋" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["boat-detailing-chicago", "boat-storage-chicago", "chicago-marinas"],
    faqs: [
      { question: "Where can I get boat repair in Chicago?", answer: "Marine service is available at several Chicago harbors, nearby service yards on the North Shore and South Side, and mobile mechanics who come to your slip." },
      { question: "How do I find a reliable marine mechanic?", answer: "Look for certified technicians, positive reviews from local boaters, and experience with your engine brand. Our featured vendors are a starting point — always verify credentials." },
      { question: "Should I repair or replace an older engine?", answer: "A trusted mechanic can assess whether rebuild, repower, or repair makes financial sense. Get multiple quotes for major engine work." },
    ],
    vendors: ["sample-chicago-detailing-partner"],
  },
  {
    slug: "chicago-architecture-cruises",
    title: "Chicago Architecture Cruises",
    seoTitle: "Chicago Architecture Cruises | River Tours & Skyline Boat Tours",
    seoDescription:
      "Book Chicago architecture river cruises and guided skyline boat tours. Compare top architecture cruises on the Chicago River and Lake Michigan.",
    headline: "Chicago Architecture Cruises & River Tours",
    intro:
      "Chicago’s architecture is best seen from the water. Architecture river cruises glide past downtown landmarks, bridges, and the skyline while guides share the stories behind the buildings. These are ticketed guided tours — not private boat rentals. Book an architecture cruise online, or use our Find a Boat form if you want a private charter with your own itinerary.",
    bestFor: [
      { title: "First-time visitors", description: "The classic way to see downtown from the river", icon: "🏙️" },
      { title: "Families & couples", description: "Easy, seated sightseeing with skyline views", icon: "👨‍👩‍👧" },
      { title: "Architecture fans", description: "Guided commentary on Chicago’s famous buildings", icon: "🏛️" },
      { title: "Same-day plans", description: "Many cruises offer instant online booking", icon: "⚡" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["chicago-dining-cruises", "boat-rentals-chicago", "yacht-rentals-chicago"],
    faqs: [
      { question: "What is a Chicago architecture cruise?", answer: "An architecture cruise is a guided boat tour on the Chicago River (and sometimes Lake Michigan) focused on downtown buildings, bridges, and skyline history. It is a ticketed public tour, not a private boat rental." },
      { question: "How long do architecture cruises last?", answer: "Most Chicago architecture river tours run about 45–90 minutes. The 75-minute guided cruise is a popular middle option." },
      { question: "Can I book a private architecture charter instead?", answer: "Yes — if you want a private boat with your own group and schedule, use our Find a Boat form. Architecture cruises below are ready-to-book public tours." },
      sharedFaqs.weather,
    ],
    vendors: [],
  },
  {
    slug: "chicago-fireworks-cruises",
    title: "Chicago Fireworks Cruises",
    seoTitle: "Chicago Fireworks Cruises | Navy Pier Fireworks Boat Tours",
    seoDescription:
      "Book Chicago fireworks cruises on Lake Michigan. 3D fireworks cruises, Seadog speedboat fireworks tours, and more — watch from the water.",
    headline: "Chicago Fireworks Cruises on Lake Michigan",
    intro:
      "Watching fireworks from a boat is one of Chicago’s best summer nights — reflections on the lake, skyline glow, and no pier crush. Ticketed fireworks cruises (including 3D fireworks and Seadog speedboat options) let you book online. For a private fireworks charter with just your group, use the Find a Boat form.",
    bestFor: [
      { title: "Navy Pier fireworks nights", description: "Summer Wednesday & Saturday shows from the water", icon: "🎆" },
      { title: "Date nights", description: "Romantic lake views without fighting pier crowds", icon: "💕" },
      { title: "Speedboat thrills", description: "Seadog fireworks cruises for a faster ride", icon: "🚤" },
      { title: "Groups & visitors", description: "Easy ticketed options with set departure times", icon: "🎟️" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["navy-pier-fireworks-boat-rentals", "party-boat-rentals-chicago", "boat-rentals-chicago"],
    faqs: [
      { question: "When are Chicago fireworks cruises available?", answer: "Most fireworks cruises align with Navy Pier’s summer fireworks schedule (often Wednesday and Saturday evenings) plus holiday shows. Always confirm the date on the booking page." },
      { question: "Is a fireworks cruise the same as a private boat rental?", answer: "No. Fireworks cruises are ticketed public tours with set times. Private rentals and charters are arranged separately through our Find a Boat form." },
      { question: "Where do fireworks cruises depart from?", answer: "Departure docks vary by operator — often near Navy Pier or downtown harbors. Your confirmation email includes exact boarding instructions." },
      sharedFaqs.weather,
    ],
    vendors: [],
  },
  {
    slug: "chicago-jet-ski-rentals",
    title: "Chicago Jet Ski Rentals",
    seoTitle: "Chicago Jet Ski Rentals | North Avenue Beach Jet Ski on Lake Michigan",
    seoDescription:
      "Rent a jet ski in Chicago at North Avenue Beach with skyline views on Lake Michigan. Book jet ski rentals online through trusted partners.",
    headline: "Chicago Jet Ski Rentals on Lake Michigan",
    intro:
      "Want speed and skyline views without chartering a whole boat? Chicago jet ski rentals at North Avenue Beach put you on Lake Michigan with the downtown towers as your backdrop. These are personal watercraft rentals — not private yacht or party boat charters. Book a jet ski online, or request a private boat match if you need a larger vessel.",
    bestFor: [
      { title: "Thrill seekers", description: "Fast rides on Lake Michigan with skyline views", icon: "💨" },
      { title: "Couples & friends", description: "Small-group fun without a full boat charter", icon: "🤙" },
      { title: "North Avenue Beach", description: "Prime lakefront launch with easy access", icon: "🏖️" },
      { title: "Instant booking", description: "Reserve your jet ski rental online", icon: "📱" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["chicago-kayak-rentals", "boat-rentals-chicago", "chicago-playpen-boat-rentals"],
    faqs: [
      { question: "Where can I rent a jet ski in Chicago?", answer: "North Avenue Beach is a popular Lake Michigan jet ski rental location with skyline views. Availability and requirements are listed on the booking page." },
      { question: "Do I need a license to rent a jet ski in Illinois?", answer: "Illinois has age and safety requirements for personal watercraft. Confirm operator rules, age minimums, and any required certificates before booking." },
      { question: "Is a jet ski rental the same as a boat rental?", answer: "No. Jet ski rentals are personal watercraft. For pontoons, party boats, or yacht charters, use our Find a Boat form." },
      sharedFaqs.weather,
    ],
    vendors: [],
  },
  {
    slug: "chicago-kayak-rentals",
    title: "Chicago Kayak Rentals",
    seoTitle: "Chicago Kayak Rentals | Downtown River Kayaking Near the Skyline",
    seoDescription:
      "Rent a kayak in downtown Chicago. 2-hour kayak rentals on the Chicago River with skyline views. Book online or find private boat options.",
    headline: "Chicago Downtown Kayak Rentals",
    intro:
      "Paddle downtown Chicago at water level — bridges overhead, glass towers above, and the river winding through the Loop. A 2-hour downtown kayak rental is an active, affordable way to experience the city from the water. Kayak rentals are not motorized boat charters; for private boats and captains, use our lead form.",
    bestFor: [
      { title: "Active travelers", description: "Paddle your own route through downtown", icon: "🛶" },
      { title: "Budget-friendly water time", description: "Skyline views without a full charter price", icon: "💵" },
      { title: "Photos & sightseeing", description: "River-level angles of Chicago’s architecture", icon: "📸" },
      { title: "Couples & small groups", description: "Easy 2-hour downtown kayak sessions", icon: "👥" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["chicago-architecture-cruises", "chicago-jet-ski-rentals", "boat-rentals-chicago"],
    faqs: [
      { question: "Where do downtown Chicago kayak rentals launch?", answer: "Most downtown kayak rentals launch from riverfront locations near the Loop or Riverwalk area. Exact meeting points are confirmed at booking." },
      { question: "Do I need experience to kayak in Chicago?", answer: "Many rentals welcome beginners and provide basic instruction. Check the listing for skill level, age rules, and whether a guide is included." },
      { question: "Can I kayak on Lake Michigan too?", answer: "Some operators offer lake paddling depending on conditions. Downtown river kayaking is the most common skyline experience." },
      sharedFaqs.weather,
    ],
    vendors: [],
  },
  {
    slug: "chicago-dining-cruises",
    title: "Chicago Dining Cruises",
    seoTitle: "Chicago Dining Cruises | Brunch, Lunch & Dinner River Cruises",
    seoDescription:
      "Book Chicago brunch, lunch, or dinner river cruises. Dining cruises with downtown architecture views — not private yacht charters.",
    headline: "Chicago Brunch, Lunch & Dinner River Cruises",
    intro:
      "Combine a meal with the Chicago skyline on a brunch, lunch, or dinner river cruise. These are ticketed dining experiences on scheduled boats — perfect for celebrations and visitors. They are not private yacht charters. Want a private yacht with custom catering? Use the Find a Boat form.",
    bestFor: [
      { title: "Celebrations", description: "Birthdays, anniversaries, and special dinners", icon: "🥂" },
      { title: "Visitors", description: "Sightseeing and a meal in one outing", icon: "🍽️" },
      { title: "Date nights", description: "Skyline views with brunch, lunch, or dinner", icon: "🌆" },
      { title: "Easy booking", description: "Choose a seating and reserve online", icon: "✅" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["chicago-architecture-cruises", "yacht-rentals-chicago", "corporate-yacht-charters-chicago"],
    faqs: [
      { question: "What is included on a Chicago dining cruise?", answer: "Most dining cruises include a meal service and the cruise itself. Drinks, upgrades, and dietary options vary — check the booking details." },
      { question: "Is a dining cruise a private yacht rental?", answer: "No. Dining cruises are shared, ticketed experiences. Private yacht charters are arranged separately through our lead form." },
      { question: "How long is a brunch or dinner cruise?", answer: "Typical Chicago dining cruises run about 1.5–3 hours depending on the meal service and route." },
      sharedFaqs.booking,
    ],
    vendors: [],
  },
  {
    slug: "chicago-tiki-cruises",
    title: "Chicago Tiki Cruises",
    seoTitle: "Chicago Tiki Bar Cruise | River & Lake Michigan Party Cruise",
    seoDescription:
      "Book the Chicago Tiki Bar Cruise on the Chicago River or Lake Michigan. A ticketed party cruise experience — not a private party boat rental.",
    headline: "Chicago Tiki Bar Cruises",
    intro:
      "Tropical vibes on the Chicago River or Lake Michigan — the Tiki Bar Cruise is a ticketed party cruise with drinks, music, and skyline scenery. It’s a ready-to-book group experience, not a private party boat you control end-to-end. For a private party boat rental, use our Find a Boat form.",
    bestFor: [
      { title: "Group hangouts", description: "Friends, birthdays, and casual celebrations", icon: "🍹" },
      { title: "Bachelorette add-ons", description: "A fun ticketed cruise for the squad", icon: "💃" },
      { title: "Visitors", description: "Party atmosphere with Chicago water views", icon: "🎉" },
      { title: "Instant booking", description: "Reserve seats online without arranging a charter", icon: "📲" },
    ],
    affiliates: ["getyourguide"],
    relatedSlugs: ["party-boat-rentals-chicago", "bachelorette-boat-rentals-chicago", "birthday-boat-rentals-chicago"],
    faqs: [
      { question: "Is the Tiki Bar Cruise a private party boat?", answer: "No. It is a ticketed public party cruise. Private party boat rentals are matched through our Find a Boat form." },
      { question: "Does the cruise go on the river or the lake?", answer: "Depending on the sailing, routes may include the Chicago River and/or Lake Michigan. Confirm details on the booking page." },
      { question: "Can we bring our own drinks?", answer: "Policies vary by operator. Most ticketed tiki cruises have onboard bars — check the listing before you book." },
      sharedFaqs.weather,
    ],
    vendors: [],
  },
];

export function getCategoryBySlug(slug: string): CategoryPage | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}

export const homepageCategories = [
  { slug: "boat-rentals-chicago", title: "Boat Rentals", icon: "🚤", description: "Pontoons, speedboats & more on Lake Michigan" },
  { slug: "yacht-rentals-chicago", title: "Yacht Charters", icon: "🛥️", description: "Luxury charters for any occasion" },
  { slug: "party-boat-rentals-chicago", title: "Party Boats", icon: "🎉", description: "Big groups, big fun on the lake" },
  { slug: "bachelorette-boat-rentals-chicago", title: "Bachelorette Parties", icon: "💃", description: "Celebrate on the water with your squad" },
  { slug: "fishing-charters-chicago", title: "Fishing Charters", icon: "🎣", description: "Salmon, trout & perch with local captains" },
  { slug: "navy-pier-fireworks-boat-rentals", title: "Fireworks Cruises", icon: "🎆", description: "Watch Navy Pier fireworks from a boat" },
  { slug: "corporate-yacht-charters-chicago", title: "Corporate Events", icon: "💼", description: "Impress clients on Lake Michigan" },
  { slug: "captains-for-hire-chicago", title: "Captains for Hire", icon: "🧑‍✈️", description: "Licensed captains for any vessel" },
];
