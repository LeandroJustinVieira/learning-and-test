package com.frame;

import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferStrategy;
import java.awt.image.BufferedImage;

public class Game extends Canvas implements Runnable {

    public static JFrame frame;
    private Thread thread;
    private boolean isRunning = true;

    private final int WIDTH = 240;
    private final int HEIGHT = 160;
    private final int SCALE = 3;

    private BufferedImage image;

    private Spritesheet spritesheet;
    private BufferedImage[] player;
    private int frames = 0;
    private int maxframes = 10;
    private int curAnimation = 0, maxAnimation = 4;

    private int x = 20;
    private boolean right = true;


    public Game() {
        spritesheet = new Spritesheet("/sprintsheet.png");
        player = new BufferedImage[4];

        player[0] = spritesheet.getSprite(0,0,16,16);
        player[1] = spritesheet.getSprite(16,0,16,16);
        player[2] = spritesheet.getSprite(32,0,16,16);
        player[3] = spritesheet.getSprite(48,0,16,16);

        this.setPreferredSize(new Dimension(WIDTH * SCALE, HEIGHT * SCALE));
        this.initFrame();

        //Criando fundo para a janela
        image = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);

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
        isRunning = false;
        try {
            thread.join();
        } catch (InterruptedException ex) {
        }

    }

    public static void main(String args[]) {
        Game game = new Game();
        game.start();
    }

    public void tick() {

        frames++;
        if (frames > maxframes) {
            frames = 0;
            curAnimation ++;
            if (curAnimation >= maxAnimation) {
                curAnimation = 0;
            }
        }

        if (x == 160 || x == 10) {
            right = !right;
        }
        if (right) {
            x++;
        } else {
            x--;
        }
    }

    public void render() {
        BufferStrategy bs = this.getBufferStrategy();
        if (bs == null) {
            this.createBufferStrategy(3);
            return;
        }

        //Renderizando background fundo preto, sempre é renderizando para sobreescrever todas as animanções
        Graphics g = image.getGraphics();
        g.setColor(new Color(19, 19, 19));
        g.fillRect(0, 0, WIDTH, HEIGHT);


        //Renderizando retangulo
        g.setColor(Color.CYAN);
        g.fillRect(40, 20, 30, 30);

        //Renderizando bola
        g.setColor(Color.RED);
        g.fillOval(100, 20, 30, 30);

        //Renderizando texto
        g.setFont(new Font("Arial", Font.BOLD, 10));
        g.setColor(Color.WHITE);
        g.drawString("Eu sou um player!", 10, 10);

        //Renderização do jogo
        g.drawImage(player[curAnimation], x, 120, null);

        g.drawImage(player[curAnimation], 120, 90, null);

        Graphics2D g2 = (Graphics2D) g;
        g2.rotate(Math.toRadians(180), 90+8, 90+8);
        g2.drawImage(player[curAnimation], 90, 90, null);


        g.dispose();
        g = bs.getDrawGraphics();
        g.drawImage(image, 0, 0, WIDTH * SCALE, HEIGHT * SCALE, null);
        bs.show();
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
                frames++;
                delta--;
            }

            if (System.currentTimeMillis() - timer >= 1000) {
                System.out.println("FPS: " + frames);
                frames = 0;
                timer = System.currentTimeMillis();
            }
        }

        stop();
    }
}
