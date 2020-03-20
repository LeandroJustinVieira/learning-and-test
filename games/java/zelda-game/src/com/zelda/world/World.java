package com.zelda.world;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;

public class World {

    private Tile[] tiles;
    public static int WIDTH, HEIGHT;

    public World(String path) {
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
                        case 0xFFFFFFFF:
                            //Parede - branco
                            tiles[xx + (yy * WIDTH)] = new FloorTile(Tile.TILE_WALL, xx * 16, yy * 16);
                            break;
                        case 0xFF000000:
                            //Chão - preto
                            tiles[xx + (yy * WIDTH)] = new FloorTile(Tile.TILE_FLOOR, xx * 16, yy * 16);
                            break;
                        case 0xFF0000FF:
                            //Player - azul
                            tiles[xx + (yy * WIDTH)] = new FloorTile(Tile.TILE_FLOOR, xx * 16, yy * 16);
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
