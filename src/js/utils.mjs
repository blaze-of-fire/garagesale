export async function GetItems(filepath) {
    fetch(filepath)
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

export function getPixabayImage(imageName) {
    const key = '50543630-5edeb4517ed5b5b51b3dd7a46';
    if (getLocalStorage(imageName) == null) {
        // Fetch images from Pixabay API
        let imageurl = GetItems(`https://pixabay.com/api/?key={${key}}&q=${imageName}&image_type=photo`);
        setLocalStorage(imageName, imageurl);
    }
    else {
        imageurl = getLocalStorage(imageName);
    }
    
    return imageurl;
}