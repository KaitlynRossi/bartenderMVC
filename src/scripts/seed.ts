import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const drinks = [
    {
      name: "Margarita",
      img: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
      description: "A classic tequila-based cocktail with lime juice and triple sec, served with a salted rim.",
      price: "$10"
    },
    {
      name: "Old Fashioned",
      img: "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg",
      description: "A timeless whiskey cocktail made with bourbon, bitters, sugar, and an orange twist.",
      price: "$12"
    },
    {
      name: "Mojito",
      img: "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
      description: "A refreshing Cuban cocktail with white rum, mint, lime, sugar, and soda water.",
      price: "$9"
    },
    {
      name: "Cosmopolitan",
      img: "https://www.thecocktaildb.com/images/media/drink/kpsajh1504368362.jpg",
      description: "A stylish mix of vodka, triple sec, cranberry juice, and fresh lime.",
      price: "$11"
    },
    {
      name: "Negroni",
      img: "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg",
      description: "A bold and bitter cocktail with gin, Campari, and sweet vermouth.",
      price: "$11"
    },
    {
      name: "Whiskey Sour",
      img: "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg",
      description: "A tangy blend of bourbon, lemon juice, and sugar, optionally topped with egg white.",
      price: "$10"
    },
    {
      name: "Martini",
      img: "https://www.thecocktaildb.com/images/media/drink/vcyvpq1485083300.jpg",
      description: "A dry gin (or vodka) cocktail served chilled with a splash of dry vermouth and a twist or olive.",
      price: "$13"
    },
    {
      name: "Gilligan's Island",
      img: "https://www.thecocktaildb.com/images/media/drink/wysqut1461867176.jpg",
      description: "a tropical, fruity cocktail made with vodka, peach schnapps, orange juice, and cranberry juice.",
      price: "$10"
    },
    {
      name: "Mai Tai",
      img: "https://www.thecocktaildb.com/images/media/drink/twyrrp1439907470.jpg",
      description: "A tropical rum cocktail with lime juice, orgeat syrup, and orange liqueur.",
      price: "$12"
    },
    {
      name: "Daiquiri",
      img: "https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg",
      description: "A crisp rum cocktail shaken with lime juice and simple syrup.",
      price: "$9"
    }
  ]

  // Insert drinks
  for (const drink of drinks) {
    await prisma.drink.upsert({
      where: { name: drink.name },
      update: {},
      create: drink
    })
  }

  console.log("Drinks seeded successfully")
}

main()
  .catch(e => {
    console.error("Error seeding drinks:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

