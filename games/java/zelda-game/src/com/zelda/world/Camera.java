package com.zelda.world;

public class Camera {

    public static int x = 0;
    public static int y = 0;

    public static int clamp(int currentPosition, int minPosition, int maxPosition) {
        if (currentPosition < minPosition) {
            currentPosition = minPosition;
        }
        if (currentPosition > maxPosition) {
            currentPosition = maxPosition;
        }
        return currentPosition;
    }

}
