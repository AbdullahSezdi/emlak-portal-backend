const sampleProperties = [
    {
        title: "Deniz Manzaralı Villa İmarlı Arsa",
        description: "Çeşme'nin en güzel lokasyonunda, deniz manzaralı, villa imarlı arsa. Tüm altyapı bağlantıları hazır.",
        price: 4500000,
        area: 850,
        location: {
            city: "İzmir",
            district: "Çeşme",
            address: "Alaçatı Mah. Deniz Cad. No:123"
        },
        features: {
            zoning: "Villa İmarlı",
            parcelNo: "1234",
            blockNo: "567"
        },
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1565118531796-763e5082d113?ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3"
        ]
    },
    {
        title: "Yatırımlık Ticari İmarlı Arsa",
        description: "Gelişmekte olan bölgede, ana yol üzerinde, ticari imarlı arsa. Yüksek kira getiri potansiyeli.",
        price: 3200000,
        area: 600,
        location: {
            city: "İstanbul",
            district: "Beykoz",
            address: "Merkez Mah. İstiklal Cad. No:45"
        },
        features: {
            zoning: "Ticari İmarlı",
            parcelNo: "789",
            blockNo: "234"
        },
        images: [
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?ixlib=rb-4.0.3"
        ]
    },
    {
        title: "Göl Manzaralı Müstakil Ev İmarlı Arsa",
        description: "Sapanca Gölü manzaralı, doğayla iç içe, müstakil ev yapımına uygun arsa.",
        price: 2800000,
        area: 520,
        location: {
            city: "Sakarya",
            district: "Sapanca",
            address: "Göl Mah. Orman Sok. No:78"
        },
        features: {
            zoning: "Konut İmarlı",
            parcelNo: "456",
            blockNo: "789"
        },
        images: [
            "https://images.unsplash.com/photo-1499678329028-101435549a4e?ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1584288585274-48f6994c38e7?ixlib=rb-4.0.3"
        ]
    },
    {
        title: "Sanayi Bölgesinde Yatırımlık Arsa",
        description: "Organize Sanayi Bölgesinde, tüm altyapısı hazır, yatırıma uygun sanayi arsası.",
        price: 5800000,
        area: 2000,
        location: {
            city: "Kocaeli",
            district: "Gebze",
            address: "OSB Mah. Sanayi Cad. No:90"
        },
        features: {
            zoning: "Sanayi İmarlı",
            parcelNo: "901",
            blockNo: "345"
        },
        images: [
            "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?ixlib=rb-4.0.3"
        ]
    },
    {
        title: "Şehir Merkezinde Konut İmarlı Arsa",
        description: "Merkezi konumda, ulaşımı kolay, tüm sosyal olanaklara yakın konut imarlı arsa.",
        price: 2100000,
        area: 400,
        location: {
            city: "Ankara",
            district: "Çankaya",
            address: "Kızılay Mah. Cumhuriyet Cad. No:56"
        },
        features: {
            zoning: "Konut İmarlı",
            parcelNo: "678",
            blockNo: "123"
        },
        images: [
            "https://images.unsplash.com/photo-1598977123118-4e20ea58f13e?ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3"
        ]
    }
];

const seedDatabase = async (Property) => {
    try {
        // Clear existing properties
        await Property.deleteMany({});
        
        // Insert sample properties
        await Property.insertMany(sampleProperties);
        
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

module.exports = seedDatabase; 