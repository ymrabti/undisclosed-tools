#include <stdio.h>
#include <math.h>
#include <string.h>
#include <windows.h> // For Sleep on Windows

#define WIDTH 80
#define HEIGHT 24
// gcc cube.c -o cube && cube

float A = 0, B = 0;

void clearScreen()
{
    printf("\x1b[H");
}

int main()
{
    float cube[8][3] = {
        {-1, -1, -1}, {1, -1, -1}, {1, 1, -1}, {-1, 1, -1}, {-1, -1, 1}, {1, -1, 1}, {1, 1, 1}, {-1, 1, 1}};

    int edges[12][2] = {
        {0, 1}, {1, 2}, {2, 3}, {3, 0}, {4, 5}, {5, 6}, {6, 7}, {7, 4}, {0, 4}, {1, 5}, {2, 6}, {3, 7}};

    for (;;)
    {
        char screen[WIDTH * HEIGHT];
        memset(screen, ' ', WIDTH * HEIGHT);

        for (int i = 0; i < 8; i++)
        {
            float x = cube[i][0];
            float y = cube[i][1];
            float z = cube[i][2];

            // Rotate around X and Z
            float x1 = x * cos(A) - z * sin(A);
            float z1 = x * sin(A) + z * cos(A);
            float y1 = y * cos(B) - z1 * sin(B);
            float z2 = y * sin(B) + z1 * cos(B);

            // Perspective projection
            float f = 10 / (z2 + 20);
            int xp = (int)(x1 * f * 10 + WIDTH / 2);
            int yp = (int)(y1 * f * 10 + HEIGHT / 2);

            if (xp >= 0 && xp < WIDTH && yp >= 0 && yp < HEIGHT)
                screen[yp * WIDTH + xp] = '#';
        }

        // Draw cube edges
        for (int e = 0; e < 12; e++)
        {
            int a = edges[e][0];
            int b = edges[e][1];

            float ax = cube[a][0], ay = cube[a][1], az = cube[a][2];
            float bx = cube[b][0], by = cube[b][1], bz = cube[b][2];

            float ax1 = ax * cos(A) - az * sin(A);
            float az1 = ax * sin(A) + az * cos(A);
            float ay1 = ay * cos(B) - az1 * sin(B);
            float az2 = ay * sin(B) + az1 * cos(B);

            float bx1 = bx * cos(A) - bz * sin(A);
            float bz1 = bx * sin(A) + bz * cos(A);
            float by1 = by * cos(B) - bz1 * sin(B);
            float bz2 = by * sin(B) + bz1 * cos(B);

            float fa = 10 / (az2 + 20);
            float fb = 10 / (bz2 + 20);

            int x0 = (int)(ax1 * fa * 10 + WIDTH / 2);
            int y0 = (int)(ay1 * fa * 10 + HEIGHT / 2);
            int x1 = (int)(bx1 * fb * 10 + WIDTH / 2);
            int y1 = (int)(by1 * fb * 10 + HEIGHT / 2);

            // Bresenham's line (simplified)
            int dx = abs(x1 - x0), dy = abs(y1 - y0);
            int sx = x0 < x1 ? 1 : -1;
            int sy = y0 < y1 ? 1 : -1;
            int err = dx - dy;

            while (1)
            {
                if (x0 >= 0 && x0 < WIDTH && y0 >= 0 && y0 < HEIGHT)
                    screen[y0 * WIDTH + x0] = '#';
                if (x0 == x1 && y0 == y1)
                    break;
                int e2 = 2 * err;
                if (e2 > -dy)
                {
                    err -= dy;
                    x0 += sx;
                }
                if (e2 < dx)
                {
                    err += dx;
                    y0 += sy;
                }
            }
        }

        clearScreen();
        for (int i = 0; i < WIDTH * HEIGHT; i++)
        {
            putchar(i % WIDTH ? screen[i] : '\n');
        }

        A += 0.05;
        B += 0.03;
        Sleep(50);
    }

    return 0;
}
