"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateErrorObject = void 0;
function generateErrorObject(message) {
    return {
        error: true,
        message,
        throwIfError: () => {
            throw new Error(message);
        },
    };
}
exports.generateErrorObject = generateErrorObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVFcnJvck9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9nZW5lcmF0ZUVycm9yT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLFNBQWdCLG1CQUFtQixDQUFDLE9BQWU7SUFDakQsT0FBTztRQUNMLEtBQUssRUFBRSxJQUFJO1FBQ1gsT0FBTztRQUNQLFlBQVksRUFBRSxHQUFHLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFSRCxrREFRQyJ9