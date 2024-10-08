import {
    StyleSheet,
    View,
    Pressable,
    Text,
    Image,
    ImageBackground,
    Animated,
    Linking,
    ToastAndroid,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../assets/images/wh_logo_small.png";
import Background from "../assets/images/background.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Audio } from "expo-av";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import i18next from "../services/i18next";
import { useTranslation } from "react-i18next";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function HomeScreen() {

    const {t} = useTranslation();

    const [music, setMusic] = useState(true);
    const [buttonSound, setButtonSound] = useState();
    const [backgroundMusic, setBackgroundMusic] = useState();

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const router = useRouter();

    useEffect(() => {
        const loadSounds = async () => {
            // Load button sound
            try {
                const { sound: buttonSound } = await Audio.Sound.createAsync(
                    require("../assets/sounds/button-click.mp3")
                );
                setButtonSound(buttonSound);
                await buttonSound.setVolumeAsync(0.1);

                // Load background music
                const { sound: backgroundMusic } =
                    await Audio.Sound.createAsync(
                        require("../assets/sounds/background-music.mp3")
                    );
                setBackgroundMusic(backgroundMusic);
                await backgroundMusic.setVolumeAsync(0.03);
            } catch {}
        };

        loadSounds();

        return () => {
            if (buttonSound) {
                buttonSound.unloadAsync();
            }
            if (backgroundMusic) {
                backgroundMusic.unloadAsync();
            }
        };
    }, []);

    useEffect(() => {
        const manageBackgroundMusic = async () => {
            if (backgroundMusic) {
                if (music) {
                    await backgroundMusic.playAsync();
                } else {
                    await backgroundMusic.stopAsync();
                }
            }
        };

        manageBackgroundMusic();
    }, [music, backgroundMusic]);

    useEffect(() => {
        const retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem("music");
                if (value !== null) {
                    setMusic(value === "true");
                }
            } catch (error) {}
        };
        retrieveData();
    }, []);

    const playButtonSound = async () => {
        if (buttonSound) {
            await buttonSound.replayAsync(); // Play the button sound
        }
    };

    const startGame = async () => {
        await playButtonSound(); // Play sound when starting the game
        router.push("/GameScreen");
    };
    const redirectHowToPlay = async () => {
        await playButtonSound();
        router.push("/HowToPlay");
    };

    const openLink = async (url) => {
        await playButtonSound(); // Play sound when a link is opened
        Linking.openURL(url);
    };

    const openSettings = async () => {
        await playButtonSound();
        router.push('/Settings');
    };
    const openStats = async () => {
        await playButtonSound();
        router.push('/Stats');
    };

    const toggleMusic = async () => {
        const newMusicState = !music;
        setMusic(newMusicState);
        await AsyncStorage.setItem("music", newMusicState.toString());
    };

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [scaleAnim]);

    return (
        <View style={styles.containerMain}>
            <>
                <ImageBackground
                    source={Background}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >                
                    <Image
                        source={Logo}
                        style={styles.logo}
                        resizeMode="center"
                    />
                    <Ionicons name="stats-chart" size={wp('5%')} color="white" style={styles.stats} onPress={openStats}/>
                    <Animated.View
                        style={{ transform: [{ scale: scaleAnim }] }}
                    >
                        <Pressable
                            style={styles.buttons}
                            onPress={() => startGame()}
                        >
                            <Text style={styles.text}>{t('home.play')}</Text>
                        </Pressable>
                    </Animated.View>
                    <Pressable
                        style={styles.buttons}
                        onPress={() => openSettings()}
                    >
                        <Text style={styles.text}>{t('home.settings')}</Text>
                    </Pressable>

                    <Pressable
                        style={styles.buttons}
                        onPress={() => redirectHowToPlay()}
                    >
                        <Text style={styles.text}>{t('home.howtoplay')}</Text>
                    </Pressable>
                    <Text
                        style={{
                            fontFamily: "Fun",
                            top: hp('33%'),
                            color: "white",
                            fontSize: wp("4%"),
                        }}
                    >
                        {t('home.support')}
                    </Text>
                    <View style={{ flexDirection: "row", top: hp("27%") }}>
                        <Pressable
                            onPress={() =>
                                openLink(
                                    "https://www.instagram.com/halilfurkankarademir/"
                                )
                            }
                        >
                            <AntDesign
                                name="instagram"
                                size={wp("5%")}
                                color="white"
                                style={{ marginHorizontal: 5 }}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() =>
                                openLink(
                                    "https://www.linkedin.com/in/halilfurkankarademir/"
                                )
                            }
                        >
                            <FontAwesome
                                name="linkedin-square"
                                size={wp("5%")}
                                color="white"
                                style={{ marginHorizontal: 5 }}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() =>
                                openLink(
                                    "https://github.com/halilfurkankarademir"
                                )
                            }
                        >
                            <AntDesign
                                name="github"
                                size={wp("5%")}
                                color="white"
                                style={{ marginHorizontal: 5 }}
                            />
                        </Pressable>
                    </View>
                </ImageBackground>
            </>
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        backgroundColor: "#0080ff",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ffffff",
        paddingVertical: 6,
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#e67a73",
        shadowOffset: { width: 0, height: 39 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 1,
        width: wp("50%"),
        marginTop: 30,
    },
    containerMain: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    logo: {
        width: wp("80%"),
        height: hp("100%"),
        position: "absolute",
        bottom: wp("60%"),
    },
    stats:{
        bottom:wp('50%'),
        alignSelf:'center',
    },
    text: {
        color: "white",
        fontSize: wp("7%"),
        textAlign: "center",
        fontFamily: "Fun",
    },
});
