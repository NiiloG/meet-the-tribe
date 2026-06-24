"use client";

export type Locale = "en" | "es";

export const translations = {
  en: {
    nav: {
      amazonia: "Amazonia",
      kenya: "Kenya",
      comingSoon: "Coming Soon",
    },
    hero: {
      tagline: "Live with the people who belong to the land.",
      cta: "Explore Destinations",
    },
    locations: {
      title: "Where do you want to go?",
      activities: "Activities",
      bookNow: "Book Now",
      learnMore: "Learn More",
    },
    amazonia: {
      name: "Amazonia",
      subtitle: "Ecuador · Shuar & Achuar Territory",
      description:
        "Deep in the Ecuadorian Amazon, live alongside communities that have protected this forest for generations.",
      activities: ["Canoe navigation", "Medicinal plants", "Shamanic ceremony", "Bird watching"],
    },
    kenya: {
      name: "Kenya",
      subtitle: "Maasai Mara · Coming Soon",
      description: "Experience the rhythm of the savanna with Maasai guides.",
      activities: ["Safari walks", "Bead craft", "Cattle herding", "Night sky"],
    },
    sections: {
      land: "The Land",
      people: "The People",
      stays: "Where You Sleep",
      tours: "Experiences",
      hosts: "Your Hosts",
      booking: "Book Your Journey",
    },
    booking: {
      name: "Full name",
      email: "Email",
      dates: "Travel dates",
      guests: "Number of guests",
      notes: "Special requests",
      submit: "Request Booking",
      success: "Request received — we'll be in touch within 48 hours.",
      error: "Something went wrong. Please try again.",
    },
    footer: {
      tagline: "Travel that gives back to the land and its people.",
      rights: "All rights reserved.",
    },
  },
  es: {
    nav: {
      amazonia: "Amazonia",
      kenya: "Kenia",
      comingSoon: "Próximamente",
    },
    hero: {
      tagline: "Vive con las personas que pertenecen a la tierra.",
      cta: "Explorar Destinos",
    },
    locations: {
      title: "¿A dónde quieres ir?",
      activities: "Actividades",
      bookNow: "Reservar",
      learnMore: "Saber más",
    },
    amazonia: {
      name: "Amazonia",
      subtitle: "Ecuador · Territorio Shuar y Achuar",
      description:
        "En lo profundo de la Amazonia ecuatoriana, convive con comunidades que han protegido este bosque por generaciones.",
      activities: ["Navegación en canoa", "Plantas medicinales", "Ceremonia chamánica", "Observación de aves"],
    },
    kenya: {
      name: "Kenia",
      subtitle: "Maasai Mara · Próximamente",
      description: "Siente el ritmo de la sabana con guías Maasai.",
      activities: ["Safaris a pie", "Artesanía de cuentas", "Pastoreo de ganado", "Cielo nocturno"],
    },
    sections: {
      land: "La Tierra",
      people: "Las Personas",
      stays: "Dónde Dormir",
      tours: "Experiencias",
      hosts: "Tus Anfitriones",
      booking: "Reserva tu Viaje",
    },
    booking: {
      name: "Nombre completo",
      email: "Correo electrónico",
      dates: "Fechas de viaje",
      guests: "Número de personas",
      notes: "Solicitudes especiales",
      submit: "Solicitar Reserva",
      success: "Solicitud recibida — te contactaremos en 48 horas.",
      error: "Algo salió mal. Por favor intenta de nuevo.",
    },
    footer: {
      tagline: "Turismo que devuelve a la tierra y a su gente.",
      rights: "Todos los derechos reservados.",
    },
  },
};

export type Translations = typeof translations.en;
