import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class RestoSource {
    static async listRestaurant() {
        const response = await fetch(API_ENDPOINT.LIST_RESTAURANT);
        return response.json();
    }

    static async detailRestaurant(id) {
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        return response.json();
    }

    static async postReview(review) {
        try {
            const response = await fetch(CONFIG.BASE_URL_REVIEW, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 12345,
                },
                body: JSON.stringify(review),
            });

            if (!response.ok) {
                throw new Error('Failed to post review');
            }

            // Mengembalikan respons dalam bentuk JSON
            return response.json();
        } catch (error) {
            console.error('Error posting review:', error);
            throw new Error('Failed to post review');
        }
    }
}

export default RestoSource;
