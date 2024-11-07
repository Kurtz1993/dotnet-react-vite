import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    client: 'legacy/fetch',
    input: 'http://localhost:5195/swagger/v1/swagger.json',
    output: 'src/client',
    plugins: [
        {
            name: '@hey-api/types', // preserves default output
            enums: 'typescript',
        },
        {
            asClass: true,
            methodNameBuilder: (operation: any) => operation.name.replace(operation.service, '').replace('Api', ''),
            name: '@hey-api/services',
        },
    ],
});
