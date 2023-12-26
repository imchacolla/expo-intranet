import React, { useContext, useState, useEffect, useCallback } from 'react';

import { SocketContext } from '../contexts/SocketContext';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';

import { useSelector } from 'react-redux';

import { SafeAreaView } from 'react-native-safe-area-context';
import _ from 'lodash';
import { PRIMARY_COLOR, PRIMARY_TEXT_DARK, PRIMARY_TEXT_DARK_LIGHT, PRIMARY_TEXT_LIGHT } from '../utils/constants';
//const PRIMARY_TEXT_DARK_LIGHT = PRIMARY_TEXT_LIGHT = "#ccc"
import Cabina from './Cabina';
const SocketVelocidades = ({ navigation }) => {
    const socket = useContext(SocketContext);
    const { ci, user, isDarkMode } = useSelector(state => state.auth);
    const [velocidades, setVelocidades] = useState('0');
    const [amarilla, setAmarilla] = useState(false);
    const [roja, setRoja] = useState(false);
    const [verde, setVerde] = useState(null);
    const [azul, setAzul] = useState(false);
    const [naranja, setNaranja] = useState(false);
    const [celeste, setCeleste] = useState(false);
    const [blanca, setBlanca] = useState(false);
    const [plateada, setPlateada] = useState(false);
    const [morada, setMorada] = useState(false);
    const [cafe, setCafe] = useState(false);

    const socketVelocidadesOperacion = useCallback(data => {
        setAmarilla(data.Amarilla);
        setRoja(data.Roja);
        setVerde(data.Verde);
        setAzul(data.Azul);
        setNaranja(data.Naranja);
        setCeleste(data.Celeste);
        setBlanca(data.Blanca);
        setPlateada(data.CafePlateada);
        setMorada(data.Morada);
    }, []);

    useEffect(() => {
        socket.on('velocidades', socketVelocidadesOperacion);
        return () => {
            socket.off('velocidades');
        };
    }, [socket]);

    return (
        <>
            <View
                style={{
                    marginHorizontal: 10
                }}>

                {/* linea roja */}
                {roja?.color1 && (
                    <View
                        style={styles.line}>
                        <View
                            style={[styles.section1, {
                                borderBottomColor: roja.color1,
                            }]}
                        >
                            <View
                                style={{
                                    width: Dimensions.get('screen').width / 4 + 20
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        color: isDarkMode ? roja.color1 : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        roja?.nombre_linea
                                    }
                                </Text>
                            </View>
                            <View
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        fontSize: 20,
                                        marginHorizontal: 2,
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        roja?.v1
                                    }
                                </Text>
                            </View>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <Cabina color={roja.color1} />
                            </View>
                        </View>
                        <View style={[styles.section2, {
                            borderBottomColor: roja.color2,
                        }]}>
                            <View>
                                <Text
                                    style={[styles.velocidad, {
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }]}> {
                                        roja?.v2
                                    }
                                </Text>
                            </View>
                            <View
                                style={styles.cabina}
                            >
                                <Cabina color={roja.color2} />
                            </View>
                        </View>
                    </View>
                )}
                {/* linea amarilla */}
                {amarilla?.color1 && (
                    <View
                        style={styles.line}>
                        <View
                            style={[styles.section1, {
                                borderBottomColor: amarilla.color1,
                            }]}
                        >
                            <View
                                style={{
                                    width: Dimensions.get('screen').width / 4 + 20
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        color: isDarkMode ? amarilla.color1 : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        amarilla?.nombre_linea
                                    }
                                </Text>
                            </View>
                            <View
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        fontSize: 20,
                                        marginHorizontal: 2,
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        amarilla?.v1
                                    }
                                </Text>
                            </View>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <Cabina color={amarilla.color1} />
                            </View>
                        </View>
                        <View style={[styles.section2, {
                            borderBottomColor: amarilla.color2,
                        }]}>
                            <View>
                                <Text
                                    style={[styles.velocidad, {
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }]}> {
                                        amarilla?.v2
                                    }
                                </Text>
                            </View>
                            <View
                                style={styles.cabina}
                            >
                                <Cabina color={amarilla.color2} />
                            </View>
                        </View>
                    </View>
                )}
                {/* linea verde */}
                {verde?.color1 && (
                    <View
                        style={styles.line}>
                        <View
                            style={[styles.section1, {
                                borderBottomColor: verde.color1,
                            }]}
                        >
                            <View
                                style={{
                                    width: Dimensions.get('screen').width / 4 + 20
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        color: isDarkMode ? verde.color1 : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        verde?.nombre_linea
                                    }
                                </Text>
                            </View>
                            <View
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        fontSize: 20,
                                        marginHorizontal: 2,
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        verde?.v1
                                    }
                                </Text>
                            </View>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <Cabina color={verde.color1} />
                            </View>
                        </View>
                        <View style={[styles.section2, {
                            borderBottomColor: verde.color2,
                        }]}>
                            <View>
                                <Text
                                    style={[styles.velocidad, {
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }]}> {
                                        verde?.v2
                                    }
                                </Text>
                            </View>
                            <View
                                style={styles.cabina}
                            >
                                <Cabina color={verde.color2} />
                            </View>
                        </View>
                    </View>
                )}
                {/* linea azul */}
                {azul?.color1 && (
                    <View
                        style={styles.line}>
                        <View
                            style={[styles.section1, {
                                borderBottomColor: azul.color1,
                            }]}
                        >
                            <View
                                style={{
                                    width: Dimensions.get('screen').width / 4 + 20
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        color: isDarkMode ? azul.color1 : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        azul?.nombre_linea
                                    }
                                </Text>
                            </View>
                            <View
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        fontSize: 20,
                                        marginHorizontal: 2,
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        azul?.v1
                                    }
                                </Text>
                            </View>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <Cabina color={azul.color1} />
                            </View>
                        </View>
                        <View style={[styles.section2, {
                            borderBottomColor: azul.color2,
                        }]}>
                            <View>
                                <Text
                                    style={[styles.velocidad, {
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }]}> {
                                        azul?.v2
                                    }
                                </Text>
                            </View>
                            <View
                                style={styles.cabina}
                            >
                                <Cabina color={azul.color2} />
                            </View>
                        </View>
                    </View>
                )}
                {/* linea naranja */}
                {naranja?.color1 && (
                    <View
                        style={styles.line}>
                        <View
                            style={[styles.section1, {
                                borderBottomColor: naranja.color1,
                            }]}
                        >
                            <View
                                style={{
                                    width: Dimensions.get('screen').width / 4 + 20
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        color: isDarkMode ? naranja.color1 : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        naranja?.nombre_linea
                                    }
                                </Text>
                            </View>
                            <View
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        fontSize: 20,
                                        marginHorizontal: 2,
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        naranja?.v1
                                    }
                                </Text>
                            </View>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <Cabina color={naranja.color1} />
                            </View>
                        </View>
                        <View style={[styles.section2, {
                            borderBottomColor: naranja.color2,
                        }]}>
                            <View>
                                <Text
                                    style={[styles.velocidad, {
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }]}> {
                                        naranja?.v2
                                    }
                                </Text>
                            </View>
                            <View
                                style={styles.cabina}
                            >
                                <Cabina color={naranja.color2} />
                            </View>
                        </View>
                    </View>
                )}
                {/* linea blanca */}
                {blanca?.color1 && (
                    <View
                        style={styles.line}>
                        <View
                            style={[styles.section1, {
                                borderBottomColor: blanca.color1,
                            }]}
                        >
                            <View
                                style={{
                                    width: Dimensions.get('screen').width / 4 + 20
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        color: isDarkMode ? blanca.color1 : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        blanca?.nombre_linea
                                    }
                                </Text>
                            </View>
                            <View
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        fontSize: 20,
                                        marginHorizontal: 2,
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        blanca?.v1
                                    }
                                </Text>
                            </View>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <Cabina color={blanca.color1} />
                            </View>
                        </View>
                        <View style={[styles.section2, {
                            borderBottomColor: blanca.color2,
                        }]}>
                            <View>
                                <Text
                                    style={[styles.velocidad, {
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }]}> {
                                        blanca?.v2
                                    }
                                </Text>
                            </View>
                            <View
                                style={styles.cabina}
                            >
                                <Cabina color={blanca.color2} />
                            </View>
                        </View>
                    </View>
                )}
                {/* linea celeste */}
                {celeste?.color1 && (
                    <View
                        style={styles.line}>
                        <View
                            style={[styles.section1, {
                                borderBottomColor: celeste.color1,
                            }]}
                        >
                            <View
                                style={{
                                    width: Dimensions.get('screen').width / 4 + 20
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        color: isDarkMode ? celeste.color1 : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        celeste?.nombre_linea
                                    }
                                </Text>
                            </View>
                            <View
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        fontSize: 20,
                                        marginHorizontal: 2,
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        celeste?.v1
                                    }
                                </Text>
                            </View>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <Cabina color={celeste.color1} />
                            </View>
                        </View>
                        <View style={[styles.section2, {
                            borderBottomColor: celeste.color2,
                        }]}>
                            <View>
                                <Text
                                    style={[styles.velocidad, {
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }]}> {
                                        celeste?.v2
                                    }
                                </Text>
                            </View>
                            <View
                                style={styles.cabina}
                            >
                                <Cabina color={celeste.color2} />
                            </View>
                        </View>
                    </View>
                )}
                {/* linea morada */}
                {morada?.color1 && (
                    <View
                        style={styles.line}>
                        <View
                            style={[styles.section1, {
                                borderBottomColor: morada.color1,
                            }]}
                        >
                            <View
                                style={{
                                    width: Dimensions.get('screen').width / 4 + 20
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        color: isDarkMode ? morada.color1 : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        morada?.nombre_linea
                                    }
                                </Text>
                            </View>
                            <View
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        fontSize: 20,
                                        marginHorizontal: 2,
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        morada?.v1
                                    }
                                </Text>
                            </View>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <Cabina color={morada.color1} />
                            </View>
                        </View>
                        <View style={[styles.section2, {
                            borderBottomColor: morada.color2,
                        }]}>
                            <View>
                                <Text
                                    style={[styles.velocidad, {
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }]}> {
                                        morada?.v2
                                    }
                                </Text>
                            </View>
                            <View
                                style={styles.cabina}
                            >
                                <Cabina color={morada.color2} />
                            </View>
                        </View>
                    </View>
                )}
                {/* linea cafe / plateada */}
                {plateada?.color1 && (
                    <View
                        style={styles.line}>
                        <View
                            style={[styles.section1, {
                                borderBottomColor: plateada.color1,
                            }]}
                        >
                            <View
                                style={{
                                    width: Dimensions.get('screen').width / 4 + 20
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        plateada?.nombre_linea
                                    }
                                </Text>
                            </View>
                            <View
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        fontSize: 20,
                                        marginHorizontal: 2,
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }}>{
                                        plateada?.v1
                                    }
                                </Text>
                            </View>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <Cabina color={plateada.color1} />
                            </View>
                        </View>
                        <View style={[styles.section2, {
                            borderBottomColor: plateada.color2,
                        }]}>
                            <View>
                                <Text
                                    style={[styles.velocidad, {
                                        color: isDarkMode ? PRIMARY_TEXT_DARK_LIGHT : PRIMARY_TEXT_LIGHT,
                                    }]}> {
                                        plateada?.v2
                                    }
                                </Text>
                            </View>
                            <View
                                style={styles.cabina}
                            >
                                <Cabina color={plateada.color2} />
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </>
    );
};

export default SocketVelocidades;

const styles = StyleSheet.create({
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    section1: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '60%'
    },
    section2: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        width: '40%',
        marginLeft: 1
    },
    velocidad: {
        fontSize: 20,
        fontWeight: '500',
    },
    cabina: {
        alignItems: 'center',
        marginHorizontal: 10
    },
    texto: {
        color: '#ccc'
    }
});
