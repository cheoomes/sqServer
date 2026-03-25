const config = {
    datasource: {
        provider: "postgres",
        url: process.env.DATABASE_URL,
        relationMode: "prisma",
    },
};

export default config;
