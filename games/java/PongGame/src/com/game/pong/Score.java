package com.game.pong;

public class Score {

    private int scoreEnemy = 0;
    private int scorePlayer = 0;

    public int getScoreEnemy() {
        return scoreEnemy;
    }

    public void setScoreEnemy(int scoreEnemy) {
        this.scoreEnemy = scoreEnemy;
    }

    public int getScorePlayer() {
        return scorePlayer;
    }

    public void setScorePlayer(int scorePlayer) {
        this.scorePlayer = scorePlayer;
    }

    public void incremetaPontuacaoPlayer() {
        this.scorePlayer += 1;
    }

    public void incremetaPontuacaoEnemy() {
        this.scoreEnemy += 1;
    }


}
