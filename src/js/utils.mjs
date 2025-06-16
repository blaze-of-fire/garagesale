export function GetItems(filepath) {
    fetch(filepath)
    const response = fetch(filepath)

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = response.json();
    return data;
}