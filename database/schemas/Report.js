export const reportSchema = {
    name: 'Reports',
    properties: {
        _id: 'string',
        report_id: 'string',
        filer: 'string',
        status: 'string',
        dateFiled: 'string',
        pursuer: 'string',
        name: 'string',
        description: 'string',
        address: 'string',
        longitude: 'string',
        latitude: 'string',
        street: 'string',
        city: 'string',
        state: 'string',
        country: 'string',
        zip: 'string'
    },
    primaryKey: '_id',
}