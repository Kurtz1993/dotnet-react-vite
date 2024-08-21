module.exports = {
    client: 'fetch',
    input: 'http://localhost:5195/swagger/v1/swagger.json',
    output: 'src/client',
    services: {
        asClass: true,
        methodNameBuilder: (operation) => operation.name.replace(operation.service, '').replace('Api', ''),
    },
    schemas: false,
    types: {
        enums: 'typescript',
    },
};
