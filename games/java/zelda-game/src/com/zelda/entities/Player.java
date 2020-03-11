package com.zelda.entities;

import java.awt.*;
import java.awt.image.BufferedImage;

public class Player extends Entity {

    private boolean right, left, up, down;
    private double speed = 0.7;

    public Player(int x, int y, int width, int height, BufferedImage sprite) {
        super(x, y, width, height, sprite);
    }

    @Override
    public void tick() {
        if (isRight()) {
            this.setX(this.getX() + this.getSpeed());
        }
        if (isLeft()) {
            this.setX(this.getX() - this.getSpeed());
        }
        if (isUp()) {
            this.setY(this.getY() - this.getSpeed());
        }
        if (isDown()) {
            this.setY(this.getY() + this.getSpeed());
        }
    }

    public boolean isRight() {
        return right;
    }

    public void setRight(boolean right) {
        this.right = right;
    }

    public boolean isLeft() {
        return left;
    }

    public void setLeft(boolean left) {
        this.left = left;
    }

    public boolean isUp() {
        return up;
    }

    public void setUp(boolean up) {
        this.up = up;
    }

    public boolean isDown() {
        return down;
    }

    public void setDown(boolean down) {
        this.down = down;
    }

    public double getSpeed() {
        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }
}
