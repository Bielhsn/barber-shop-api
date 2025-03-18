export function generateErrorObject(message) {
    return {
        error: true,
        message,
        throwIfError: () => {
            throw new Error(message);
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVFcnJvck9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9nZW5lcmF0ZUVycm9yT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxPQUFlO0lBQ2pELE9BQU87UUFDTCxLQUFLLEVBQUUsSUFBSTtRQUNYLE9BQU87UUFDUCxZQUFZLEVBQUUsR0FBRyxFQUFFO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDIn0=