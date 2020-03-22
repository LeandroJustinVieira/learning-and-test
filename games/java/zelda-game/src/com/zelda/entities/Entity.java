package com.zelda.entities;

import com.zelda.main.Game;

import java.awt.*;
import java.awt.image.BufferedImage;

public abstract class Entity {

    public static BufferedImage ENTITY_LIFE_PACK = Game.spriteSheet.getSprite(6 * 16, 0, 16, 16);
    public static BufferedImage ENTITY_WEAPON = Game.spriteSheet.getSprite(7 * 16, 0, 16, 16);
    public static BufferedImage ENTITY_BULLET = Game.spriteSheet.getSprite(6 * 16, 16, 16, 16);
    public static BufferedImage ENTITY_ENEMY = Game.spriteSheet.getSprite(7 * 16, 16, 16, 16);

    private double x;
    private double y;
    private int width;
    private int height;

    private BufferedImage sprite;

    public Entity(double x, double y, int width, int height, BufferedImage sprite) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
    }

    public abstract void tick();

    public void render(Graphics g) {
        g.drawImage(this.getSprite(), (int) this.getX(), (int) this.getY(), null);
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public BufferedImage getSprite() {
        return sprite;
    }

    public void setSprite(BufferedImage sprite) {
        this.sprite = sprite;
    }
}
