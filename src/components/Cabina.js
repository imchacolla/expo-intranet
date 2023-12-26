import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimentions';
import { motifySvg } from 'moti/svg'
const MotiPath = motifySvg(Path)()

const Cabina = props => {
    const { color, background } = props;
    return (
        <View style={[styles.container, { backgroundColor: "transparent" }]}>
            <Svg
                width="28"
                height="28"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                fill={color}
                fillRule="evenodd"
                stroke="none"
            >
                <G
                    transform="translate(0,100) scale(0.100000,-0.100000)"
                >
                    <Path
                        d="M738 930 c-81 -21 -145 -33 -142 -28 3 5 3 20 0 34 -5 20 -13 24 -41
24 -29 0 -36 -4 -41 -25 -3 -14 -1 -31 5 -39 14 -17 8 -21 -41 -30 -36 -7 -38
-5 -38 19 0 17 -7 28 -22 34 -43 16 -82 -24 -60 -60 13 -21 25 -16 -171 -65
-100 -25 -107 -28 -101 -48 4 -11 7 -22 9 -24 1 -1 86 18 188 43 102 25 191
45 196 45 13 0 31 -64 31 -108 0 -18 -7 -46 -15 -62 -15 -29 -19 -30 -80 -30
-63 0 -65 -1 -65 -25 l0 -25 145 0 145 0 0 25 c0 23 -3 25 -49 25 l-50 0 10
32 c12 45 11 106 -5 149 l-12 36 178 44 c99 24 183 46 188 49 10 6 2 51 -9 49
-3 0 -72 -18 -153 -39z"
                    />
                    <Path
                        d="M237 498 c-72 -97 -83 -267 -25 -382 40 -80 24 -76 284 -76 l232 0
25 30 c81 96 83 311 4 427 l-22 33 -237 0 -237 0 -24 -32z m233 -103 l0 -85
-121 0 -122 0 6 40 c3 22 15 60 27 85 l22 45 94 0 94 0 0 -85z m265 33 c13
-29 26 -68 30 -85 l7 -33 -126 0 -126 0 0 85 0 85 96 0 95 0 24 -52z"
                    />
                </G>
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //height: 150,
        width: 29,
        height: 29,
        // borderRadius: 25,
    },
});

export default Cabina;
