import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

type CalculationMethod = 'weight-milk' | 'milk-fat';
type LactationStage = 'early' | 'late';

interface NRCData {
  milk: number;
  fat: number;
  protein: number;
  dmi: number;
  nel: number;
  rdp_rup: number;
}

const earlyLactationData = [
 { milk: 5, fat: 4, protein: 3.5, dmi: 3.13, nel: 6.47, rdp_rup: 563 },
{ milk: 6, fat: 4, protein: 3.5, dmi: 3.76, nel: 7.75, rdp_rup: 676 },
{ milk: 7, fat: 4, protein: 3.5, dmi: 4.39, nel: 9.03, rdp_rup: 789 },
{ milk: 8, fat: 4, protein: 3.5, dmi: 5.01, nel: 10.31, rdp_rup: 902 },
{ milk: 9, fat: 4, protein: 3.5, dmi: 5.64, nel: 11.59, rdp_rup: 1014 },
{ milk: 10, fat: 4, protein: 3.5, dmi: 6.27, nel: 12.87, rdp_rup: 1127 },
{ milk: 11, fat: 4, protein: 3.5, dmi: 6.9, nel: 14.15, rdp_rup: 1240 },
{ milk: 12, fat: 4, protein: 3.5, dmi: 7.52, nel: 15.43, rdp_rup: 1353 },
{ milk: 13, fat: 4, protein: 3.5, dmi: 8.15, nel: 16.71, rdp_rup: 1466 },
{ milk: 14, fat: 4, protein: 3.5, dmi: 8.78, nel: 17.99, rdp_rup: 1579 },
{ milk: 15, fat: 4, protein: 3.5, dmi: 9.4, nel: 19.4, rdp_rup: 1690 },
{ milk: 16, fat: 4, protein: 3.5, dmi: 10.03, nel: 20.69, rdp_rup: 1803 },
{ milk: 17, fat: 4, protein: 3.5, dmi: 10.66, nel: 21.97, rdp_rup: 1916 },
{ milk: 18, fat: 4, protein: 3.5, dmi: 11.29, nel: 23.25, rdp_rup: 2029 },
{ milk: 19, fat: 4, protein: 3.5, dmi: 11.91, nel: 24.53, rdp_rup: 2142 },
{ milk: 20, fat: 4, protein: 3.5, dmi: 12.54, nel: 25.81, rdp_rup: 2255 },
{ milk: 21, fat: 4, protein: 3.5, dmi: 13.17, nel: 26.6, rdp_rup: 2186 },
{ milk: 22, fat: 4, protein: 3.5, dmi: 13.8, nel: 27.87, rdp_rup: 2290 },
{ milk: 23, fat: 4, protein: 3.5, dmi: 14.42, nel: 29.13, rdp_rup: 2395 },
{ milk: 24, fat: 4, protein: 3.5, dmi: 15.05, nel: 30.4, rdp_rup: 2499 },
{ milk: 25, fat: 4, protein: 3.5, dmi: 15.68, nel: 31.67, rdp_rup: 2603 },
{ milk: 26, fat: 4, protein: 3.5, dmi: 16.31, nel: 32.93, rdp_rup: 2708 },
{ milk: 27, fat: 4, protein: 3.5, dmi: 16.93, nel: 34.2, rdp_rup: 2812 },
{ milk: 28, fat: 4, protein: 3.5, dmi: 17.56, nel: 35.47, rdp_rup: 2916 },
{ milk: 29, fat: 4, protein: 3.5, dmi: 18.19, nel: 36.73, rdp_rup: 3021 },
{ milk: 30, fat: 4, protein: 3.5, dmi: 18.81, nel: 38, rdp_rup: 3125 },
{ milk: 31, fat: 4, protein: 3.5, dmi: 19.44, nel: 39.27, rdp_rup: 3229 },
{ milk: 32, fat: 4, protein: 3.5, dmi: 20.07, nel: 40.53, rdp_rup: 3334 },
{ milk: 33, fat: 4, protein: 3.5, dmi: 20.7, nel: 41.8, rdp_rup: 3438 },
{ milk: 34, fat: 4, protein: 3.5, dmi: 21.32, nel: 43.07, rdp_rup: 3542 },
{ milk: 35, fat: 4, protein: 3.5, dmi: 21.95, nel: 44.33, rdp_rup: 3647 },
{ milk: 36, fat: 4, protein: 3.5, dmi: 22.58, nel: 45.6, rdp_rup: 3751 },
{ milk: 37, fat: 4, protein: 3.5, dmi: 23.21, nel: 46.87, rdp_rup: 3855 },
{ milk: 38, fat: 4, protein: 3.5, dmi: 23.83, nel: 48.13, rdp_rup: 3960 },
{ milk: 39, fat: 4, protein: 3.5, dmi: 24.46, nel: 49.4, rdp_rup: 4064 },
{ milk: 40, fat: 4, protein: 3.5, dmi: 25.09, nel: 50.67, rdp_rup: 4168 },
  { milk: 5, fat: 3, protein: 4, dmi: 3.13, nel: 6.6, rdp_rup: 606 },
{ milk: 6, fat: 3, protein: 4, dmi: 3.76, nel: 7.92, rdp_rup: 728 },
{ milk: 7, fat: 3, protein: 4, dmi: 4.39, nel: 9.24, rdp_rup: 850 },
{ milk: 8, fat: 3, protein: 4, dmi: 5.01, nel: 10.56, rdp_rup: 972 },
{ milk: 9, fat: 3, protein: 4, dmi: 5.64, nel: 11.88, rdp_rup: 1093 },
{ milk: 10, fat: 3, protein: 4, dmi: 6.27, nel: 13.2, rdp_rup: 1215 },
{ milk: 11, fat: 3, protein: 4, dmi: 6.9, nel: 14.52, rdp_rup: 1337 },
{ milk: 12, fat: 3, protein: 4, dmi: 7.52, nel: 15.84, rdp_rup: 1459 },
{ milk: 13, fat: 3, protein: 4, dmi: 8.15, nel: 17.16, rdp_rup: 1581 },
{ milk: 14, fat: 3, protein: 4, dmi: 8.78, nel: 18.48, rdp_rup: 1703 },
{ milk: 15, fat: 3, protein: 4, dmi: 9.4, nel: 19.8, rdp_rup: 1820 },
{ milk: 16, fat: 3, protein: 4, dmi: 10.03, nel: 21.12, rdp_rup: 1942 },
{ milk: 17, fat: 3, protein: 4, dmi: 10.66, nel: 22.44, rdp_rup: 2064 },
{ milk: 18, fat: 3, protein: 4, dmi: 11.29, nel: 23.76, rdp_rup: 2186 },
{ milk: 19, fat: 3, protein: 4, dmi: 11.91, nel: 25.08, rdp_rup: 2308 },
{ milk: 20, fat: 3, protein: 4, dmi: 12.54, nel: 26.4, rdp_rup: 2429 },
{ milk: 21, fat: 3, protein: 4, dmi: 13.16, nel: 24.94, rdp_rup: 2548 },
{ milk: 22, fat: 3, protein: 4, dmi: 13.79, nel: 26.12, rdp_rup: 2668 },
{ milk: 23, fat: 3, protein: 4, dmi: 14.42, nel: 27.3, rdp_rup: 2789 },
{ milk: 24, fat: 3, protein: 4, dmi: 15.05, nel: 28.48, rdp_rup: 2910 },
{ milk: 25, fat: 3, protein: 4, dmi: 15.68, nel: 29.66, rdp_rup: 3031 },
{ milk: 26, fat: 3, protein: 4, dmi: 16.31, nel: 30.84, rdp_rup: 3151 },
{ milk: 27, fat: 3, protein: 4, dmi: 16.94, nel: 32.02, rdp_rup: 3272 },
{ milk: 28, fat: 3, protein: 4, dmi: 17.57, nel: 33.2, rdp_rup: 3393 },
{ milk: 29, fat: 3, protein: 4, dmi: 18.2, nel: 34.38, rdp_rup: 3514 },
{ milk: 30, fat: 3, protein: 4, dmi: 18.83, nel: 35.56, rdp_rup: 3634 },
{ milk: 31, fat: 3, protein: 4, dmi: 19.47, nel: 36.74, rdp_rup: 3755 },
{ milk: 32, fat: 3, protein: 4, dmi: 20.1, nel: 37.92, rdp_rup: 3876 },
{ milk: 33, fat: 3, protein: 4, dmi: 20.73, nel: 39.1, rdp_rup: 3997 },
{ milk: 34, fat: 3, protein: 4, dmi: 21.36, nel: 40.28, rdp_rup: 4117 },
{ milk: 35, fat: 3, protein: 4, dmi: 21.99, nel: 41.46, rdp_rup: 4238 },
{ milk: 36, fat: 3, protein: 4, dmi: 22.62, nel: 42.64, rdp_rup: 4359 },
{ milk: 37, fat: 3, protein: 4, dmi: 23.25, nel: 43.82, rdp_rup: 4479 },
{ milk: 38, fat: 3, protein: 4, dmi: 23.88, nel: 45, rdp_rup: 4600 },
{ milk: 39, fat: 3, protein: 4, dmi: 24.51, nel: 46.18, rdp_rup: 4721 },
{ milk: 40, fat: 3, protein: 4, dmi: 25.13, nel: 47.36, rdp_rup: 4842 },
{ milk: 5, fat: 3, protein: 3, dmi: 3.13, nel: 6.33, rdp_rup: 520 },
{ milk: 6, fat: 3, protein: 3, dmi: 3.76, nel: 7.6, rdp_rup: 624 },
{ milk: 7, fat: 3, protein: 3, dmi: 4.39, nel: 8.87, rdp_rup: 728 },
{ milk: 8, fat: 3, protein: 3, dmi: 5.01, nel: 10.13, rdp_rup: 833 },
{ milk: 9, fat: 3, protein: 3, dmi: 5.64, nel: 11.4, rdp_rup: 937 },
{ milk: 10, fat: 3, protein: 3, dmi: 6.27, nel: 12.67, rdp_rup: 1041 },
{ milk: 11, fat: 3, protein: 3, dmi: 6.9, nel: 13.93, rdp_rup: 1146 },
{ milk: 12, fat: 3, protein: 3, dmi: 7.52, nel: 15.2, rdp_rup: 1250 },
{ milk: 13, fat: 3, protein: 3, dmi: 8.15, nel: 16.47, rdp_rup: 1354 },
{ milk: 14, fat: 3, protein: 3, dmi: 8.78, nel: 17.73, rdp_rup: 1459 },
{ milk: 15, fat: 3, protein: 3, dmi: 9.4, nel: 19, rdp_rup: 1560 },
{ milk: 16, fat: 3, protein: 3, dmi: 10.03, nel: 20.27, rdp_rup: 1664 },
{ milk: 17, fat: 3, protein: 3, dmi: 10.66, nel: 21.53, rdp_rup: 1769 },
{ milk: 18, fat: 3, protein: 3, dmi: 11.29, nel: 22.8, rdp_rup: 1873 },
{ milk: 19, fat: 3, protein: 3, dmi: 11.91, nel: 24.07, rdp_rup: 1977 },
{ milk: 20, fat: 3, protein: 3, dmi: 12.53, nel: 22.33, rdp_rup: 1959 },
{ milk: 21, fat: 3, protein: 3, dmi: 13.16, nel: 23.51, rdp_rup: 2057 },
{ milk: 22, fat: 3, protein: 3, dmi: 13.79, nel: 24.68, rdp_rup: 2154 },
{ milk: 23, fat: 3, protein: 3, dmi: 14.42, nel: 25.86, rdp_rup: 2252 },
{ milk: 24, fat: 3, protein: 3, dmi: 15.05, nel: 27.04, rdp_rup: 2350 },
{ milk: 25, fat: 3, protein: 3, dmi: 15.68, nel: 28.21, rdp_rup: 2448 },
{ milk: 26, fat: 3, protein: 3, dmi: 16.31, nel: 29.39, rdp_rup: 2545 },
{ milk: 27, fat: 3, protein: 3, dmi: 16.94, nel: 30.57, rdp_rup: 2643 },
{ milk: 28, fat: 3, protein: 3, dmi: 17.57, nel: 31.75, rdp_rup: 2741 },
{ milk: 29, fat: 3, protein: 3, dmi: 18.2, nel: 32.93, rdp_rup: 2839 },
{ milk: 30, fat: 3, protein: 3, dmi: 18.83, nel: 34.11, rdp_rup: 2936 },
{ milk: 31, fat: 3, protein: 3, dmi: 19.47, nel: 35.28, rdp_rup: 3034 },
{ milk: 32, fat: 3, protein: 3, dmi: 20.1, nel: 36.46, rdp_rup: 3132 },
{ milk: 33, fat: 3, protein: 3, dmi: 20.73, nel: 37.64, rdp_rup: 3230 },
{ milk: 34, fat: 3, protein: 3, dmi: 21.36, nel: 38.82, rdp_rup: 3327 },
{ milk: 35, fat: 3, protein: 3, dmi: 21.99, nel: 40, rdp_rup: 3425 },
{ milk: 36, fat: 3, protein: 3, dmi: 22.62, nel: 41.18, rdp_rup: 3523 },
{ milk: 37, fat: 3, protein: 3, dmi: 23.25, nel: 42.35, rdp_rup: 3620 },
{ milk: 38, fat: 3, protein: 3, dmi: 23.88, nel: 43.53, rdp_rup: 3718 },
{ milk: 39, fat: 3, protein: 3, dmi: 24.51, nel: 44.71, rdp_rup: 3816 },
{ milk: 40, fat: 3, protein: 3, dmi: 25.13, nel: 45.89, rdp_rup: 3914 },
{ milk: 5, fat: 4, protein: 3, dmi: 3.13, nel: 6.47, rdp_rup: 563 },
{ milk: 6, fat: 4, protein: 3, dmi: 3.76, nel: 7.75, rdp_rup: 660 },
{ milk: 7, fat: 4, protein: 3, dmi: 4.39, nel: 9.03, rdp_rup: 757 },
{ milk: 8, fat: 4, protein: 3, dmi: 5.02, nel: 10.31, rdp_rup: 854 },
{ milk: 9, fat: 4, protein: 3, dmi: 5.65, nel: 11.59, rdp_rup: 950 },
{ milk: 10, fat: 4, protein: 3, dmi: 6.28, nel: 12.87, rdp_rup: 1047 },
{ milk: 11, fat: 4, protein: 3, dmi: 6.91, nel: 14.15, rdp_rup: 1144 },
{ milk: 12, fat: 4, protein: 3, dmi: 7.54, nel: 15.43, rdp_rup: 1241 },
{ milk: 13, fat: 4, protein: 3, dmi: 8.17, nel: 16.71, rdp_rup: 1338 },
{ milk: 14, fat: 4, protein: 3, dmi: 8.8, nel: 17.99, rdp_rup: 1435 },
{ milk: 15, fat: 4, protein: 3, dmi: 9.43, nel: 19.27, rdp_rup: 1532 },
{ milk: 16, fat: 4, protein: 3, dmi: 10.06, nel: 20.55, rdp_rup: 1629 },
{ milk: 17, fat: 4, protein: 3, dmi: 10.69, nel: 21.83, rdp_rup: 1725 },
{ milk: 18, fat: 4, protein: 3, dmi: 11.32, nel: 23.11, rdp_rup: 1822 },
{ milk: 19, fat: 4, protein: 3, dmi: 11.95, nel: 24.39, rdp_rup: 1919 },
{ milk: 20, fat: 4, protein: 3, dmi: 12.58, nel: 25.67, rdp_rup: 2016 },
{ milk: 21, fat: 4, protein: 3, dmi: 13.21, nel: 26.95, rdp_rup: 2027 },
{ milk: 22, fat: 4, protein: 3, dmi: 13.84, nel: 28.23, rdp_rup: 2121 },
{ milk: 23, fat: 4, protein: 3, dmi: 14.47, nel: 29.51, rdp_rup: 2216 },
{ milk: 24, fat: 4, protein: 3, dmi: 15.1, nel: 30.79, rdp_rup: 2310 },
{ milk: 25, fat: 4, protein: 3, dmi: 15.73, nel: 32.07, rdp_rup: 2404 },
{ milk: 26, fat: 4, protein: 3, dmi: 16.36, nel: 33.35, rdp_rup: 2499 },
{ milk: 27, fat: 4, protein: 3, dmi: 16.99, nel: 34.63, rdp_rup: 2593 },
{ milk: 28, fat: 4, protein: 3, dmi: 17.62, nel: 35.91, rdp_rup: 2687 },
{ milk: 29, fat: 4, protein: 3, dmi: 18.25, nel: 37.19, rdp_rup: 2782 },
{ milk: 30, fat: 4, protein: 3, dmi: 18.88, nel: 38.47, rdp_rup: 2875 },
{ milk: 31, fat: 4, protein: 3, dmi: 19.51, nel: 39.75, rdp_rup: 2969 },
{ milk: 32, fat: 4, protein: 3, dmi: 20.14, nel: 41.03, rdp_rup: 3064 },
{ milk: 33, fat: 4, protein: 3, dmi: 20.77, nel: 42.31, rdp_rup: 3158 },
{ milk: 34, fat: 4, protein: 3, dmi: 21.4, nel: 43.59, rdp_rup: 3252 },
{ milk: 35, fat: 4, protein: 3, dmi: 22.03, nel: 44.87, rdp_rup: 3347 },
{ milk: 36, fat: 4, protein: 3, dmi: 22.66, nel: 46.15, rdp_rup: 3441 },
{ milk: 37, fat: 4, protein: 3, dmi: 23.29, nel: 47.43, rdp_rup: 3535 },
{ milk: 38, fat: 4, protein: 3, dmi: 23.92, nel: 48.71, rdp_rup: 3630 },
{ milk: 39, fat: 4, protein: 3, dmi: 24.55, nel: 49.99, rdp_rup: 3724 },
{ milk: 40, fat: 4, protein: 3, dmi: 25.18, nel: 51.27, rdp_rup: 3818 }
];

