package com.zelda.world;

import com.zelda.entities.*;
import com.zelda.main.Game;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;

public class World {

    public static Tile[] tiles;
    public static int WIDTH, HEIGHT;
    public static final int TILE_SIZE = 16;

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
                            tiles[xx + (yy * WIDTH)] = new WallTile(Tile.TILE_WALL, xx * 16, yy * 16);
                            break;
                        case COLOR_WEAPON:
                            Game.entites.add(new Weapon(xx * 16, yy * 16, 16, 16, Entity.ENTITY_WEAPON));
                            tiles[xx + (yy * WIDTH)] = new FloorTile(Tile.TILE_FLOOR, xx * 16, yy * 16);
                            break;
                        case COLOR_LIFE_PACK:
                            Game.entites.add(new LifePack(xx * 16, yy * 16, 16, 16, Entity.ENTITY_LIFE_PACK));
                            tiles[xx + (yy * WIDTH)] = new FloorTile(Tile.TILE_FLOOR, xx * 16, yy * 16);
                            break;
                        case COLOR_BULLET:
                            Game.entites.add(new Bullet(xx * 16, yy * 16, 16, 16, Entity.ENTITY_BULLET));
                            tiles[xx + (yy * WIDTH)] = new FloorTile(Tile.TILE_FLOOR, xx * 16, yy * 16);
                            break;
                        case COLOR_ENEMY:
                            Enemy enemy = new Enemy(xx * 16, yy * 16, 16, 16, Entity.ENTITY_ENEMY);
                            Game.enemies.add(enemy);
                            Game.entites.add(enemy);
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

    public static boolean isFree(int xNext, int yNext) {
        int x1 = xNext / TILE_SIZE;
        int y1 = yNext / TILE_SIZE;

        int x2 = (xNext + TILE_SIZE - 1) / TILE_SIZE;
        int y2 = yNext / TILE_SIZE;

        int x3 = xNext / TILE_SIZE;
        int y3 = (yNext + TILE_SIZE - 1) / TILE_SIZE;

        int x4 = (xNext + TILE_SIZE - 1) / TILE_SIZE;
        int y4 = (yNext + TILE_SIZE - 1) / TILE_SIZE;

        return !((tiles[x1 + (y1 * World.WIDTH)] instanceof WallTile) ||
                (tiles[x2 + (y2 * World.WIDTH)] instanceof WallTile) ||
                (tiles[x3 + (y3 * World.WIDTH)] instanceof WallTile) ||
                (tiles[x4 + (y4 * World.WIDTH)] instanceof WallTile));

    }

    public void render(Graphics g) {

        //Renderizando somente o que está na visão da camera do jogador;
        int xStart = Camera.x / 16;
        int yStart = Camera.y / 16;
        int xFinal = xStart + (Game.WIDTH / 16);
        int yFinal = yStart + (Game.HEIGHT / 16);

        for (int xx = xStart; xx <= xFinal; xx++) {
            for (int yy = yStart; yy <= yFinal; yy++) {
                if (xx < 0 || yy < 0 || xx >= WIDTH || yy >= HEIGHT) {
                    continue;
                }
                Tile tile = tiles[xx + (yy * WIDTH)];
                tile.render(g);
            }
        }
    }


}
