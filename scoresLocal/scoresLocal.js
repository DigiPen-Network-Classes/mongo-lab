const port = 13200;

import express from 'express';
const app = express();
app.use(express.json());

const allGames = {};

app.get('/scoresLab/games/:gameName/scores', async (req, res) => {
    try {
        const game = allGames[req.params.gameName];
        if (game == undefined) {
            res.sendStatus(404);
            return;
        }
        res.send(game);
    } catch(error) {
        console.error('Failed to lookup', error.message);
        res.status(500).send({error: 'database operation failed'});
    }
});

app.post('/scoresLab/games/:gameName/scores/:playerName', async (req, res) => {
    try {
        let game = allGames[req.params.gameName];
        if (game == undefined) {
            game = {
                name : req.params.gameName,
                scores : {}
            };
            allGames[req.params.gameName] = game;
        }
        game.scores[req.params.playerName] = req.body.score;
        res.send(game);
    } catch(error) {
        console.error('Failed to post score', error.message);
        res.status(500).send({error: 'database operation failed'});
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