const lateLactationData = [
 { milk: 5, fat: 4, protein: 3.5, dmi: 9.3, nel: 12.6, rdp_rup: 1390 },
{ milk: 6, fat: 4, protein: 3.5, dmi: 9.8, nel: 13.36, rdp_rup: 1478 },
{ milk: 7, fat: 4, protein: 3.5, dmi: 10.3, nel: 14.12, rdp_rup: 1566 },
{ milk: 8, fat: 4, protein: 3.5, dmi: 10.9, nel: 14.88, rdp_rup: 1654 },
{ milk: 9, fat: 4, protein: 3.5, dmi: 11.4, nel: 15.64, rdp_rup: 1742 },
{ milk: 10, fat: 4, protein: 3.5, dmi: 12.6, nel: 16.4, rdp_rup: 1850 },
{ milk: 11, fat: 4, protein: 3.5, dmi: 13.1, nel: 17.16, rdp_rup: 1935 },
{ milk: 12, fat: 4, protein: 3.5, dmi: 13.7, nel: 17.92, rdp_rup: 2020 },
{ milk: 13, fat: 4, protein: 3.5, dmi: 14.2, nel: 18.68, rdp_rup: 2105 },
{ milk: 14, fat: 4, protein: 3.5, dmi: 14.7, nel: 19.44, rdp_rup: 2190 },
{ milk: 15, fat: 4, protein: 3.5, dmi: 15.2, nel: 20.2, rdp_rup: 2275 },
{ milk: 16, fat: 4, protein: 3.5, dmi: 16.1, nel: 20.96, rdp_rup: 2370 },
{ milk: 17, fat: 4, protein: 3.5, dmi: 16.6, nel: 21.72, rdp_rup: 2450 },
{ milk: 18, fat: 4, protein: 3.5, dmi: 17.1, nel: 22.48, rdp_rup: 2530 },
{ milk: 19, fat: 4, protein: 3.5, dmi: 17.6, nel: 23.24, rdp_rup: 2610 },
{ milk: 20, fat: 4, protein: 3.5, dmi: 18.1, nel: 24, rdp_rup: 2690 },
{ milk: 21, fat: 4, protein: 3.5, dmi: 18.6, nel: 24.76, rdp_rup: 2770 },
{ milk: 22, fat: 4, protein: 3.5, dmi: 19.1, nel: 25.52, rdp_rup: 2850 },
{ milk: 23, fat: 4, protein: 3.5, dmi: 19.6, nel: 26.28, rdp_rup: 2930 },
{ milk: 24, fat: 4, protein: 3.5, dmi: 20.1, nel: 27.04, rdp_rup: 3010 },
{ milk: 25, fat: 4, protein: 3.5, dmi: 20.6, nel: 27.8, rdp_rup: 3090 },
{ milk: 26, fat: 4, protein: 3.5, dmi: 21.1, nel: 28.56, rdp_rup: 3170 },
{ milk: 27, fat: 4, protein: 3.5, dmi: 21.6, nel: 29.32, rdp_rup: 3250 },
{ milk: 28, fat: 4, protein: 3.5, dmi: 22.1, nel: 30.08, rdp_rup: 3330 },
{ milk: 29, fat: 4, protein: 3.5, dmi: 22.6, nel: 30.84, rdp_rup: 3410 },
{ milk: 30, fat: 4, protein: 3.5, dmi: 23.1, nel: 31.6, rdp_rup: 3490 },
{ milk: 5, fat: 3, protein: 4, dmi: 9, nel: 12.95, rdp_rup: 1380 },
{ milk: 6, fat: 3, protein: 4, dmi: 9.6, nel: 13.74, rdp_rup: 1470 },
{ milk: 7, fat: 3, protein: 4, dmi: 10.1, nel: 14.53, rdp_rup: 1560 },
{ milk: 8, fat: 3, protein: 4, dmi: 10.7, nel: 15.32, rdp_rup: 1650 },
{ milk: 9, fat: 3, protein: 4, dmi: 11.3, nel: 16.11, rdp_rup: 1740 },
{ milk: 10, fat: 3, protein: 4, dmi: 11.8, nel: 16.9, rdp_rup: 1830 },
{ milk: 11, fat: 3, protein: 4, dmi: 12.4, nel: 17.69, rdp_rup: 1920 },
{ milk: 12, fat: 3, protein: 4, dmi: 13, nel: 18.48, rdp_rup: 2010 },
{ milk: 13, fat: 3, protein: 4, dmi: 13.5, nel: 19.27, rdp_rup: 2100 },
{ milk: 14, fat: 3, protein: 4, dmi: 14.1, nel: 20.06, rdp_rup: 2190 },
{ milk: 15, fat: 3, protein: 4, dmi: 14.6, nel: 20.85, rdp_rup: 2280 },
{ milk: 16, fat: 3, protein: 4, dmi: 15.2, nel: 21.64, rdp_rup: 2370 },
{ milk: 17, fat: 3, protein: 4, dmi: 15.8, nel: 22.43, rdp_rup: 2460 },
{ milk: 18, fat: 3, protein: 4, dmi: 16.3, nel: 23.22, rdp_rup: 2550 },
{ milk: 19, fat: 3, protein: 4, dmi: 16.9, nel: 24.01, rdp_rup: 2640 },
{ milk: 20, fat: 3, protein: 4, dmi: 17.5, nel: 24.8, rdp_rup: 2730 },
{ milk: 21, fat: 3, protein: 4, dmi: 18, nel: 25.59, rdp_rup: 2820 },
{ milk: 22, fat: 3, protein: 4, dmi: 18.6, nel: 26.38, rdp_rup: 2910 },
{ milk: 23, fat: 3, protein: 4, dmi: 19.1, nel: 27.17, rdp_rup: 3000 },
{ milk: 24, fat: 3, protein: 4, dmi: 19.7, nel: 27.96, rdp_rup: 3090 },
{ milk: 25, fat: 3, protein: 4, dmi: 20.3, nel: 28.75, rdp_rup: 3180 },
{ milk: 26, fat: 3, protein: 4, dmi: 20.8, nel: 29.54, rdp_rup: 3270 },
{ milk: 27, fat: 3, protein: 4, dmi: 21.4, nel: 30.33, rdp_rup: 3360 },
{ milk: 28, fat: 3, protein: 4, dmi: 22, nel: 31.12, rdp_rup: 3450 },
{ milk: 29, fat: 3, protein: 4, dmi: 22.5, nel: 31.91, rdp_rup: 3540 },
{ milk: 30, fat: 3, protein: 4, dmi: 23.1, nel: 32.7, rdp_rup: 3630 },
{ milk: 5, fat: 3, protein: 3, dmi: 8.7, nel: 11.6, rdp_rup: 1320 },
{ milk: 6, fat: 3, protein: 3, dmi: 9.2, nel: 12.34, rdp_rup: 1400 },
{ milk: 7, fat: 3, protein: 3, dmi: 9.6, nel: 13.08, rdp_rup: 1480 },
{ milk: 8, fat: 3, protein: 3, dmi: 10.1, nel: 13.82, rdp_rup: 1560 },
{ milk: 9, fat: 3, protein: 3, dmi: 10.5, nel: 14.56, rdp_rup: 1640 },
{ milk: 10, fat: 3, protein: 3, dmi: 11, nel: 15.3, rdp_rup: 1720 },
{ milk: 11, fat: 3, protein: 3, dmi: 11.5, nel: 16.04, rdp_rup: 1800 },
{ milk: 12, fat: 3, protein: 3, dmi: 12, nel: 16.78, rdp_rup: 1880 },
{ milk: 13, fat: 3, protein: 3, dmi: 12.4, nel: 17.52, rdp_rup: 1960 },
{ milk: 14, fat: 3, protein: 3, dmi: 12.9, nel: 18.26, rdp_rup: 2040 },
{ milk: 15, fat: 3, protein: 3, dmi: 13.4, nel: 19, rdp_rup: 2120 },
{ milk: 16, fat: 3, protein: 3, dmi: 14, nel: 19.74, rdp_rup: 2200 },
{ milk: 17, fat: 3, protein: 3, dmi: 14.5, nel: 20.48, rdp_rup: 2280 },
{ milk: 18, fat: 3, protein: 3, dmi: 15, nel: 21.22, rdp_rup: 2360 },
{ milk: 19, fat: 3, protein: 3, dmi: 15.5, nel: 21.96, rdp_rup: 2440 },
{ milk: 20, fat: 3, protein: 3, dmi: 16, nel: 22.7, rdp_rup: 2520 },
{ milk: 21, fat: 3, protein: 3, dmi: 16.5, nel: 23.44, rdp_rup: 2600 },
{ milk: 22, fat: 3, protein: 3, dmi: 17, nel: 24.18, rdp_rup: 2680 },
{ milk: 23, fat: 3, protein: 3, dmi: 17.5, nel: 24.92, rdp_rup: 2760 },
{ milk: 24, fat: 3, protein: 3, dmi: 18, nel: 25.66, rdp_rup: 2840 },
{ milk: 25, fat: 3, protein: 3, dmi: 18.5, nel: 26.4, rdp_rup: 2920 },
{ milk: 26, fat: 3, protein: 3, dmi: 19, nel: 27.14, rdp_rup: 3000 },
{ milk: 27, fat: 3, protein: 3, dmi: 19.5, nel: 27.88, rdp_rup: 3080 },
{ milk: 28, fat: 3, protein: 3, dmi: 20, nel: 28.62, rdp_rup: 3160 },
{ milk: 29, fat: 3, protein: 3, dmi: 20.5, nel: 29.36, rdp_rup: 3240 },
{ milk: 30, fat: 3, protein: 3, dmi: 21, nel: 30.1, rdp_rup: 3320 },
{ milk: 5, fat: 4, protein: 3, dmi: 9.2, nel: 14.72, rdp_rup: 1400 },
{ milk: 6, fat: 4, protein: 3, dmi: 9.7, nel: 15.52, rdp_rup: 1500 },
{ milk: 7, fat: 4, protein: 3, dmi: 10.2, nel: 16.32, rdp_rup: 1600 },
{ milk: 8, fat: 4, protein: 3, dmi: 10.7, nel: 17.12, rdp_rup: 1700 },
{ milk: 9, fat: 4, protein: 3, dmi: 11.1, nel: 17.76, rdp_rup: 1800 },
{ milk: 10, fat: 4, protein: 3, dmi: 12.4, nel: 19.84, rdp_rup: 1920 },
{ milk: 11, fat: 4, protein: 3, dmi: 13, nel: 20.8, rdp_rup: 2010 },
{ milk: 12, fat: 4, protein: 3, dmi: 13.5, nel: 21.6, rdp_rup: 2100 },
{ milk: 13, fat: 4, protein: 3, dmi: 14, nel: 22.4, rdp_rup: 2190 },
{ milk: 14, fat: 4, protein: 3, dmi: 14.5, nel: 23.2, rdp_rup: 2280 },
{ milk: 15, fat: 4, protein: 3, dmi: 15, nel: 24, rdp_rup: 2370 },
{ milk: 16, fat: 4, protein: 3, dmi: 16, nel: 25.6, rdp_rup: 2460 },
{ milk: 17, fat: 4, protein: 3, dmi: 16.5, nel: 26.4, rdp_rup: 2540 },
{ milk: 18, fat: 4, protein: 3, dmi: 17, nel: 27.2, rdp_rup: 2620 },
{ milk: 19, fat: 4, protein: 3, dmi: 17.5, nel: 28, rdp_rup: 2705 },
{ milk: 20, fat: 4, protein: 3, dmi: 18, nel: 28.8, rdp_rup: 2790 },
{ milk: 21, fat: 4, protein: 3, dmi: 18.5, nel: 29.6, rdp_rup: 2875 },
{ milk: 22, fat: 4, protein: 3, dmi: 19, nel: 30.4, rdp_rup: 2960 },
{ milk: 23, fat: 4, protein: 3, dmi: 19.5, nel: 31.2, rdp_rup: 3045 },
{ milk: 24, fat: 4, protein: 3, dmi: 20, nel: 32, rdp_rup: 3130 },
{ milk: 25, fat: 4, protein: 3, dmi: 20.5, nel: 32.8, rdp_rup: 3215 },
{ milk: 26, fat: 4, protein: 3, dmi: 21, nel: 33.6, rdp_rup: 3300 },
{ milk: 27, fat: 4, protein: 3, dmi: 21.5, nel: 34.4, rdp_rup: 3385 },
{ milk: 28, fat: 4, protein: 3, dmi: 22, nel: 35.2, rdp_rup: 3470 },
{ milk: 29, fat: 4, protein: 3, dmi: 22.5, nel: 36, rdp_rup: 3555 },
{ milk: 30, fat: 4, protein: 3, dmi: 23, nel: 36.8, rdp_rup: 3640 }
];

