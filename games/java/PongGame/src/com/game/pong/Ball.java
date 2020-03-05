package com.game.pong;

import java.awt.*;
import java.util.Random;

public class Ball {

    public double x, y;
    public int width, height;
    public double dx, dy;
    public double speed = 1.7;

    public Ball(double x, double y) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 4;

        int angle = new Random().nextInt(120 - 45) + 45 + 1;
        this.dx = Math.cos(Math.toRadians(angle));
        this.dy = Math.sin(Math.toRadians(angle));
    }

    public void tick() {

        if (x + (dx * speed) + width >= Game.WIDTH) {
            this.dx *= -1;
        } else if (x + (dx * speed) < 0) {
            this.dx *= -1;
        }

        if (y >= Game.HEIGHT) {
            //Ponto do inimigo
            Game.score.incremetaPontuacaoEnemy();
            new Game();
            return;
        } else if (y < 0) {
            //Ponto do inimigo
            Game.score.incremetaPontuacaoPlayer();
            new Game();
            return;
        }

        Rectangle boundsBall = new Rectangle((int) (x + (dx * speed)), (int) (y + (dy * speed)), width, height);
        Rectangle boundsPlayer = new Rectangle(Game.player.x, Game.player.y, Game.player.width, Game.player.height);
        Rectangle boundsEnemy = new Rectangle((int) Game.enemy.x, (int) Game.enemy.y, Game.enemy.width, Game.enemy.height);

        if (boundsBall.intersects(boundsPlayer)) {
            int angle = new Random().nextInt(120 - 45) + 45 + 1;
            this.dx = Math.cos(Math.toRadians(angle));
            this.dy = Math.sin(Math.toRadians(angle));
            if (this.dy > 0) {
                this.dy *= -1;
            }
        } else if (boundsBall.intersects(boundsEnemy)) {
            int angle = new Random().nextInt(120 - 45) + 45 + 1;
            this.dx = Math.cos(Math.toRadians(angle));
            this.dy = Math.sin(Math.toRadians(angle));
            if (this.dy > 0) {
                this.dy *= -1;
            }
            this.dy *= -1;
        }

        x += dx * speed;
        y += dy * speed;

    }

    public void render(Graphics g) {
        g.setColor(Color.YELLOW);
        g.fillRect((int) x, (int) y, this.width, this.height);
    }
}
