package com.zelda.world;

import com.zelda.entities.*;
import com.zelda.main.Game;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;

public class World {

    private Tile[] tiles;
    public static int WIDTH, HEIGHT;


    public World(String path) {

        final int COLOR_WALL = 0xFFFFFFFF;
        final int COLOR_FLOOR = 0xFF000000;
        final int COLOR_ENEMY = 0xFFFF0000;
        final int COLOR_WEAPON = 0xFFFF8200;
        final int COLOR_PLAYER = 0xFF0000FF;
        final int COLOR_BULLET = 0xFFFFFF00;
        final int COLOR_LIFE_PACK = 0xFF00FF00;

        try {
            BufferedImage map = ImageIO.read(getClass().getResource(path));
            WIDTH = map.getWidth();
            HEIGHT = map.getHeight();
            int qtdPixelMap = map.getWidth() * map.getHeight();
            int[] pixels = new int[qtdPixelMap];
            tiles = new Tile[qtdPixelMap];
            map.getRGB(0, 0, map.getWidth(), map.getHeight(), pixels, 0, map.getWidth());
            for (int xx = 0; xx < WIDTH; xx++) {
                for (int yy = 0; yy < HEIGHT; yy++) {
                    int pixel = pixels[xx + (yy * map.getWidth())];

                    switch (pixel) {
                        case COLOR_WALL:
                            tiles[xx + (yy * WIDTH)] = new FloorTile(Tile.TILE_WALL, xx * 16, yy * 16);
                            break;
                        case COLOR_WEAPON:
                            Game.entites.add(new Weapon(xx * 16, yy * 16, 16 ,16, Entity.ENTITY_WEAPON));
                            tiles[xx + (yy * WIDTH)] = new FloorTile(Tile.TILE_FLOOR, xx * 16, yy * 16);
                            break;
                        case COLOR_LIFE_PACK:
                            Game.entites.add(new LifePack(xx * 16, yy * 16, 16 ,16, Entity.ENTITY_LIFE_PACK));
                            tiles[xx + (yy * WIDTH)] = new FloorTile(Tile.TILE_FLOOR, xx * 16, yy * 16);
                            break;
                        case COLOR_BULLET:
                            Game.entites.add(new Bullet(xx * 16, yy * 16, 16 ,16, Entity.ENTITY_BULLET));
                            tiles[xx + (yy * WIDTH)] = new FloorTile(Tile.TILE_FLOOR, xx * 16, yy * 16);
                            break;
                        case COLOR_ENEMY:
                            Game.entites.add(new Enemy(xx * 16, yy * 16, 16 ,16, Entity.ENTITY_ENEMY));
                            tiles[xx + (yy * WIDTH)] = new FloorTile(Tile.TILE_FLOOR, xx * 16, yy * 16);
                            break;
                        case COLOR_PLAYER:
                            tiles[xx + (yy * WIDTH)] = new FloorTile(Tile.TILE_FLOOR, xx * 16, yy * 16);
                            Game.player.setX(xx * 16);
                            Game.player.setY(yy * 16);
                            break;
                        default:
                            tiles[xx + (yy * WIDTH)] = new FloorTile(Tile.TILE_FLOOR, xx * 16, yy * 16);
                    }
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void render(Graphics g) {
        for (int xx = 0; xx < WIDTH; xx++) {
            for (int yy = 0; yy < HEIGHT; yy++) {
                Tile tile = tiles[xx + (yy * WIDTH)];
                tile.render(g);
            }
        }
    }


}
