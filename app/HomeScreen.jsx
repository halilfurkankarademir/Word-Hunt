import {
    StyleSheet,
    View,
    Pressable,
    Text,
    Image,
    ImageBackground,
    Animated,
    Linking,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import Settings from "../components/Settings";
import Logo from "../assets/images/wh_logo_small.png";
import Background from "../assets/images/background.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Audio } from "expo-av"; // Import the audio module


export default function HomeScreen() {
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const [sound, setSound] = useState(null);

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const router = useRouter();

    const startGame = () => {
        router.push("/GameScreen");
    };

    const openLink = (url) => {
        Linking.openURL(url);
    };

    // useEffect(() => {
    //     // Load and play background music
    //     const loadSound = async () => {
    //         const { sound } = await Audio.Sound.createAsync(
    //             require('../assets/music.mp3') // Path to your sound file
    //         );
    //         setSound(sound);
    //         await sound.playAsync();
    //         sound.setIsLoopingAsync(true); // Loop the sound
    //     };

    //     loadSound();

    //     return () => {
    //         // Cleanup the sound when the component unmounts
    //         if (sound) {
    //             sound.stopAsync();
    //             sound.unloadAsync();
    //         }
    //     };
    // }, []);

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
                >
                    {isSettingsVisible && (
                        <Settings
                            isVisible={isSettingsVisible}
                            handleClose={() => setIsSettingsVisible(false)}
                        />
                    )}
                    <Image
                        source={Logo}
                        style={styles.logo}
                        resizeMode="center"
                    />
                    <Animated.View
                        style={{ transform: [{ scale: scaleAnim }] }}
                    >
                        <Pressable
                            style={styles.buttons}
                            onPress={() => startGame()}
                        >
                            <Text style={styles.text}>Play</Text>
                        </Pressable>
                    </Animated.View>
                    <Pressable
                        style={styles.buttons}
                        onPress={() => setIsSettingsVisible(true)}
                    >
                        <Text style={styles.text}>Settings</Text>
                    </Pressable>

                    <Pressable style={styles.buttons}>
                        <Text style={styles.text}>Remove Ads</Text>
                    </Pressable>
                    <Text
                        style={{
                            fontFamily: "Fun",
                            top: "35%",
                            color: "white",
                            fontSize: 18,
                        }}
                    >
                        Support developer
                    </Text>
                    <View style={{ flexDirection: "row", top: "60%" }}>
                        <Pressable
                            onPress={() =>
                                openLink(
                                    "https://www.instagram.com/halilfurkankarademir/"
                                )
                            }
                        >
                            <AntDesign
                                name="instagram"
                                size={20}
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
                                size={20}
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
                                size={18}
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
        width: 200,
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
        width: 500,
        position: "absolute",
        bottom: "20%",
    },
    text: {
        color: "white",
        fontSize: 24,
        textAlign: "center",
        fontFamily: "Fun",
    },
});
