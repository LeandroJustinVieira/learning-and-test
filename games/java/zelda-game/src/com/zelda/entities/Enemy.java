package com.zelda.entities;

import com.zelda.main.Game;
import com.zelda.world.World;

import java.awt.image.BufferedImage;

public class Enemy extends Entity {

    private double speed = 0.5;

    public Enemy(int x, int y, int width, int height, BufferedImage bufferedImage) {
        super(x, y, width, height, bufferedImage);
    }

    @Override
    public void tick() {
        if (this.getX() < Game.player.getX() && World.isFree((int)(this.getX() + this.getSpeed()), (int) (this.getY()))) {
            setX(this.getX() + this.getSpeed());
        } else if (this.getX() > Game.player.getX() && World.isFree((int)(this.getX() - this.getSpeed()), (int) (this.getY()))) {
            setX(this.getX() - this.getSpeed());
        }

        if (this.getY() < Game.player.getY() && World.isFree((int)(this.getX()), (int) (this.getY() + this.getSpeed()))) {
            setY(this.getY() + this.getSpeed());
        } else if (this.getY() > Game.player.getY() && World.isFree((int)(this.getX()), (int) (this.getY() - this.getSpeed()))) {
            setY(this.getY() - this.getSpeed());
        }
    }

    public double getSpeed() {
        return speed;
    }

    public void setSpeed(double speed) {
        this.speed = speed;
    }
}
