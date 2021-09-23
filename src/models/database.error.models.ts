class DatabaseError extends Error {
    constructor(
        public message: string,
        public error?: any,
    ) {
        super(error);
    }
}

export default DatabaseError;