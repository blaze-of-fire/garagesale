export async function GetItems(filepath) {
    const response = await fetch(filepath)

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data["garage-sale-items"] || data;
}

export function setLocalStorage(key, value) {
    if (typeof key !== 'string' || !key) {
        throw new Error('Key must be a non-empty string');
    }
    if (value === undefined) {
        throw new Error('Value cannot be undefined');
    }
    localStorage.setItem(key, JSON.stringify(value));
};

export function getLocalStorage(key) {
    if (typeof key !== 'string' || !key) {
        throw new Error('Key must be a non-empty string');
    }
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export async function getPixabayImage(imageName) {
    const key = '50543630-5edeb4517ed5b5b51b3dd7a46';
    const cached = getLocalStorage(imageName);
    
    if (typeof cached === 'string') {
        return cached;
    }
    else if (cached) {
        //Remove bad cache
        localStorage.removeItem(imageName);
    }

    // Fetch images from Pixabay API
    const response = await fetch(`https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(imageName)}&image_type=photo`);
    const data = await response.json();
    let imageurl = "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg"

    if (data.hits && data.hits.length > 0) {
        imageurl = data.hits[0].webformatURL;
    }
    setLocalStorage(imageName, imageurl);
    return imageurl;
}