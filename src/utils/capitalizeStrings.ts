export default function capitalizeStrings(strings: string[]) {
    if (strings.length === 0 || !strings) {
        return null
    }
    
    return strings.map(string => (
        string.split(" ")
            .map(substring => (
                substring.slice(0, 1).toUpperCase() + substring.slice(1, string.length)
            ))
            .join(" ")
    )).join(", ")
}