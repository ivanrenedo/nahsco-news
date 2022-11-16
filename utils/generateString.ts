class GenerateString {

    public generateRandomString(length: number = 12): string {
        return Math.random().toString(20).substr(2, length)
    }
}

export default GenerateString;