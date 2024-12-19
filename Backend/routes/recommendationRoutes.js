const { getUserCart , getFavoriteBooks} = require('./userController');

async function recommendBooksForUser(userId){
    try{
        const cartBooks = await getUserCart(userId);
        const favoriteBooks = await getFavoriteBooks(userId);

        const userBooks = [...new Set([...cartBooks , ...favoriteBooks])];

        const recommendations = await getRecommendationsBasedOnUserActivity(userBooks);
        return recommendations;
    }catch(err){
        console.error(err);
        return [];
    }
}