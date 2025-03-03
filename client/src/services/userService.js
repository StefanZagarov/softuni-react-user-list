const baseUrl = 'http://localhost:3030/jsonstore/users';

export default {
    async getAll() {
        try {
            const response = await fetch(baseUrl);
            const result = await response.json();
            const users = Object.values(result);

            return users;
        }
        catch (error) {
            return error;
        }
    },

    async create(userData) {

        // Getting the relevant properties to fix the structure of the object, the rest is left as is in a variable called "postData"
        const { country, city, street, streetNumber, postData } = userData;


        // Fixing object structure and filling additional properties
        postData.address = { country, city, street, streetNumber };
        postData.createdAt = new Date().toISOString();
        postData.updatedAt = new Date().toISOString();

        try {
            const response = await fetch(baseUrl, {
                method: `POST`,
                headers: {
                    "Content-Type": `application/json`
                },
                body: JSON.stringify(postData)
            });

            const result = await response.json();
            return result;
        }
        catch (error) {
            return error;
        }
    }
};


