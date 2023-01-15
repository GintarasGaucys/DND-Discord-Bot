const { SlashCommandBuilder, Options } = require('discord.js');

const dotenv = require('dotenv');
const { getCampaign } = require('kanka');
dotenv.config();

apitoken = process.env.API_TOKEN

const kanka = require('kanka');

kanka.setToken(apitoken);


async function getCharacter(name) {
    let camp = await kanka.getCampaign(177046);
    let characters = await camp.characters.get();
    for (let i = 0; i < Object.keys(characters["data"]).length; i++) {
        if (characters["data"][i]["name"] == "Lazarus Flameclaw") {
            return characters["data"][i];
        } else {
            return 0;
        }
    }
}



module.exports = {

    data: new SlashCommandBuilder()
        .setName('character')
        .setDescription('Gets a characters details')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Characters name')
                .setRequired(true)),

    async execute(interaction) {
        const name = interaction.options.getString('name');
        const character = await getCharacter(name);
        await interaction.reply(`${name} ${character}`);
    },
};