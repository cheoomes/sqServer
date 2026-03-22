import { prisma } from "./prisma";

export async function validateApiKey(apiKey: string) {
    if (!apiKey) {
        throw new Error("Missing API key");
    }

    const client = await prisma.client.findUnique({
        where: { apiKey },
    });

    if (!client) {
        throw new Error("Invalid API key");
    }

    return client;
}
