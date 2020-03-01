package com.frame;

import javax.swing.*;
import java.awt.*;

public class Game extends Canvas implements Runnable {

    public static JFrame frame;
    private Thread thread;
    private boolean isRunning = true;

    private final int WIDTH = 160;
    private final int HEIGHT = 120;
    private final int SCALE = 3;

    public Game() {
        this.setPreferredSize(new Dimension(WIDTH * SCALE, HEIGHT * SCALE));
        this.initFrame();

    }

    public void initFrame() {
        frame = new JFrame("FRAME CANVAS");
        frame.add(this);
        frame.setResizable(false);
        frame.pack();
        frame.setLocationRelativeTo(null);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }


    public synchronized void start() {
        this.thread = new Thread(this);
        this.isRunning = true;
        this.thread.start();
    }


    public synchronized void stop() {

    }

    public static void main(String args[]) {
        Game game = new Game();
        game.start();
    }

    public void tick() {

    }

    public void render() {

    }


    @Override
    public void run() {

        //Lógica de atualização (tick) e renderização (render) de acordo com o FPS (60FPS)
        long lastTime = System.nanoTime();
        double amountOfTicks = 60.0;
        double ns = 1000000000 / amountOfTicks;
        double delta = 0;
        int frames = 0;
        double timer = System.currentTimeMillis();
        while (isRunning) {
            long now = System.nanoTime();
            delta += (now - lastTime) / ns;
            lastTime = now;
            if (delta >= 1) {
                tick();
                render();
                frames ++;
                delta --;
            }

            if (System.currentTimeMillis() - timer >= 1000) {
                System.out.println("FPS: " + frames);
                frames = 0;
                timer = System.currentTimeMillis();
            }
        }
    }
}