const DairyCowCalculatorPage = () => {
  const [method, setMethod] = useState<CalculationMethod>('weight-milk');
  const [lactationStage, setLactationStage] = useState<LactationStage>('early');
  const [weight, setWeight] = useState<number>(0);
  const [milkProduction, setMilkProduction] = useState<number>(0);
  const [fatPercentage, setFatPercentage] = useState<number>(0);
  const [results, setResults] = useState<any>(null);

  const calculateByWeightAndMilk = () => {
    const DMI = weight * 0.025 + milkProduction * 0.1;
    const TDN_perKgMilk = 1.6 + (fatPercentage - 3.5) * 0.1;
    const totalTDN = DMI * 1000 * 0.65;
    const RDP = milkProduction * 70;
    const RUP = milkProduction * 40;
    const CP = RDP + RUP;
    const CP_percent = (CP / (DMI * 1000)) * 100;

    setResults({
      dmi: DMI.toFixed(2),
      tdn: (totalTDN / 1000).toFixed(2), // Convert to kg
      cp: CP.toFixed(0),
      cp_percent: CP_percent.toFixed(1)
    });
  };

  const calculateByMilkAndFat = () => {
    const data = lactationStage === 'early' ? earlyLactationData : lateLactationData;
    const row = data.find(
      (r) => r.milk === milkProduction && r.fat === fatPercentage
    );

    if (!row) {
      setResults({ error: 'لا توجد بيانات مطابقة للمدخلات' });
      return;
    }

    // Convert NEL to TDN (1 Mcal NEL ≈ 1.6 kg TDN)
    const tdn = row.dmi * 0.65; // Assuming 65% of DMI is TDN

    setResults({
      dmi: row.dmi.toFixed(2),
      tdn: tdn.toFixed(2),
      rdp_rup: row.rdp_rup.toFixed(0),
      stage: lactationStage
    });
  };

  const getFeedingRecommendations = () => {
    if (!results) return null;

    const dmi = parseFloat(results.dmi);
    
    // Calculate recommended portions
    const greenFodder = (dmi * 0.4).toFixed(2); // 40% from green fodder
    const hay = (dmi * 0.2).toFixed(2); // 20% from hay
    const concentrate = (dmi * 0.4).toFixed(2); // 40% from concentrate

    return (
      <div className="mt-6 bg-green-50 p-6 rounded-lg border border-green-200">
        <h4 className="text-lg font-semibold text-green-800 mb-4">توصيات التغذية</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <div className="text-sm text-gray-600 mb-1">المواد الخضراء</div>
            <div className="text-xl font-bold text-green-800">{greenFodder} كجم/يوم</div>
            <div className="text-sm text-gray-500 mt-1">برسيم، سيلاج، علف أخضر</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <div className="text-sm text-gray-600 mb-1">الدريس</div>
            <div className="text-xl font-bold text-green-800">{hay} كجم/يوم</div>
            <div className="text-sm text-gray-500 mt-1">دريس برسيم، تبن</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <div className="text-sm text-gray-600 mb-1">العلف المركز</div>
            <div className="text-xl font-bold text-green-800">{concentrate} كجم/يوم</div>
            <div className="text-sm text-gray-500 mt-1">أعلاف مصنعة، حبوب</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calculator size={32} className="text-green-600" />
          <h1 className="text-4xl font-bold text-green-800">حاسبة تغذية الأبقار الحلوب</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          حاسبة متخصصة لتقدير احتياجات الأبقار الحلوب من العناصر الغذائية
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-6">طريقة الحساب</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              className={`p-6 rounded-lg border-2 transition-all ${
                method === 'weight-milk'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => setMethod('weight-milk')}
            >
              <h3 className="text-lg font-semibold mb-2">الوزن وإنتاج الحليب</h3>
              <p className="text-gray-600">حساب الاحتياجات بناءً على وزن البقرة وإنتاج الحليب</p>
            </button>
            
            <button
              className={`p-6 rounded-lg border-2 transition-all ${
                method === 'milk-fat'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => setMethod('milk-fat')}
            >
              <h3 className="text-lg font-semibold mb-2">إنتاج الحليب ونسبة الدهن</h3>
              <p className="text-gray-600">حساب الاحتياجات بناءً على إنتاج الحليب ونسبة الدهن (NRC)</p>
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-green-700 mb-6">البيانات المطلوبة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {method === 'weight-milk' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  وزن البقرة (كجم)
                </label>
                <input
                  type="number"
                  className="form-input"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                إنتاج الحليب (كجم/يوم)
              </label>
              <input
                type="number"
                className="form-input"
                value={milkProduction}
                onChange={(e) => setMilkProduction(Number(e.target.value))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نسبة الدهن (%)
              </label>
              <input
                type="number"
                step="0.1"
                className="form-input"
                value={fatPercentage}
                onChange={(e) => setFatPercentage(Number(e.target.value))}
              />
              <div className="mt-2 text-sm text-gray-500">
                تقريباً: الأبقار المحلية 3.5%، المستوردة 3%، الجاموس 4%
              </div>
            </div>

            {method === 'milk-fat' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                 وزن البقره
                </label>
                <select
                  className="form-select"
                  value={lactationStage}
                  onChange={(e) => setLactationStage(e.target.value as LactationStage)}
                >
                  <option value="early">ثقيل</option>
                  <option value="late">خفيف</option>
                </select>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              className="btn btn-primary"
              onClick={() =>
                method === 'weight-milk' ? calculateByWeightAndMilk() : calculateByMilkAndFat()
              }
            >
              حساب الاحتياجات
            </button>
          </div>
        </div>

        {results && !results.error && (
          <div className="result-container mt-8">
            <h3 className="text-xl font-semibold text-green-700 mb-4">النتائج</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                <div className="text-sm text-gray-600 mb-1">المادة الجافة المأكولة</div>
                <div className="text-2xl font-bold text-green-800">{results.dmi} كجم/يوم</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                <div className="text-sm text-gray-600 mb-1">المركبات الغذائية المهضومة</div>
                <div className="text-2xl font-bold text-green-800">{results.tdn} كجم/يوم</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                <div className="text-sm text-gray-600 mb-1">البروتين</div>
                <div className="text-2xl font-bold text-green-800">
                  {method === 'weight-milk' 
                    ? `${results.cp} جم/يوم (${results.cp_percent}%)`
                    : `${results.rdp_rup} جم/يوم`}
                </div>
              </div>
            </div>

            {getFeedingRecommendations()}
          </div>
        )}

        {results && results.error && (
          <div className="warning mt-8">
            ⚠️ {results.error}
          </div>
        )}
      </div>
    </div>
  );
};

export default DairyCowCalculatorPage;