package com.game.pong;

import java.awt.*;

public class Enemy {

    public double x, y;
    public int width, height;

    public Enemy(double x, double y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 5;
    }

    public void tick() {
        x += (Game.ball.x - x - 6) * 0.07;

        if (x + width > Game.WIDTH) {
            x = Game.WIDTH - width;
        }
        if (x < 0) {
            x = 0;
        }
    }

    public void render(Graphics g) {
        g.setColor(Color.RED);
        g.fillRect((int) x, (int) y, this.width, this.height);
    }
}
