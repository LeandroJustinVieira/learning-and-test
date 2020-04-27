package com.zelda.entities;

import com.zelda.main.Game;
import com.zelda.world.Camera;
import com.zelda.world.World;

import java.awt.*;
import java.awt.image.BufferedImage;

public class Enemy extends Entity {

    private double speed = 0.5;

    public Enemy(int x, int y, int width, int height, BufferedImage bufferedImage) {
        super(x, y, width, height, bufferedImage);
    }

    @Override
    public void tick() {
        //Metudo random para deixar os inimigos com o movimento aleatório,
        //Cria uma dificuldade maior para os inimigos se colidirem, para jogos maiores com muitos inimigos é uma boa opção
        if (Game.random.nextInt(100) < 80) {
            if (this.getX() < Game.player.getX()
                    && World.isFree((int) (this.getX() + this.getSpeed()), (int) (this.getY()))
                    && !isColliding((int) (this.getX() + this.getSpeed()), (int) (this.getY()))) {
                setX(this.getX() + this.getSpeed());
            } else if (this.getX() > Game.player.getX()
                    && World.isFree((int) (this.getX() - this.getSpeed()), (int) (this.getY()))
                    && !isColliding((int) (this.getX() - this.getSpeed()), (int) (this.getY()))) {
                setX(this.getX() - this.getSpeed());
            }

            if (this.getY() < Game.player.getY()
                    && World.isFree((int) (this.getX()), (int) (this.getY() + this.getSpeed()))
                    && !isColliding((int) (this.getX()), (int) (this.getY() + this.getSpeed()))) {
                setY(this.getY() + this.getSpeed());
            } else if (this.getY() > Game.player.getY()
                    && World.isFree((int) (this.getX()), (int) (this.getY() - this.getSpeed()))
                    && !isColliding((int) (this.getX()), (int) (this.getY() - this.getSpeed()))) {
                setY(this.getY() - this.getSpeed());
            }
        }
    }


    @Override
    public void render(Graphics g) {
        g.setColor(new Color(250, 250, 250, 25));
//        g.fillRect(((int) this.getX()) - Camera.x, ((int) this.getY()) - Camera.y, World.TILE_SIZE, World.TILE_SIZE);
        g.fillOval(((int) this.getX()) - Camera.x - 3, ((int) this.getY()) - Camera.y + 1, World.TILE_SIZE + 5, World.TILE_SIZE + 5);
        super.render(g);
    }

    //Validação com rectangle de colisão
    private boolean isColliding(int xNext, int yNext) {
        Rectangle enemyCurrent = new Rectangle(xNext, yNext, World.TILE_SIZE, World.TILE_SIZE);
        for (int i = 0; i < Game.enemies.size(); i++) {
            Enemy target = Game.enemies.get(i);
            if (this == target) {
                continue;
            }
            Rectangle targetRect = new Rectangle((int) target.getX(), (int) target.getY(), World.TILE_SIZE, World.TILE_SIZE);
            if (enemyCurrent.intersects(targetRect)) {
                return true;
            }
        }
        return false;
    }

    public double getSpeed() {
        return speed;
    }

    public void setSpeed(double speed) {
        this.speed = speed;
    }
}
