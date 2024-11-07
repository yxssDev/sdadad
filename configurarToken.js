const { Client: SelfbotClient } = require("discord.js-selfbot-v13");
const express = require("express");
const bodyParser = require("body-parser");
const gradient = require('gradient-flag');

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.post('/clear-dm', async (req, res) => {
    const { userId, token, delay } = req.body;

    let isInvalidToken = false;
    const self = new SelfbotClient();

    // Logando com o token fornecido
    try {
        await self.login(token).catch(() => isInvalidToken = true);
    } catch (error) {
        console.error("Erro ao tentar logar com o token:", error);
        return res.status(400).json({ message: "Token inválido!" });
    }

    if (isInvalidToken) {
        return res.status(400).json({ message: "Token inválido!" });
    }

    try {
        let userDM;
        try {
            userDM = self.users.cache.get(userId)?.dmChannel || await self.users.createDM(userId);
        } catch (error) {
            console.error(`Erro ao criar DM com o usuário ${userId}:`, error);
            return res.status(400).json({ message: `Erro ao criar DM com o usuário ${userId}` });
        }

        if (!userDM) {
            return res.status(400).json({ message: `Não foi possível encontrar ou criar uma DM com o usuário ${userId}` });
        }

        let deleteCount = 0;
        const messages = await fetchMessages(userDM.id, self);

        if (!messages.length) {
            return res.status(400).json({ message: "Nenhuma mensagem encontrada para apagar!" });
        }

        const batchSize = 10;
        let currentDelay = parseInt(delay) || 1500;

        for (let i = 0; i < messages.length; i += batchSize) {
            const batch = messages.slice(i, i + batchSize);

            for (const msg of batch) {
                await msg.delete().then(() => {
                    deleteCount++;
                }).catch(error => {
                    console.error("Erro ao deletar mensagem:", error);
                });
            }

            await new Promise(resolve => setTimeout(resolve, currentDelay));
        }

        return res.json({ message: `Todas as mensagens recentes do usuário ${userId} foram apagadas com sucesso!` });
    } catch (error) {
        console.error("Erro ao apagar mensagens:", error);
        return res.status(500).json({ message: "Erro ao apagar mensagens." });
    }
});

async function fetchMessages(dmChannelId, client) {
    const dmChannel = client.channels.cache.get(dmChannelId);
    let messages = [];
    let lastId;

    while (true) {
        const options = { limit: 100 };
        if (lastId) options.before = lastId;

        const fetched = await dmChannel.messages.fetch(options);
        if (fetched.size === 0) break;

        messages.push(...fetched.filter(msg => msg.author.id === client.user.id));
        lastId = fetched.last().id;
    }

    return messages;
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
