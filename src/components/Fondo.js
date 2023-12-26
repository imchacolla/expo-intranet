import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {View, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import {PRIMARY_COLOR} from '../utils/constants';

function Fondo () {
  const color1 = '#76D3AC';
  const color2 = PRIMARY_COLOR;
  const color3 = PRIMARY_COLOR;
  const color4 = '#eee';

  return (
    <View style={styles.container}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 480 320"
      >

        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M857 9L871 7L868 60L857 61L857 68C850.481 68.1346 842.479 67.7999 839 74L835.736 52.1744L831 44L817 44L814 47L814 51L811 51L811 83L810 83C808.085 75.0529 807.702 73.0067 799 73L799 68L795 68L795 63L790 69L782 69L782 74L777 76L777 71L762 70L762 51C759.332 49.5339 757.144 46.6517 753.982 46.1944C749.317 45.5198 745.028 49.6759 744.228 54.0039C742.374 64.0445 744 75.7887 744 86L743 86L743 66L739 66L739 61L734 59L733 59L732 59L726 61L726 67L715 67L715 73L713 73L714 48C700.634 48 706.521 51.4663 700.397 59.696C697.281 63.8826 693.448 64.23 693 70L692 70L692 67L688 68C688.006 59.5499 687.702 56.1209 683 49C675.27 53.7662 675.285 60.7844 675 69L668 67L668 62L656 63L656 69L655 69L651 54L643 54L641 64L638 64L638 80L637 80L635 73L627 74L623 85L622 85L622 81L611 81L606 86L605 35L614 34L614 33L561 35L561 36L599 36L597.811 67L592 86L589 86L589 90L588 90L588 84C582.431 82.34 580.19 79.8316 580 74L570 74L570 91L569 91L569 87L562 88L562 84L550 84L549 101L548 101C548 94.8111 549.861 85.0396 547.026 79.4282C539.423 64.3769 534 83.5532 534 91C529.917 91.0139 525.322 90.4804 524 95L520 95L520 91L512 88L512 92L509 95L503 96C503 92.1201 504.146 86.0296 502.012 82.6134C499.691 78.8988 492.167 77.256 489.457 81.3179C486.752 85.3707 488 92.3635 488 97L476 94L476 90L469 88L468 95L462 97C461.498 93.0451 460.476 66.926 452.404 72.0471C447.924 74.8888 447.94 87.0364 446 92L445 92L442 82L437 84L437 88L433 88L433 82L426 84L426 77C420.739 78.1004 416.991 79.3442 414 84L412 80C407.244 81.9924 405.296 87.1898 404 92L403 92L403 88L391 92C392.359 87.2263 390.967 84.7761 388 81L386 83L385 83C381.065 80.3439 378.876 82.0582 377 86L376 86L376 82C369.154 82.1661 368.023 84.4621 368 91L364 88L363 91L356 91C356 88.4814 356.798 69.2176 350.495 73.7515C346.387 76.7066 347.512 84.2218 343 88L344 82C339.635 82.3401 338.34 83.6353 338 88L331 87L331 93L330 93L330 83L327 83L327 75L318 77L317 84L314 80L309 80L307 89L306 89L306 85L298 85L295 89C294.371 76.9048 289.362 79.7124 282 84L281 36L304 36L304 35L268 32C269.343 36.046 272.065 35.9534 276 36L275 78L268 78L263 89L262 89C260.413 84.1766 256.463 84.631 252 85L251 89L250 89C249.936 70.3795 238 74.725 238 91L236 91L236 74L229 76C228.188 72.2111 221.168 72.3132 218.944 75.3333C216.931 78.0687 219.316 81.9248 218.889 84.9722C218.362 88.7369 215.281 91.0255 215 95L209 94C208.993 84.9098 206.105 80.378 200 74L199 77C190.551 78.3685 192 87.3415 192 94L191 94L191 65L187 65L186 57L180 57L176 68C175.096 63.7831 170.644 65 167 65L167 69L160 71C160.022 63.1426 159.882 59.0101 156 52C150.31 56.6505 148.861 63.933 148 71L146 71C145.349 67.2009 142.736 66.1221 141.023 62.8958C136.838 55.0149 140.412 51.0328 129 51L130 77L129 77L129 71L121 70C120.486 63.5592 115.573 63.2083 110 64L106 70C106 62.9736 108.127 54.3035 99 54L99 47L95 47L92 74L86 74C86 54.3696 81.4486 31.1171 86 12C90.3523 12.6335 93.2138 11.542 94 7C85.9676 7.63923 64.7468 8.38792 64 18L76 15L75 74L70 74L67 71L67 67L66 67L66 74L62 74L62 78C52.315 68.3941 53.4202 62.0557 49 50L44 45L42 45L41 50L37 49L36 56L33 56L33 79L32 79C31.9677 69.8753 28.1987 70 20 70L20 74L17 74L17 67L8 66L8 62L6 62L4 74L0 74L0 132L958 132L956 50L938 51L938 42L925 43L925 52L921 52C921 57.5416 922.01 62.7903 916 65L916 71L914 71L914 64L911 64C911 49.0813 912.205 36.4433 906 23L891 27L889 65L881 68L880 4L889 0C879.652 0 861.099 -1.1068 857 9z"
        />

        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M863 2L863 3L866 3L863 2M886.667 2.33333L887.333 2.66667L886.667 2.33333M880 5L880 6L883 6L880 5z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M882 6L882 7L886 7L882 6M886 7L886 8L894 9L886 7z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M77 9L77 10L81 10L77 9z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M81 9L82 10L81 9z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M94 9L95 10L94 9M850 9L850 10L858 10L850 9M859 9L859 10L863 10L859 9M893 9L893 10L896 10L893 9z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M896 9L897 10L896 9z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M897 9L897 10L901 10L897 9z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M843 11L843 12L851 11L843 11M900 10L900 11L909 12L900 10z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M64 12L65 13L64 12M86 12L87 13L86 12M89 12L89 13L93 13L89 12M835 12L835 13L839 13L835 12z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M839 12L840 13L839 12z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M840 12L840 13L844 13L840 12M908 12L908 13L911 13L908 12z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M911 12L912 13L911 12z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M912 12L912 13L916 13L912 12z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M93 13L93 14L103 15L93 13M832 13L832 14L836 14L832 13M915 13L915 14C920.879 14.9425 922.07 17.4295 923 23C906.856 27.7184 934.462 41.7513 932.611 28C931.603 20.5119 922.6 23.6675 925 14L915 13M827 14L827 15L832 15L827 14z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M60 15L60 16L64 16L60 15M74.6667 15.3333L75.3333 15.6667L74.6667 15.3333M102 15L102 16L108 16L102 15z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M108 15L109 16L108 15z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M109 15L109 16L113 16L109 15M814.667 15.3333L815.333 15.6667L814.667 15.3333z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M803 18L803 19L815 17L816 24C810.944 25.7716 809.67 33.806 816.044 34.8519C827.386 36.713 826.838 25.1532 817 23L819 15L803 18z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M819 15L819 16L822 16L819 15z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M822 15L823 16L822 15z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M823 15L823 16L828 16L823 15M921 15L922 16L921 15z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M924 15L925 16L924 15z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M925.667 15.3333L926.333 15.6667L925.667 15.3333z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M927 15L928 16L927 15z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M928 15L928 16L932 16L928 15z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M49 18L49 19L61 17L49 18M113 16L113 17L130 19L113 16z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M924 16L924 19L925 19L924 16z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M931 16L931 17L939 18L931 16z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M939.333 17.6667L939.667 18.3333L939.333 17.6667z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M940 18L940 19L944 19L940 18z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M40 19L40 20L45 20L40 19z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M45 19L46 20L45 19z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M46 19L46 20L50 20L46 19M129 19L129 20L135 20L129 19z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M135 19L136 20L135 19z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M136 19L136 20L141 20L136 19z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M141 19L142 20L141 19z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M791 19L791 20L804 20L791 19M922 19L923 20L922 19z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M924 19L925 20L924 19z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M943 19L943 20L947 20L943 19z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M947 19L948 20L947 19z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M948 19L948 20L952 20L948 19z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M31 21L31 22L41 21L31 21M141 20L141 21C147.607 21.362 148.836 23.9416 150 30C136.44 34.7198 157.449 47.046 159.458 35.946C160.835 28.3347 148.706 30.0152 154 21L141 20M779 21L779 22L792 21L779 21M952 20L952 21L958 22L952 20z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M36 21L37 22L36 21M924 21L925 22L924 21M21 24L26 23L21 24z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M26 22L27 23L26 22z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M27 22L27 23L32 23L27 22M148 22L149 23L148 22M152 22L152 23L159 23L152 22z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M159 22L160 23L159 22z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M160 22L160 23L166 23L160 22M766 22L766 23L773 23L766 22z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M773 22L774 23L773 22z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M774 22L774 23L780 23L774 22M815 22L816 23L815 22M817 22L818 23L817 22M925 22L926 23L925 22z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M8 24L8 25L21 24L8 24M166 23L166 24L172 24L166 23M742 25L742 26L766 24L742 25M172 24L172 25L179 25L172 24M1 25L1 26L8 26L1 25M179 25L179 26L186 26L179 25z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M186 25L192 27L192 26L186 25z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M736 25L737 34C733.392 35.0545 730.337 41.3255 734.329 44.0694C736.366 45.4701 740.557 45.3158 743 46C748.938 39.1105 745.684 34.9173 738 32L740 25L736 25z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M0 26L1 27L0 26z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M192 26L193 27L192 26z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M193 26L193 27L201 27L193 26M722 26L722 27L736 27L722 26M739 26L739 27L742 27L739 26M814.667 26.3333L815.333 26.6667L814.667 26.3333M820 26L821 27L820 26M870 26L871 27L870 26M891 26L891 27L898 27L891 26M908 26L909 30L910 30L908 26z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M909 26L910 27L909 26z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M921.667 26.3333L922.333 26.6667L921.667 26.3333M924.333 26.6667L924.667 27.3333L924.333 26.6667z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M927 26L930 29L927 26z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M200 27L200 28L216 29L200 27M699 28L699 29L723 28L699 28z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M814.667 27.3333L815.333 27.6667L814.667 27.3333M817 27L817 30L819 27L817 27M820 27L820 29L822 29L822 27L820 27M921 27L921 29L923 29L923 27L921 27M925 27L926 28L925 27z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M698 28L672 29L672 30L698 28z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M924 28L925 29L924 28z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M148.667 29.3333L149.333 29.6667L148.667 29.3333M153 29L153 30L157 30L153 29M215 29L215 30L232 31L215 29z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M231 29L232 30L231 29z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M240 29L240 30L244 30L240 29M811 29L812 30L811 29M813 29L814 30L813 29z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M814 29L815 30L814 29z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M818 29L819 30L818 29M820 29L820 30L823 30L820 29z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M232 30L232 31C238.644 31.0785 240.01 32.9554 242 39C224.326 44.809 256.319 56.5006 250.392 42.2122C248.638 37.9849 244.344 36.9683 243 32L249 32L232 30M659 30L659 31L673 31L659 30M625 32L627 40C622.127 41.0441 623.269 48.0451 624 52C626.002 51.7622 627.991 51.4942 630.004 51.3611C635.004 51.0305 640.767 46.6366 635.483 41.5988C633.735 39.9322 630.581 40.0756 629.504 37.6844C628.604 35.6871 629.589 33.0068 630 31L625 32M644 31L644 32L659 32L644 31z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M148 32L148 36L149 36L150 32L148 32z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M152 32L153 33L152 32z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M155 32L157 35L155 32z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M156 32L157 33L156 32M243 32L244 33L243 32M248 32L248 33L268 33L248 32z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M277 32L278 33L277 32z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M278.667 32.3333L279.333 32.6667L278.667 32.3333M281 32L281 33L286 33L281 32M592 32L592 33L601 33L592 32z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M608 32L609 33L608 32z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M613 32L613 33L625 33L613 32M630 32L630 33L645 33L630 32M739 32L740 33L739 32M811 32L812 33L811 32z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M151 36L154 33L151 36z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M924 33L925 34L924 33M578 34L579 35L578 34M303 36L303 37L316 37L303 36z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M316 36L317 37L316 36z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M317 36L317 37L333 37L317 36M517 36L518 37L517 36z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M518 36L519 37L518 36z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M519 36L519 37L561 37C550.012 32.3893 530.957 36 519 36M592 36L592 37L597 37L592 36M628 36L629 37L628 36M733 36L734 37L733 36M735.667 36.3333L736.333 36.6667L735.667 36.3333M739 36L740 37L739 36M742 36L744 38L742 36z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M743 36L744 37L743 36z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M820 36L821 37L820 36z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M332 37L332 38L359 39L359 47C355.838 48.0394 352.086 52.933 356.333 55.4861C359.74 57.5346 364.339 56.4526 368 56L361 39L374 39C362.721 34.2671 344.226 37 332 37M445 37L443 58L449.004 57.9992C464.166 57.8923 451.722 49.4354 449.113 44.6867C447.926 42.5251 448.824 39.3296 449 37L445 37M497 37L497 38C506.416 38 513.668 35.8773 517 46C513.734 47.0733 509.625 53.0482 514.322 55.3966C517.429 56.9506 522.602 56 526 56C525.974 48.6879 515.843 43.6051 520 38L497 37z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M735 37L735 39L737 39L737 37L735 37M739 37L739 39L741 39L739 37M742 37L742 39L744 39L742 37z"
        />
        <Path
          stroke="none"
          fill={color2}
          fillRule="evenodd"
          d="M820 37L821 38L820 37M472 38L472 39L497 39L472 38z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M518 38L519 39L518 38M146 39L147 40L146 39M158 39L159 40L158 39M238 39L239 40L238 39M358 39L359 40L358 39M373 39L373 40L445 40L422 39L373 39M449 39L449 40L472 40L449 39z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M472 39L473 40L472 39z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M515 39L516 40L515 39z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M518 39L519 40L518 39z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M629 39L630 40L629 39M732 39L733 40L732 39M735.667 39.3333L736.333 39.6667L735.667 39.3333M738.667 39.3333L739.333 39.6667L738.667 39.3333M743 39L744 40L743 39M518.333 40.6667L518.667 41.3333L518.333 40.6667z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M240 41L239 45L240 41M246 41L248 44L246 41z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M247 41L248 42L247 41z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M243 42L243 44L245 44L245 42L243 42z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M623 43L623 46L624 46L623 43z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M625 43L625 46L627 46L627 43L625 43z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M629 43L630 44L629 43z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M632 43L635 46L632 43z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M633 43L634 44L633 43M821 43L821 44L831 44L821 43M924 43L924 52L925 52L924 43M518 44L519 45L518 44z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M628 46L631 46L630 44L628 46z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M743 44L744 45L743 44M356 46L356 47L359 47L356 46M364 46L364 47L367 47L364 46M445 46L446 47L445 46M449.667 46.3333L450.333 46.6667L449.667 46.3333M513 46L514 47L513 46M523 46L524 47L523 46M625 46L626 47L625 46M628 46L629 47L628 46M750 46L751 47L750 46M755 46L756 47L755 46M831.667 46.3333L832.333 46.6667L831.667 46.3333M880 46L881 47L880 46M367 47L368 48L367 47z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M515 48L514 52L515 48M520 48L523 51L520 48z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M39.6667 49.3333L40.3333 49.6667L39.6667 49.3333M45 49L45 50L49 50L45 49M239 49L239 50L249 50L239 49z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M357 49L357 53L359 49L357 49z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M360 49L361 50L360 49z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M361 49L360 52L361 49M364 49L367 52L364 49z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M442 49L442 57L443 57L442 49M445 49L446 50L445 49M451.667 49.3333L452.333 49.6667L451.667 49.3333z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M518.333 49.6667L518.667 50.3333L518.333 49.6667z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M623 49L624 50L623 49M681 49L682 50L681 49z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M683 49L684 50L683 49z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M745 49L746 50L745 49M759.333 49.6667L759.667 50.3333L759.333 49.6667M834.667 49.3333L835.333 49.6667L834.667 49.3333z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M444 50L444 53L446 53L446 50L444 50M448 50L448 53L450 53L450 50L448 50M451 50L453 53L454 52L453 50L451 50z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M518 51L519 52L518 51M156 52L157 53L156 52M743 52L743 86L744 86L743 52M99 53L99 54L104 54L99 53M139 53L140 54L139 53z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M156 53L157 54L156 53z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M444.667 53.3333L445.333 53.6667L444.667 53.3333M678 53L679 54L678 53M685 53L686 54L685 53M51 56L52 57L51 56M158 56L159 57L158 56M180 56L180 57L186 60C186.867 56.1401 183.061 56.1002 180 56z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M186 56L187 57L186 56z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M355 56L355 57L360 57L355 56M364 56L364 57L368 57L364 56M456 56L457 57L456 56M513 56L513 57L525 57L513 56M675 56L676 57L675 56z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M186 60L187 61L186 60z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M700 60L701 61L700 60M734 60L734 61L739 61L734 60M857 60L857 61L862 61L857 60M6 61L7 62L6 61M140 63L141 64L140 63M638 63L638 64L641 64L638 63M696 63L697 64L696 63M141 64L142 65L141 64M713 65L713 73L714 73L713 65M12 66L12 67L17 67L12 66M91 66L92 67L91 66M144 66L145 67L144 66M668 66L668 67L671 67L668 66M715 66L715 67L726 67L715 66M789 66L789 69L790 69L789 66M31 70L32 71L31 70M53 70L54 71L53 70M67 70L67 71L70 71L67 70M125 70L125 71L129 71L125 70M146.667 70.3333L147.333 70.6667L146.667 70.3333M915 70L916 71L915 70M457.333 71.6667L457.667 72.3333L457.333 71.6667M0 73L0 74L3 74L0 73M62 73L62 74L66 74L62 73M70 73L70 74L75 74L70 73M86 73L86 74L92 74L86 73M199.667 73.3333L200.333 73.6667L199.667 73.3333z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M231 73L232 74L231 73z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M232 73L232 74L236 74L232 73M349 73L350 74L349 73M354 73L355 74L354 73M538.667 73.3333L539.333 73.6667L538.667 73.3333M542 73L543 74L542 73M571 73L571 74L579 74L571 73M595 73L596 74L595 73M627 73L627 74L632 74L627 73M779 73L779 74L782 74L779 73M201 76L202 77L201 76M593 76L594 77L593 76M240 77L241 78L240 77M247 77L248 78L247 77M268 77L268 78L275 78L268 77M288 77L288 78L291 78L288 77M320.667 77.3333L321.333 77.6667L320.667 77.3333M422.667 77.3333L423.333 77.6667L422.667 77.3333M545 77L546 78L545 77M592 77L593 78L592 77M192.667 80.3333L193.333 80.6667L192.667 80.3333M206 80L207 81L206 80M249 80L250 81L249 80M381.667 80.3333L382.333 80.6667L381.667 80.3333z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M412 80L413 81L412 80z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M415 80L416 81L415 80M489 80L490 81L489 80M499.667 80.3333L500.333 80.6667L499.667 80.3333M611 80L611 81L622 81L611 80M427.333 82.6667L427.667 83.3333L427.333 82.6667M442 82L443 83L442 82M623 82L624 83L623 82M282.667 83.3333L283.333 83.6667L282.667 83.3333M294 83L295 84L294 83M316 83L317 84L316 83M337 83L337 87L333 87L333 88C336.22 87.465 338.124 86.4278 337 83M347 83L348 84L347 83M389 83L390 84L389 83M437 83L437 84L440 84L437 83z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M442 83L443 84L442 83z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M487 83L487 97L488 97L487 83M550 83L550 84L554 84L550 83M556 83L556 84L562 84L556 83M585.667 83.3333L586.333 83.6667L585.667 83.3333z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M623 83L624 84L623 83z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M307.333 85.6667L307.667 86.3333L307.333 85.6667M217.667 87.3333L218.333 87.6667L217.667 87.3333z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M337 87L338 88L337 87z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M343.667 87.3333L344.333 87.6667L343.667 87.3333M364 87L365 88L364 87M398 87L399 88L398 87M400 87L401 88L400 87M405.667 87.3333L406.333 87.6667L405.667 87.3333M444 87L445 88L444 87M469.667 87.3333L470.333 87.6667L469.667 87.3333z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M548 87L549 88L548 87z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M549 87L550 88L549 87M562 87L563 88L562 87z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M563 87L564 88L563 87z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M548 88L548 100L549 100L548 88M356.667 90.3333L357.333 90.6667L356.667 90.3333M360 90L360 91L363 91L360 90M365 90L365 91L368 91L365 90M394 90L395 91L394 90M446 90L447 91L446 90z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M533 90L534 91L533 90z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M212 94L212 95L215 95L212 94M465 94L465 95L468 95L465 94M485 94L486 95L485 94z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M503 94L504 95L503 94z"
        />
        <Path
          stroke="none"
          fill={color3}
          fillRule="evenodd"
          d="M504 94L504 95L509 95L504 94M520.667 94.3333L521.333 94.6667L520.667 94.3333M503 95L504 96L503 95z"
        />
        <Path
          stroke="none"
          fill={color1}
          fillRule="evenodd"
          d="M548 100L549 101L548 100z"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: windowHeight - 120,
    /*   alignItems: 'center',
    justifyContent: 'center', */
    height: 285,
    width: windowWidth,
  },
});
export default Fondo;
