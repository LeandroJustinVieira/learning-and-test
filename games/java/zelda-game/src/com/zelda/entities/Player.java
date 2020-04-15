package com.zelda.entities;

import com.zelda.main.Game;
import com.zelda.world.Camera;
import com.zelda.world.World;

import java.awt.*;
import java.awt.image.BufferedImage;

public class Player extends Entity {

    private boolean right, left, up, down;
    private double speed = 0.7;
    private int dirRightValue = 0, dirLeftValue = 1;
    private int dir = dirRightValue;

    private BufferedImage[] rightPlayer;
    private BufferedImage[] leftPlayer;
    private int frames = 0, maxFrames = 5, index = 0, maxIndex = 3;
    private boolean moved = false;

    public Player(int x, int y, int width, int height, BufferedImage sprite) {
        super(x, y, width, height, sprite);

        rightPlayer = new BufferedImage[4];
        leftPlayer = new BufferedImage[4];

        for (int i = 0; i < 4; i++) {
            rightPlayer[i] = Game.spriteSheet.getSprite(32 + (i * 16), 0, 16, 16);
            leftPlayer[i] = Game.spriteSheet.getSprite(32 + (i * 16), 16, 16, 16);
        }
    }

    @Override
    public void tick() {
        moved = false;
        if (isRight() && World.isFree((int)( this.getX() + this.getSpeed()), (int) this.getY())) {
            moved = true;
            dir = dirRightValue;
            this.setX(this.getX() + this.getSpeed());
        }
        if (isLeft() && World.isFree((int)(this.getX() - this.getSpeed()), (int) this.getY())) {
            moved = true;
            dir = dirLeftValue;
            this.setX(this.getX() - this.getSpeed());
        }
        if (isUp() && World.isFree((int) this.getX(), (int) (this.getY() - this.getSpeed()))) {
            moved = true;
            this.setY(this.getY() - this.getSpeed());
        }
        if (isDown() && World.isFree((int)this.getX(), (int) (this.getY() + this.getSpeed()))) {
            moved = true;
            this.setY(this.getY() + this.getSpeed());
        }

        if (moved) {
            frames ++;
            //Atualiza a cada 5 ticks
            if (frames == maxFrames) {
                frames = 0;
                index++;
                if (index > maxIndex) {
                    index = 0;
                }
            }
        } else {
            index = 0;
        }

        Camera.x = Camera.clamp((((int) getX()) - Game.WIDTH/2), 0, World.WIDTH * 16 - Game.WIDTH);
        Camera.y = Camera.clamp((((int) getY()) - Game.HEIGHT/2), 0, World.HEIGHT  * 16 - Game.HEIGHT);

    }

    @Override
    public void render(Graphics g) {
        if (dir == dirRightValue) {
            g.drawImage(rightPlayer[index], (int) this.getX() - Camera.x, (int) this.getY() - Camera.y, null);
        } else if (dir == dirLeftValue) {
            g.drawImage(leftPlayer[index], (int) this.getX() - Camera.x, (int) this.getY() - Camera.y, null);
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
