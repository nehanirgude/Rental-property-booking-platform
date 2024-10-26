const { MongoClient, ObjectId } = require('mongodb');

async function updateImage() {
    const client = new MongoClient('mongodb://localhost:27017/wanderlust');
    try {
        await client.connect();
        const database = client.db('wanderlust');
        const collection = database.collection('listings');

        const filter = { _id: ObjectId('670b4fe07fe93a5249801778') };
        const update = {
            $set: {
                image: { url: 'https://unsplash.com/photos/white-concrete-building-during-daytime-vQhrn1cEvNk' }
            }
        };

        const result = await collection.updateOne(filter, update);
        console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    } finally {
        await client.close();
    }
}