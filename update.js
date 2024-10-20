// updateListings.js

const sampleListings = [ /* your listings data here */ ];

const updatedListings = sampleListings.map(listing => {
    if (listing.title === "Cozy Beachfront Cottage") {
        return {
            ...listing,
            image: {
                filename: "new_listing_image",
                url: "https://unsplash.com/photos/a-train-traveling-past-a-tall-building-under-a-bridge-3dJ2Pxmn4L8",
            },
        };
    }
    return listing;
});

console.log(updatedListings);
