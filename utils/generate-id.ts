import GenerateString from "./generateString";

export function getNewId() {
    // we could use a fancier solution instead of a sequential ID :)
    const uuid = new GenerateString();
    const random = uuid.generateRandomString();
    return random.toLowerCase();
}