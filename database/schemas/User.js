export const userSchema = {
    name: 'Users',
    properties: {
        _id: 'string',
        first_name: 'string',
        last_name: 'string',
        email: 'string',
        password: 'string',
        type: 'string'
    },
    primaryKey: '_id',
}
